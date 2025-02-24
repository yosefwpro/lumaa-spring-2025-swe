import React, { Component } from 'react';
import axios from 'axios';

class CreateNotes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes_title: '',
      notes_body: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    });
  } 

  onSubmit(e) {
    e.preventDefault();

    console.log(`Form Submitted`);
    console.log(`Notes Title: ${this.state.notes_title}`);
    console.log(`Notes Body: ${this.state.notes_body}`);

    const newNotes = {
      notes_title: this.state.notes_title,
      notes_body: this.state.notes_body
    };

    axios.post('http://localhost:4000/notes/add', newNotes)
      .then(res => console.log(res.data));

    this.setState({
      notes_title: '',
      notes_body: ''
    });
  }

  render() {
    return (
        
      <div className="content">
        <h2>New Notes</h2>

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="notes_title"> Notes Title: </label>
            <input type="text" 
              className="form-control" 
              aria-describedby="notesTitleHelp"
              name="notes_title" 
              id="notes_title"
              value={this.state.notes_title} 
              onChange={this.handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="notes_body"> Enter Notes: </label>
            <textarea rows="5"
              className="form-control" 
              name="notes_body"
              id="notes_body"
              aria-describedby="notesBodyHelp" 
              value={this.state.notes_body} 
              onChange={this.handleChange}></textarea>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>

    );
  }

}

export default CreateNotes;
