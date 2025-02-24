import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Notes = props => (
  <tr>
    <td>{props.notes.notes_title}</td>
    <td>{props.notes.notes_body}</td>
    <td>
      <Link to={"/edit/"+props.notes._id}>Edit</Link>
    </td>
  </tr>
);

class NotesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/notes/')
      .then(response => {
        this.setState({ notes: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  notesList() {
    return this.state.notes.map(function(currentNotes, i) {
      return <Notes notes={currentNotes} key={i} />
    });
  }

  render() {
    return (
        
      <div className="content">
        <h2>My Notes</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Notes Title</th>
              <th colSpan="2">Notes Body</th>
            </tr>
          </thead>
          <tbody>
            { this.notesList() }
          </tbody>
        </table>
      </div>

    );
  }

}

export default NotesList;
