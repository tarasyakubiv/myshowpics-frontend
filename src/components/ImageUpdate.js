import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import AddCollection from './AddCollection';
import SetItem from './SetItem';
import Pagination from './Pagination';

class ImageUpdate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images: props.images,
      pageOfItems: [],
      tags: props.tags,
      shows: props.shows,
      contestants: props.contestants,
      selectedImages: []
    }
    this.addData = this.addData.bind(this)
    this.updateCollection = this.updateCollection.bind(this)
    this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
}

  addData() {
    this.state.selectedImages.map(image => {
      image.tags = image.tags.concat(this.state.tags);
      image.contestants = image.contestants.concat(this.state.contestants)
      image.gameShow = (this.state.shows !== "")?this.state.shows:image.gameShow
      axios.put(process.env.REACT_APP_API_HOST+'image/'+image.id, image)
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
      axios.put(process.env.REACT_APP_API_HOST+'image/'+image.id, image)
        .then(() => {
          document.getElementById(`image-${image.id}`).style.borderColor="black";
          this.state.selectedImages.pop(image)
        })
    })
  }

  updateCollection(collection, collectionName, item, deleteCheck) {
    if(collectionName == "shows" && !deleteCheck) {
      this.setState({shows: item}, () => {
        this.props.setUpdateData(this.state.tags, this.state.shows, this.state.contestants)
      });
    } else if (deleteCheck) {
      this.setState({shows: ''}, () => {
        this.props.setUpdateData(this.state.tags, this.state.shows, this.state.contestants)
      });
    } else {
      this.setState({[collectionName] : collection}, () => {
        this.props.setUpdateData(this.state.tags, this.state.shows, this.state.contestants)
      });
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
           <Pagination items={this.state.images} pageSize="80" onChangePage={this.onChangePage} />
            <div class="cl-b">
              {this.state.pageOfItems.map(i =>
                  <div class="image-div" onClick={this.imageClick.bind(this,i)}>
                      <img id={`image-${i.id}`} alt={`${i.name}`} class ="image" src={i.thumb}></img>
                  </div>
                )}
            </div>
          </div>
    )
  }
}

export default ImageUpdate;
