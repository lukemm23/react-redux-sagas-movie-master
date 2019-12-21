import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class Edit extends Component {
  state = {
    title: '',
    description: '',
  }

  backHome = () => {
    this.props.history.push('/');
  }
  details = () => {
    this.props.history.push('/details');
  }
  render() {
    const itemArr = this.props.store.detailReducer.selected.map((item, index) => {
      return (
        <li key={index}>
          {item.name}
        </li>
      )
    })

    return (
      <div className="App">
        <button onClick={this.backHome}>Back Home</button>
        <button onClick={this.details}>Cancel</button>
        <button>Save</button>
        <input placeholder="title"></input>
        <input placeholder="description"></input>
        <ul>
          {itemArr}
        </ul>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Edit);