import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class Edit extends Component {
  state = {
    title: '',
    description: '',
  }

//EVENT HANDLER 
onInputChange = (event, inputKey) => {
  this.setState({
    [inputKey]: event.target.value
  });
  console.log(this.state);
}

//PAGE ROUTING
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
        <input onChange={(event)=>this.onInputChange(event, 'title')} placeholder="title"></input>
        <input onChange={(event)=>this.onInputChange(event, 'description')} placeholder="description"></input>
        <ul>
          {itemArr}
        </ul>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Edit);