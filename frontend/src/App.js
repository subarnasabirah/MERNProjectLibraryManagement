import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import BooksList from "./components/books-list.component";
import CreateBook from "./components/create-book.component";
import EditBook from "./components/edit-books.component";
import CreateUser from "./components/create-user.component";



function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={BooksList} />
        <Route path="/edit/:id" component={EditBook} />
        <Route path="/create" component={CreateBook} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>

  );
}

export default App;
