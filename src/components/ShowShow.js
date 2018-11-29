import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Autocomplete from './Autocomplete'

class ShowShow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: {},
      contestants: [],
      images: [],
      tags_options: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8090/shows/'+this.props.match.params.id)
      .then(res => {
        this.setState({ show: res.data });
      })
      axios.get('http://localhost:8090/shows/'+this.props.match.params.id+"/images")
      .then(res => {
        this.setState({ images: res.data });
      })
      axios.get('http://localhost:8090/shows/'+this.props.match.params.id+"/contestants")
      .then(res => {
        this.setState({ contestants: res.data });
      })

  }

  delete(id){
    console.log(id);
    axios.delete('http://localhost:8090/shows/'+id)
      .then((result) => {
        this.props.history.push("/shows")
      });
  }

  deleteContestant(id) {
    axios.delete('http://localhost:8090/shows/'+this.props.match.params.id+"/contestants/"+id)
    .then((result) => {
      window.location.reload();
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Show Details
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Name:</dt>
              <dd>
              {this.state.show.name}
              </dd>
            </dl>
            <dl>
              <dt>Contestants:</dt>
              <dd>
              {this.state.contestants.map(c =>
                <div class="child-container">
                  <span class="child-span">{c.name}</span>
                  <FontAwesomeIcon onClick={this.deleteContestant.bind(this, c.id)} className="fa-button" color="red" icon="times" />
                  </div>                  
                )}
              </dd>
            </dl>
            <dl>
              <dd>
              <Autocomplete options={this.state.tags_options} placeholder="Add new contestant"
                            parentId={this.props.match.params.id} parentName="shows" 
                            collectionName="contestants" url='http://localhost:8090/contestants/'/>
              </dd>
            </dl>
            <dl>
              <dt>Images:</dt>
              <dd>
              <div class="images-container">
              {this.state.images.map(i =>
                  <div class="image-div">
                    <Link to={`/image/show/${i.id}`}>
                      <img class ="image" src={i.image}></img>
                    </Link>
                  </div>
                )}
            </div>
              </dd>
            </dl>
            <Link to={`/shows/edit/${this.state.show.id}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.show.id)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowShow;