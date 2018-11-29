import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Autocomplete from './Autocomplete'

class ImageShow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: {},
      show: '',
      contestants: [],
      tags: [],
      tags_options: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8090/image/'+this.props.match.params.id)
      .then(res => {
        this.setState({ image: res.data, contestants: res.data.contestants, tags: res.data.tags});
        if(res.data.gameShow != null) {
          this.setState({ show: res.data.gameShow });
        }
      });
    axios.get('http://localhost:8090/tags')
      .then(res => {
        this.setState({ tags_options: res.data});
      });
  }

  delete(id){
    console.log(id);
    axios.delete('http://localhost:8090/image/'+id)
      .then(() => {
        this.props.history.push("/")
      });
  }

  deleteTag(id) {
    axios.delete('http://localhost:8090/image/'+this.props.match.params.id+"/tags/"+id)
    .then(() => {
      window.location.reload();
    });
  }

  deleteContestant(id) {
    axios.delete('http://localhost:8090/image/'+this.props.match.params.id+"/contestants/"+id)
    .then(() => {
      window.location.reload();
    });
  }

  deleteShow(id) {
    axios.delete('http://localhost:8090/image/'+this.props.match.params.id+"/shows/"+id)
    .then(() => {
      window.location.reload();
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Image Details
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Image link:</dt>
              <dd>
              <a href={this.state.image.image}>{this.state.image.image}</a>
              </dd>
            </dl>    
            <dl>
              <dt>Full image</dt>
              <dd>
              <img src={this.state.image.image}></img>
              </dd>
            </dl>
            <dl>
              <dt>Tags:</dt>
              <dd>
              {this.state.tags.map(tag =>
                <div class="child-container">
                  <span class="child-span">{tag.name}</span>
                  <FontAwesomeIcon onClick={this.deleteTag.bind(this, tag.id)} className="fa-button" color="red" icon="times" />
                </div>
                )}
              </dd>
            </dl>
            <dl>
              <dd>
              <Autocomplete options={this.state.tags_options} placeholder="Add new tag"
                            parentId={this.props.match.params.id} parentName="image" 
                            collectionName="tags" url='http://localhost:8090/tags/'/>
              </dd>
            </dl>
            <dl>
              <dt>Show:</dt>
              <dd>
                {this.state.show != '' && 
                  <div class="child-container">
                  <span class="child-span">{this.state.show.name}
                </span>
                <FontAwesomeIcon onClick={this.deleteShow.bind(this, this.state.show.id)} className="fa-button" color="red" icon="times" />
                  </div>
                }
              </dd>
            </dl>
            <dl>
              <dd>
              <Autocomplete options={this.state.tags_options} placeholder="Set Show"
                            parentId={this.props.match.params.id} parentName="image" 
                            collectionName="shows" url='http://localhost:8090/shows/'/>
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
                            parentId={this.props.match.params.id} parentName="image" 
                            collectionName="contestants" url='http://localhost:8090/contestants/'/>
              </dd>
            </dl>
            <Link to={`/image/edit/${this.state.image.id}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.image.id)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageShow;