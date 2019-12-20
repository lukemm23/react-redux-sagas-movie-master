import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class Home extends Component {
  componentDidMount() { // react Component method
    this.props.dispatch({
      type: 'GET_MOVIES',
    })
  }


  render() {
    const moviesArr = this.props.store.moviesReducer.map((item, index) => {
      return (
        <tr key={index}>
          <td><img alt="" src={item.poster}></img></td>
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