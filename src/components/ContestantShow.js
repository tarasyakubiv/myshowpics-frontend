import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Autocomplete from './Autocomplete'
class ImageShow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contestant: {},
      shows: [],
      tags_options: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8090/contestants/'+this.props.match.params.id)
      .then(res => {
        this.setState({ contestant: res.data, shows: res.data.gameShows  });
        console.log(this.state.contestant);
      });
  }

  delete(id){
    console.log(id);
    axios.delete('http://localhost:8090/contestants/'+id)
      .then((result) => {
        this.props.history.push("/contestants")
      });
  }

  deleteShow(id) {
    axios.delete('http://localhost:8090/contestants/'+this.props.match.params.id+'/shows/'+id)
    .then((result) => {
      this.props.history.push("/contestants")
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Contestant Details
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Full Name:</dt>
              <dd>
              {this.state.contestant.name}
              </dd>
            </dl>
            <dl>
              <dt>Shows:</dt>
              <dd>
              {this.state.shows.map(s =>
                <div class="child-container">
                <span class="child-span">{s.name}</span>
                <FontAwesomeIcon onClick={this.deleteShow.bind(this, s.id)} className="fa-button" color="red" icon="times" />
                </div>  
                )}
              </dd>
            </dl>
            <dl>
              <dd>
              <Autocomplete options={this.state.tags_options} placeholder="Set Show"
                            parentId={this.props.match.params.id} parentName="contestants" 
                            collectionName="shows" url='http://localhost:8090/shows/'/>
              </dd>
            </dl>
            <dl>
              <dt>Images:</dt>
              <dd>
              </dd>
            </dl>
            <Link to={`/contestants/edit/${this.state.contestant.id}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.contestant.id)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageShow;