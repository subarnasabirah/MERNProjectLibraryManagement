import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Book = props => (
    <tr>
        <td>{props.book.bookname}</td>
        <td>{props.book.author}</td>
        <td>{props.book.description}</td>
        <td><Link to={"/edit/" + props.book._id}>eid</Link>|<a href="#" onclick={ () => {props.deleteBook(props.book._id)}}>Delete</a></td>
    </tr>
)

export default class BooksList extends Component {
    constructor(props) {
        super(props);

        this.deleteBook = this.deleteBook.bind(this);
            this.state = { books: [] };
    }

        componentDidMount() {
            axios.get('http://localhost:5000/books/')
                .then(response => {
                this.setState({ books: response.data})
                })
                .catch((error) => {
                console.log(error);
                })
    }
    
    deleteBook(id) {
        axios.delete('http//localhost: 5000/books/' + id)
            .then(res => console.log(res.data));
        this.setState({
            books: this.state.books.filter(el => el._id !== id)
        })
    }

    bookList() {
        return this.state.books.map(currentbook => {
            return <Book book={currentbook} deletebook={this.deleteBook} key={currentbook._id} />;
        })
    }
        

    render() {
        return (
            <div>
                <h3>Book List</h3>
                <table className="table">
                    <thead className="table">
                        <tr>
                            <th>Bookname</th>
                            <th>Author</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.bookList()}
                    </tbody>
                </table>
            </div>
        )
    }
}