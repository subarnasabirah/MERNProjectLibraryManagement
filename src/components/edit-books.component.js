import React, { Component } from 'react';
import axios from 'axios';

export default class CreateBook extends Component {
    constructor(props) {
        super(props);

        // this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeBookname = this.onChangeBookname.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            // username: '',
            bookname: '',
            author: '',
            description: '',
            books: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/books/' +this.props.match.params.id)
            .then(response => {
                if (response) {
                    this.setState({
                        bookname: response.data.bookname,
                        author: response.data.author,
                        description: response.data.description
                })
            }
        })
    }

    // onChangeUsername(e) {
    //     this.setState({
    //         username: e.target.value
    //     });
    // }

     onChangeBookname(e) {
        this.setState({
            bookname: e.target.value
        });
    }

     onChangeAuthor(e) {
        this.setState({
            author: e.target.value
        });
    }

     onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const book = {
            // username: this.state.username,
            bookname: this.state.bookname,
            author: this.state.author,
            description: this.state.description
        }
        console.log(book);

          axios.post('http://localhost:5000/books/update'+this.props.match.params.id, book)
            .then(res => console.log(res.data));

        window.location = '/';
    }


    render() {
        return (
            <div>
                <h3>Edit Book</h3>
                <form onSubmit={this.onSubmit}>
                    {/* <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            className="from-control"
                            value={this.onChangeUsername}
                            onChange={this.onChangeUsername}>
                            {
                            this.state.users.map(function (user) {
                                return <option key={user}
                                    value={user}>{user}</option>;
                            })
                            }
                        </select>
                    </div> */}
                    <div className="form-group" >
                        <label>Bookname: </label>
                        <select style={{ color: "#000"}}
                            className="form-control" value={this.onChangeBookname} onChange={this.onChangeBookname}>
                            {
                            this.state.books.map(function (book) {
                                return <option key={book}
                                    value={book}>{book}</option>;
                            })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Author: </label>
                        <input type="text" required
                            className="form-control"
                            value={this.state.author}
                            onChange={this.onChangeAuthor}/>
                    </div>
                     <div className="form-group">
                        <label>Description: </label>
                        <input type="text" required
                            className="form-control"
                            value={this.state.desctiption}
                            onChange={this.onChangeDescription}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit Book" className="btn btn-primary mt-2" />
                    </div>
                </form>
            </div>
        )
    }
}