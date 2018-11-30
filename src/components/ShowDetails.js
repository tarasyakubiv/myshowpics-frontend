import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import { Link } from 'react-router-dom';
import AddCollection from './AddCollection';

class ShowDetails extends Component {

  constructor(props) {
    super(props);
    this.updateCollection = this.updateCollection.bind(this);
    this.state = {
      show: {},
      contestants: [],
      images: []
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

  updateCollection(collection, collectionName, item, deleteCheck) {
    if(deleteCheck) {
      axios.delete('http://localhost:8090/shows/'+this.props.match.params.id+"/"+collectionName+"/"+item.id)
    } else {
      axios.patch("http://localhost:8090/shows/"+this.props.match.params.id+"/"+collectionName+"/"+item.id)
    }
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
            <div>Contestants:</div>
              <AddCollection updateCollection={this.updateCollection} creator="true"
                            collection={this.state.contestants} collectionName="contestants"/>
            <div class="cl-b">
              <dt>Images:</dt>
              <div class="images-container">
              {this.state.images.map(i =>
                  <div class="image-div">
                    <Link to={`/image/details/${i.id}`}>
                      <img class ="image" src={i.image}></img>
                    </Link>
                  </div>
                )}
            </div>
              </div>
            <div class="cl-b">
            <button onClick={this.delete.bind(this, this.state.show.id)} class="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowDetails;