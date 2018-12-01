import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Autocomplete from './Autocomplete'

class CollectionList extends Component {
  constructor(props) {
    super(props)
    this.create = this.create.bind(this);
    this.goTo = this.goTo.bind(this);
    this.state = {
        collection: []
      }
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_HOST}${this.props.name}`)
      .then(res => {
        const collection = res.data;
        this.setState({ collection });
      })
  }

  create(collection, collectionName, itemName) {
    axios.post(process.env.REACT_APP_API_HOST+collectionName, {name: itemName})
    .then((response) => this.props.history.push("/"+collectionName+"/details/"+response.data.id))
  }

   goTo(collection, collectionName, item) {
    this.props.history.push("/"+collectionName+"/details/"+item.id)
   }

  delete(collection, item){
    axios.delete(process.env.REACT_APP_API_HOST+this.props.name+'/'+item.id)
      .then(() => {
        let removeIndex = collection.map(function(item) { return item.id; }).indexOf(item.id);
        collection.splice(removeIndex, 1)
        this.setState({collection: collection});
      });
  }

  render() {
    return (
          <div class="panel-body">
           <Autocomplete options={this.state.collection} placeholder={`Search ${this.props.name}`}
                            addHandler={this.goTo} createHandler={this.create}
                            collectionName={this.props.name} url={`${process.env.REACT_APP_API_HOST}${this.props.name}/`}/>
              {this.state.collection.map(c =>
                <div class="child-container">
                <span class="child-span"><Link to={`/${this.props.name}/details/${c.id}`}>{c.name}</Link></span>
                <FontAwesomeIcon onClick={this.delete.bind(this,this.state.collection, c)} className="fa-button" color="red" icon="times" />
                </div>  
                )}
          </div>
    )
  }
}

export default CollectionList;