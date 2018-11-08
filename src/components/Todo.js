import React, {Component} from 'react';
import {Button, Jumbotron, Form, FormGroup, Input, Table} from 'reactstrap';
import './todos.css'

class Todo extends Component {
    state = {
        database: [],
        buttonSimpan: true,
        id: 0
    };


    addData = () => {
        const database = this.state.database;
        let text = document.getElementById('text').value;

        if (database.length < 7) {
            database.push(text);
            document.getElementById('text').value = '';

            localStorage.setItem('todos', JSON.stringify(database));

            this.setState({
                database: database
            });
        } else {
            alert('data maksimal hanya 7');
        }

    };


    deleteData = index => {
        const database = this.state.database;
        database.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(database));

        this.getData();
    };

    getDataById = index => {
        const database = this.state.database;
        const getData = database[index];
        document.getElementById('text').value = getData;

        return this.setState({
            buttonSimpan: false,
            id: index
        });
    };


    getData = () => {
        let getItem = JSON.parse(localStorage.getItem('todos'));

        if (getItem !== null) {
            return this.setState({
                database: getItem
            });
        }
    };

    updateData = id => {
        const database = this.state.database;

        database.splice(id, 1, document.getElementById('text').value);

        document.getElementById('text').value = '';

        localStorage.setItem('todos', JSON.stringify(database));

        this.getData();

        this.setState({
            database: database
        });

    };

    batalData = () => {
        document.getElementById('text').value = '';
        return this.setState({
            buttonSimpan: true,
            id: 0
        });
    };

    componentDidMount() {
        this.getData();
    };


    render() {
        return (
            <div>
                
                <Jumbotron className="BackgroundTodos">
                    <div className="TextIn">
                        <h1 className="display-3">Todos Program!</h1>
                        <p className="lead">
                            Todos Website, website simple yang dibuat menggunaan ReactJs, ReactStrap dengan penggunaan
                            database local
                            Web Browser
                        </p>
                        <hr className="my-2"/>

                        <p className="lead">
                            <Form>
                                <FormGroup>
                                    <Input type="text" id="text"
                                           style={({width: '300px', margin: '0 auto', marginBottom: '10px'})}
                                           placeholder="Create Todo"/>
                                    {
                                        this.state.buttonSimpan ? (
                                            <span>
                                                    <Button onClick={() => this.addData()} color="primary"
                                                            type="submit">Tambah</Button>
                                                </span>
                                        ) : (
                                            <span>
                                                    <Button onClick={() => this.updateData(this.state.id)}
                                                            color="success" type="submit"> Update </Button>
                                                &nbsp;
                                                <Button onClick={() => this.batalData()}
                                                        type="submit"> Batal </Button>
                                                </span>
                                        )
                                    }
                                </FormGroup>
                            </Form>
                        </p>

                        <Table>
                            <thead>
                            <tr>
                                <th>Number</th>
                                <th>Todo</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>

                            {this.state.database.map((data, index) => {
                                return (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{data}</td>
                                        <td>
                                            <Button color="danger"
                                                    onClick={() => this.deleteData(index)}>delete</Button>
                                            &nbsp;
                                            <Button color="warning"
                                                    onClick={() => this.getDataById(index)}>edit</Button>
                                        </td>
                                    </tr>
                                );
                            })}


                            </tbody>
                        </Table>


                    </div>
                </Jumbotron>
            </div>


        );
    }
}

export default Todo;
