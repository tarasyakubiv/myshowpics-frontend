import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Autocomplete from './Autocomplete'
class ImageShow extends Component {

  constructor(props) {
    super(props);
    this.createItem = this.createItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.state = {
      contestant: {},
      shows: [],
      images: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8090/contestants/'+this.props.match.params.id)
      .then(res => {
        this.setState({ contestant: res.data, shows: res.data.gameShows  });
        console.log(this.state.contestant);
      });
    axios.get('http://localhost:8090/contestants/'+this.props.match.params.id+"/images")
      .then(res => {
        this.setState({ images: res.data });
      })
  }

  delete(id){
    console.log(id);
    axios.delete('http://localhost:8090/contestants/'+id)
      .then((result) => {
        this.props.history.push("/contestants")
      });
  }

  createItem(collection, collectionName, itemName) {
    axios.post("http://localhost:8090/"+collectionName, {name: itemName})
    .then((response) => {
      this.addItem(collection, collectionName, response.data)
     })
  }

  addItem(collection, collectionName, item) {
    axios.patch("http://localhost:8090/contestants/"+this.props.match.params.id+"/"+collectionName+"/"+item.id)
    .then(() => {
        collection.push(item)
        this.setState({collectionName: collection});
    })
    .catch(error=>{return console.error('Failed to save')})
  }

  deleteItem(collection, collectionName, itemId) {
    axios.delete('http://localhost:8090/contestants/'+this.props.match.params.id+"/"+collectionName+"/"+itemId)
    .then(() => {
        let removeIndex = collection.map(function(item) { return item.id; }).indexOf(itemId);
        collection.splice(removeIndex, 1)
        this.setState({collectionName: collection});
    })
    .catch(error=>{return console.error('Failed to delete')});
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
                <FontAwesomeIcon onClick={this.deleteItem.bind(this, this.state.shows, "shows", s.id)} className="fa-button" color="red" icon="times" />
                </div>  
                )}
              </dd>
            </dl>
            <dl>
              <dd>
              <Autocomplete options={this.state.shows} placeholder="Set Show"
                            addHandler={this.addItem} createHandler={this.createItem}
                            parentId={this.props.match.params.id} parentName="contestants" 
                            collectionName="shows" url='http://localhost:8090/shows/'/>
              </dd>
            </dl>
            <dl>
            <div class="cl-b">
              <dt>Images:</dt>
              <dd>
              <div class="images-container">
              {this.state.images.map(i =>
                  <div class="image-div">
                    <Link to={`/image/details/${i.id}`}>
                      <img class ="image" src={i.image}></img>
                    </Link>
                  </div>
                )}
            </div>
              </dd>
              </div>
            </dl>
            <div class="cl-b">
              <Link to={`/contestants/edit/${this.state.contestant.id}`} class="btn btn-success">Edit</Link>&nbsp;
              <button onClick={this.delete.bind(this, this.state.contestant.id)} class="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageShow;