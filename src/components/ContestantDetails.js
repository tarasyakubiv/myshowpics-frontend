import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddCollection from './AddCollection';

class ContestantDetails extends Component {

  constructor(props) {
    super(props);
    this.updateCollection = this.updateCollection.bind(this);
    this.state = {
      contestant: {},
      shows: [],
      images: []
    };
  }

  componentDidMount() {
    axios.get(process.env.REACT_APP_API_HOST+'contestants/'+this.props.match.params.id)
      .then(res => {
        this.setState({ contestant: res.data, shows: res.data.gameShows  });
        console.log(this.state.contestant);
      });
    axios.get(process.env.REACT_APP_API_HOST+'contestants/'+this.props.match.params.id+"/images")
      .then(res => {
        this.setState({ images: res.data });
      })
  }

  delete(id){
    console.log(id);
    axios.delete(process.env.REACT_APP_API_HOST+'contestants/'+id)
      .then((result) => {
        this.props.history.push("/contestants")
      });
  }

  updateCollection(collection, collectionName, item, deleteCheck) {
    if(deleteCheck) {
      axios.delete(process.env.REACT_APP_API_HOST+'contestants/'+this.props.match.params.id+"/"+collectionName+"/"+item.id)
    } else {
      axios.patch(process.env.REACT_APP_API_HOST+"contestants/"+this.props.match.params.id+"/"+collectionName+"/"+item.id)
    }
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
          <div>
          <div>Full Name:</div>
              <div>
              {this.state.contestant.name}
              </div>
          </div>
            <div>
                <div>Shows:</div>
                <AddCollection updateCollection={this.updateCollection} creator="true"
                            collection={this.state.shows} collectionName="shows"/>
              </div>
            <div class="cl-b">
              <div>Images:</div>
              <div class="images-container">
              {this.state.images.map(i =>
                  <div class="image-div">
                    <Link to={`/image/details/${i.id}`}>
                      <img class ="image"  alt={`${i.name}`} src={i.thumb}></img>
                    </Link>
                  </div>
                )}
            </div>
              </div>
            <div class="cl-b">
              <button onClick={this.delete.bind(this, this.state.contestant.id)} class="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContestantDetails;