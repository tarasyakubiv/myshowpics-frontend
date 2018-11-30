import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Autocomplete from './Autocomplete'

class SetItem extends Component {
    constructor(props) {
        super(props);
        this.setItem = this.setItem.bind(this);
        this.createItem = this.createItem.bind(this)
        this.state = {
            item: this.props.item
        };
    }

    createItem(collection, collectionName, itemName) {
        axios.post("http://localhost:8090/"+collectionName, {name: itemName})
        .then((response) => {
          this.setItem(collectionName, response.data)
         })
      }
    
    setItem(collection, collectionName, item) {
        this.setState({[this.props.itemName]: item}, () => {
                this.props.updateCollection([], collectionName, item, false)
        })
      }
    
    deleteItem(collectionName, item) {
        this.setState({[this.props.itemName]: ''}, () => {
                this.props.updateCollection([], collectionName, item, true)
            })
    }


    render() {
        return (
            <div class="cl-b">
            <div>
            {this.props.item != '' && 
                  <div class="child-container">
                  <span class="child-span">{this.props.item.name}
                </span>
                <FontAwesomeIcon onClick={this.deleteItem.bind(this, this.props.collectionName, this.props.item)}
                                 className="fa-button" color="red" icon="times" />
                  </div>
                }
            </div>
          <div>
          <Autocomplete options={[]} placeholder={`Set ${this.props.collectionName}`}
                        addHandler={this.setItem} createHandler={this.createItem} creator={this.props.creator}
                        collectionName={this.props.collectionName} 
                        url={`http://localhost:8090/${this.props.collectionName}/`}/>
          </div>
          </div>
        );
    }
    
}

export default SetItem;