import React, { Component } from 'react';
import axios from 'axios';

class EditNotes extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notes_title: '',
      notes_body: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:4000/notes/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          notes_title: response.data.notes_title,
          notes_body: response.data.notes_body
        })
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const editNotes = {
      notes_title: this.state.notes_title,
      notes_body: this.state.notes_body
    };

    console.log(editNotes);
    axios.post('http://localhost:4000/notes/update/'+this.props.match.params.id, editNotes)
      .then(res => console.log(res.data));

    this.props.history.push('/');
  }

  render() {
    return (
        
      <div className="content">
        <h2>Edit Notes</h2>

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

export default EditNotes;
