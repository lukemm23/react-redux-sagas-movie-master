import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class Home extends Component {
  componentDidMount() { // react Component method
    this.props.dispatch({
      type: 'GET_MOVIES',
    })
    this.props.dispatch({
      type: 'GET_DETAILS',
    })
  }

  clickEvent(event, title) {
    this.props.dispatch({
      type: 'GET_ITEM_DETAIL',
      payload: title
    })
    this.props.dispatch({
      type: 'GET_ITEM_MOVIE',
      payload: title
    })
    this.props.history.push('/details');
  }

  render() {
    const moviesArr = this.props.store.moviesReducer.items.map((item, index) => {
      return (
        <tr key={index}>
          <td
            onClick={(event) => this.clickEvent(event, item.title)}>
            <img alt="" src={item.poster}></img>
          </td>
          <td>
            <h2>{item.title}</h2>
            {item.description}
          </td>
        </tr>
      );
    })
    return (
      <div className="App">
        <table>
          <tbody>
            {moviesArr}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Home);