import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import AddCollection from './AddCollection';
import SetItem from './SetItem';

class ImageUpdate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images: props.images,
      tags: [],
      shows: '',
      contestants: [],
      selectedImages: []
    }
    this.addData = this.addData.bind(this)
    this.updateCollection = this.updateCollection.bind(this)
  }

  addData() {
    this.state.selectedImages.map(image => {
      image.tags = image.tags.concat(this.state.tags);
      image.contestants = image.contestants.concat(this.state.contestants)
      image.gameShow = (this.state.shows !== "")?this.state.shows:image.gameShow
      axios.put('http://localhost:8090/image/'+image.id, image)
        .then(() => {
          document.getElementById(`image-${image.id}`).style.borderColor="black";
          this.state.selectedImages.pop(image)
        })
    })
  }

  removeData() {
    this.state.selectedImages.map(image => {
      this.state.tags.map(tag => {
        image.tags = image.tags.filter(t => tag.id !== t.id)
      })
      this.state.contestants.map(contestant => {
        image.contestants = image.contestants.filter(c => contestant.id !== c.id)
      })
      if(image.gameShow !== null && this.state.shows !== "" && image.gameShow.id == this.state.shows.id) {
        image.gameShow = null
      }
      axios.put('http://localhost:8090/image/'+image.id, image)
        .then(() => {
          document.getElementById(`image-${image.id}`).style.borderColor="black";
          this.state.selectedImages.pop(image)
        })
    })
  }

  updateCollection(collection, collectionName, item, deleteCheck) {
    if(collectionName == "shows" && !deleteCheck) {
      this.setState({shows: item});
    } else if (deleteCheck) {
      this.setState({shows: ''});
    } else {
      this.setState({[collectionName] : collection})
    }
  }

  imageClick(image) {
      if(!this.state.selectedImages.filter(value=> value.id==image.id).length > 0) {
        this.state.selectedImages.push(image)
        document.getElementById(`image-${image.id}`).style.borderColor="green";
      } else {
        this.state.selectedImages.pop(image)
        document.getElementById(`image-${image.id}`).style.borderColor="black";
      }
  }

  render() {
    return (
        <div>
        <div>
            <button onClick={this.addData.bind(this)} class="btn btn-success">Add</button>
            <button onClick={this.removeData.bind(this)} class="btn btn-danger">Remove</button>
             <div>TAGS</div>
             <AddCollection updateCollection={this.updateCollection} creator="true" 
                            collection={this.state.tags} collectionName="tags"/>
           </div>
           <div class="cl-b">
              <div>Show:</div>
              <SetItem updateCollection={this.updateCollection} creator="true" 
                      item={this.state.shows} collectionName="shows"/>
            </div>
           <div class="cl-b">
             <div>CONTESTANTS</div>
             <AddCollection updateCollection={this.updateCollection} creator="true" 
                            collection={this.state.contestants} collectionName="contestants"/>
           </div>
            <div class="cl-b">
              {this.state.images.map(i =>
                  <div class="image-div" onClick={this.imageClick.bind(this,i)}>
                      <img id={`image-${i.id}`} alt={`${i.name}`} class ="image" src={i.image}></img>
                  </div>
                )}
            </div>
          </div>
    )
  }
}

export default ImageUpdate;
