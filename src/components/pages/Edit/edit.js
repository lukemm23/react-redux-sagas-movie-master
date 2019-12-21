import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class Edit extends Component {
  state = {
    id: null,
    title: '',
    description: '',
  }

  componentDidMount () {
    this.setState ({
      id: this.props.store.detailReducer.selected[0].movies_id,
    })
    console.log(this.state.id);
  }

//EVENT HANDLERS
onInputChange = (event, inputKey) => {
  console.log(this.state.id);
  this.setState({
    [inputKey]: event.target.value
  });
  console.log(this.state);
}

submitChange = (event, id) => {
  this.props.dispatch({
    type: 'SUBMIT',
    payload: {...this.state, callBack:()=>{
      this.props.history.push('/details');
    }}
  })
  
}

//PAGE ROUTING
  backHome = () => {
    this.props.history.push('/');
  }
  details = () => {
    this.props.history.push('/details');
  }
  render() {
    const itemArr = this.props.store.detailReducer.selected&&this.props.store.detailReducer.selected.map((item, index) => {
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
        <button onClick={this.submitChange}>Save</button>
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