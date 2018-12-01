import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import AddCollection from './AddCollection';

class ImageSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images: props.images,
      tags: [],
      shows: [],
      contestants: [],
      andTag: false,
      andContestant: false,
      query: '?'
    }
    this.refreshSearch = this.refreshSearch.bind(this)
    this.updateCollection = this.updateCollection.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    axios.get(`http://localhost:8090/images`)
      .then(res => {
        const images = res.data;
        this.setState({ images }, () => {
            this.props.setImages(images)
        })
      })
  }

  handleInputChange(event) {
    const target = event.target;
    const value =  target.checked;
    const name = target.name;
    this.setState({[name]: value}, () => {
      let query = this.buildSearchQuery()
      if(query.length > 1) {
        query = query + "&tags_and=" + this.state.andTag + "&contestants_and=" + this.state.andContestant;
        this.refreshSearch(query)
      }
    })
  }

  updateCollection(collection, collectionName) {
    this.setState({[collectionName] : collection}, () => {
      this.refreshSearch(this.buildSearchQuery())
    })
  }

  refreshSearch(query) {
    if(query !== this.state.query) {
      this.setState({query}, () => {
        axios.get("http://localhost:8090/images" + query)
        .then(res => {
          const images = res.data;
          this.setState({ images }, () => {
            this.props.setImages(images)
          })
        })
      })
    }
  }

  buildSearchQuery() {
    let tags = this.state.tags.map(item => item.name).join(',');
    if(tags.length > 0) {
      tags = "tags=" + tags;
    }
    let shows = this.state.shows.map(item => item.name).join(',');
    if(shows.length > 0) {
      shows = "&shows=" + shows;
    }
    let contestants = this.state.contestants.map(item => item.name).join(',');
    if(contestants.length > 0) {
      contestants = "&contestants=" + contestants;
    }
    return "?"+tags+shows+contestants
  }

  render() {
    return (
        <div>
          <div>
             <div>TAGS</div>
             <AddCollection updateCollection={this.updateCollection} creator="false" 
                            collection={this.state.tags} collectionName="tags"/>
             <div class="cl-b">
             <label>AND
          <input
            name="andTag"
            type="checkbox"
            checked={this.state.andTag}
            onChange={this.handleInputChange} />
          </label></div>
           </div>
           <div>
             <div>SHOWS</div>
            <AddCollection updateCollection={this.updateCollection} creator="false" 
                           collection={this.state.shows} collectionName="shows"/>
           </div>
           <div class="cl-b">
             <div>CONTESTANTS</div>
             <AddCollection updateCollection={this.updateCollection} creator="false" 
                            collection={this.state.contestants} collectionName="contestants"/>
             <div class="cl-b">
             <label>AND
          <input
            name="andContestant"
            type="checkbox"
            checked={this.state.andContestant}
            onChange={this.handleInputChange} />
          </label>
             </div>
           </div>
            <div class="cl-b">
              {this.state.images.map(i =>
                  <Link to={`/image/details/${i.id}`}>
                      <img id={`image-${i.id}`} alt={`${i.name}`} class ="image" src={i.image}></img>
                  </Link>
                )}
            </div>
          </div>
    )
  }
}

export default ImageSearch;
