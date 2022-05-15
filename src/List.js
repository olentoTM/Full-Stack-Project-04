import React, { Children, Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import { Dropdown, DropdownButton, Form, FormControl } from "react-bootstrap";

export default class List extends Component {
    constructor(){
        super();
        this.state = {
            albums: [],
            error: null,
            query: this.value
        }
    }

    listAlbums = (data) => {
        console.log(data);
        this.setState({albums: data})
    }

    showResponse = (data) => {
        alert(data);
        this.componentDidMount(); //Kutsutaan componentDidMount funktio uudestaan, jotta sivu päivittyy (tämä siis suorittaa tietokantahaun uudestaan).
    }

    deleteThis = (del) => {
        console.log(del.del);

        var url = "https://fs-project-03.herokuapp.com/api/delete/" + del.del;
        fetch(url, {method: "DELETE"})
        .then((results) => {
          return results.json();
        })
        .then(this.showResponse)
        .catch(error => {
            this.setState({error})
        })
    }
    
    queryEvent = (event) => {
        event.preventDefault();
        this.searchAlbum();
    }    

    searchAlbum = () => {
        console.log(this.state.query);
        
        var url = "https://fs-project-03.herokuapp.com/api/" + this.state.query;
        fetch(url, {method: "GET"})
        .then((results) => {
          return results.json();
        })
        .then(this.listAlbums)
        .catch(error => {
            this.setState({error})
        })
    }

    componentDidMount() {
        fetch("https://fs-project-03.herokuapp.com/api/getall")
        .then((results) => {
          return results.json();
        })
        .then(this.listAlbums)
        .catch(error => {
            this.setState({error})
        })
    }

    getAll = () => {
        this.componentDidMount();
    }

    render() {
        return (
        <div>
            <div>
                <Form onSubmit={this.queryEvent}>
                    <InputGroup className="mb-3">
                        <FormControl aria-label="Text input with dropdown button" placeholder="Search for an album." name="idquery" type="text" onChange={(event) => this.setState({query: event.target.value})}/>
                        <Button type="submit">Search</Button>
                        <Button onClick={this.test} className="btn btn-dark">Show All</Button>
                    </InputGroup>
                </Form>
            </div>
            <div>
                {
                this.state.albums.length === 0 &&
                <h1>No data available.</h1>
                }
                <Table striped bordered responsive="sm">
                <thead>
                    <tr>
                        <th>Album Cover</th>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Year</th>
                        <th>Label</th>
                        <th>Catalog No.</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {
                this.state.albums.length > 0 &&
                this.state.albums.map( (item) => (
                        <tr key={item._id}>
                            <th><Image fluid style={{width: 200}} src={item.cover}></Image></th>
                            <th>{item.title}</th>
                            <th>{item.artist}</th>
                            <th>{item.year}</th>
                            <th>{item.label}</th>
                            <th>{item.catno}</th>
                            <th><Button onClick={() => { this.deleteThis({del: item._id}) }}>Delete</Button></th>
                        </tr>
                ))
                }
                </tbody>
                </Table>
                {
                    this.state.error &&
                    <h1>{this.state.error}</h1>
                }
            </div>
        </div> 
        )
    }
}