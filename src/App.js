import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './styles/App.css';

import NotesList from './components/notes-list';
import CreateNotes from './components/create-notes';
import EditNotes from './components/edit-notes';

class App extends Component {

  render() {
    return (
      
      <Router>
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Notes App</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ml-auto">
                <Link to="/" className="nav-item nav-link active"> Home <span className="sr-only">(current)</span></Link>
                <Link to="/create" className="nav-item nav-link"> Add Notes </Link>
              </div>
            </div>
          </nav>
        </div>

        <div className="container body-wrapper">
          <div className="row">
            <div className="col-sm-12">
              <Route path="/" exact component={NotesList} />
              <Route path="/create" component={CreateNotes} />
              <Route path="/edit/:id" component={EditNotes} />
            </div>
          </div>
        </div>
      </Router>

    );
  }

}

export default App;
