import React, { Component } from 'react';
import axios from 'axios';
import AddCollection from './AddCollection';
import SetItem from './SetItem';

class ImageDetails extends Component {

  constructor(props) {
    super(props);
    this.updateCollection = this.updateCollection.bind(this);
    this.state = {
      image: {},
      show: '',
      contestants: [],
      tags: []
    };
  }

  componentDidMount() {
    axios.get(process.env.REACT_APP_API_HOST+'image/'+this.props.match.params.id)
      .then(res => {
        this.setState({ image: res.data, contestants: res.data.contestants, tags: res.data.tags});
        if(res.data.gameShow != null) {
          this.setState({ show: res.data.gameShow });
        }
      });
  }

  delete(id){
    console.log(id);
    axios.delete(process.env.REACT_APP_API_HOST+'image/'+id)
      .then(() => {
        this.props.history.push("/")
      });
  }
  updateCollection(collection, collectionName, item, deleteCheck) {
    if(deleteCheck) {
      axios.delete(process.env.REACT_APP_API_HOST+'image/'+this.props.match.params.id+"/"+collectionName+"/"+item.id)
      if(collectionName == "shows") {
        this.setState({show: ""});
      }
    } else {
      axios.patch(process.env.REACT_APP_API_HOST+"image/"+this.props.match.params.id+"/"+collectionName+"/"+item.id)
      if(collectionName == "shows") {
        this.setState({show: item});
      }
    }
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
              <div>Image name:</div>
              <div>{this.state.image.name}</div>
              <div>
              <a href={this.state.image.sourceLink}>Image source</a>
              </div>
              <div>
              <img src={this.state.image.thumb}  alt={`${this.state.image.name}`}></img>
              </div>  
              <div>
              <a href={this.state.image.image}>
              <img src={this.state.image.image}  alt={`${this.state.image.name}`}></img>
              </a>
              </div>
              <div>
                <div>Tags:</div>
                <AddCollection updateCollection={this.updateCollection} creator="true"
                            collection={this.state.tags} collectionName="tags"/>
              </div>
              <div class="cl-b">
              <div>Show:</div>
              <SetItem updateCollection={this.updateCollection} creator="true" 
                      item={this.state.show} collectionName="shows"/>
              </div>
              <div>Contestants:</div>
              <AddCollection updateCollection={this.updateCollection} creator="true"
                            collection={this.state.contestants} collectionName="contestants"/>
            <div class="cl-b">
            <button onClick={this.delete.bind(this, this.state.image.id)} class="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageDetails;