import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Autocomplete from './Autocomplete'

class AddCollection extends Component {
    constructor(props) {
        super(props);
        this.addItem = this.addItem.bind(this);
        this.createItem = this.createItem.bind(this)
        this.state = {
            collection: this.props.collection
        };
    }

    createItem(collection, collectionName, itemName) {
        axios.post(process.env.REACT_APP_API_HOST+collectionName, {name: itemName})
        .then((response) => {
          this.addItem(collection, collectionName, response.data)
         })
      }
    
    addItem(collection, collectionName, item) {
        if(!collection.filter(value=> value.id==item.id).length > 0) {
              collection.push(item)
              this.setState({collectionName: collection}, () => {
                this.props.updateCollection(collection, collectionName, item, false)
              })
        }
      }
    
    deleteItem(collection, collectionName, item) {
            let removeIndex = collection.map(function(item) { return item.id; }).indexOf(item.id);
            collection.splice(removeIndex, 1)
            this.setState({collectionName: collection}, () => {
                this.props.updateCollection(collection, collectionName, item, true)
            })
    }


    render() {
        return (
            <div class="cl-b">
            <div>
            {this.props.collection.map(c =>
              <div class="child-container">
              <span class="child-span">{c.name}</span>
              <FontAwesomeIcon onClick={this.deleteItem.bind(this, this.props.collection, this.props.collectionName, c)} 
                className="fa-button" color="red" icon="times" />
            </div>
            )}
            </div>
          <div>
          <Autocomplete options={this.props.collection} placeholder={`Search ${this.props.collectionName}`}
                        addHandler={this.addItem} createHandler={this.createItem} creator={this.props.creator}
                        collectionName={this.props.collectionName} 
                        url={`${process.env.REACT_APP_API_HOST}/${this.props.collectionName}/`}/>
          </div>
          </div>
        );
    }
    
}

export default AddCollection;