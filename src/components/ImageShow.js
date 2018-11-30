import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Autocomplete from './Autocomplete'

class ImageShow extends Component {

  constructor(props) {
    super(props);
    this.createItem = this.createItem.bind(this);
    this.addItemToImage = this.addItemToImage.bind(this);
    this.state = {
      image: {},
      show: '',
      contestants: [],
      tags: []
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
  }

  delete(id){
    console.log(id);
    axios.delete('http://localhost:8090/image/'+id)
      .then(() => {
        this.props.history.push("/")
      });
  }

  createItem(collection, collectionName, itemName) {
    axios.post("http://localhost:8090/"+collectionName, {name: itemName})
    .then((response) => {
      this.addItemToImage(collection, collectionName, response.data)
     })
  }

  addItemToImage(collection, collectionName, item) {
    axios.patch("http://localhost:8090/image/"+this.props.match.params.id+"/"+collectionName+"/"+item.id)
    .then(() => {
      if(collectionName != "shows") {
        if(!collection.includes(item)) {
          collection.push(item)
          this.setState({collectionName: collection});
        }
      } else {
        this.setState({show: item});
      }
    })
    .catch(error=>{return console.error('Failed to save')})
  }

  deleteItem(collection, collectionName, itemId) {
    axios.delete('http://localhost:8090/image/'+this.props.match.params.id+"/"+collectionName+"/"+itemId)
    .then(() => {
      if(collectionName == "shows") {
        this.setState({show: ""});
      } else {
        let removeIndex = collection.map(function(item) { return item.id; }).indexOf(itemId);
        collection.splice(removeIndex, 1)
        this.setState({collectionName: collection});
      }
    })
    .catch(error=>{return console.error('Failed to delete')});
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
                  <FontAwesomeIcon onClick={this.deleteItem.bind(this, this.state.tags, "tags", tag.id)} className="fa-button" color="red" icon="times" />
                </div>
                )}
              </dd>
            </dl>
            <dl>
              <dd>
              <Autocomplete options={this.state.tags} placeholder="Add new tag" 
                            addHandler={this.addItemToImage} createHandler={this.createItem} 
                            parentId={this.props.match.params.id} parentName="image" 
                            collectionName="tags" url='http://localhost:8090/tags/'/>
              </dd>
            </dl>
            <dl>
              <div class="cl-b">
              <dt>Show:</dt>
              <dd>
                {this.state.show != '' && 
                  <div class="child-container">
                  <span class="child-span">{this.state.show.name}
                </span>
                <FontAwesomeIcon onClick={this.deleteItem.bind(this, this.state.show, "shows", this.state.show.id)} className="fa-button" color="red" icon="times" />
                  </div>
                }
              </dd>
              </div>

            </dl>
            <dl>
              <dd>
              <Autocomplete options={this.state.show} placeholder="Set Show"
                            addHandler={this.addItemToImage} createHandler={this.createItem}
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
                  <FontAwesomeIcon onClick={this.deleteItem.bind(this, this.state.contestants, "contestants", c.id)} className="fa-button" color="red" icon="times" />
                  </div>                  
                )}
              </dd>
            </dl>
            <dl>
              <dd>
              <Autocomplete options={this.state.contestants} placeholder="Add new contestant"
                            addHandler={this.addItemToImage} createHandler={this.createItem}
                            parentId={this.props.match.params.id} parentName="image" 
                            collectionName="contestants" url='http://localhost:8090/contestants/'/>
              </dd>
            </dl>
            <div class="cl-b">
            <Link to={`/image/edit/${this.state.image.id}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.image.id)} class="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageShow;