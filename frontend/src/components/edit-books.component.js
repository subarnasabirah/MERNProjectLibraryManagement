import React, { Component } from 'react';
import axios from 'axios';

export default class EditBook extends Component {
    constructor(props) {
        super(props);

        // this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeBookname = this.onChangeBookname.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeBookid = this.onChangeBookid.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            // username: '',
            bookname: '',
            author: '',
            description: '',
            bookid: '',
            books: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/books/' +this.props.match.params.id)
            .then(response => {
                this.setState({
                    bookname: response.data.bookname,
                    author: response.data.author,
                    description: response.data.description,
                    bookid: response.data.bookid,
                })
            })
            .catch(function (error) {
                console.log(error);
            })
            
        
        axios.get('http://localhost:5000/books/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        books: response.data.map(book => book.bookname),
                        bookname: response.data[0].bookname
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
    onChangeBookid(e) {
        this.setState({
            bookid: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const book = {
            // username: this.state.username,
            bookname: this.state.bookname,
            author: this.state.author,
            description: this.state.description,
            bookid: this.state.bookid
        }
        console.log(book);

          axios.post('http://localhost:5000/books/update/'+this.props.match.params.id, book)
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
                           <input type="text" required
                            className="form-control"
                            value={this.state.bookname}
                            onChange={this.onChangeBookname}/>
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
                            value={this.state.description}
                            onChange={this.onChangeDescription}/>
                    </div>
                    <div className="form-group">
                        <label>Book ID: </label>
                        <input type="number" required
                            className="form-control"
                            value={this.state.bookid}
                            onChange={this.onChangeBookid}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update" className="btn btn-primary mt-2" />
                    </div>
                </form>
            </div>
        )
    }
}