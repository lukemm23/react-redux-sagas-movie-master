import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class Home extends Component {
  componentDidMount() { // react Component method
    this.props.dispatch({
      type: 'GET_DETAILS',
    })
  }

  //image click event 
  clickEvent(event, title) {
    this.props.dispatch({
      type: 'GET_ITEM_DETAIL',
      payload: title
    })
    this.props.history.push('/details');
  }

  render() {
    const buffer = {};
    const moviesArr = this.props.store.detailReducer.items.map((item, index) => {
        if(buffer[item.movies_id] === undefined) {
          buffer[item.movies_id] = true;
          return (<tr key={index}>
            <td
              onClick={(event) => this.clickEvent(event, item.title)}>
              <img alt="" src={item.poster}></img>
            </td>
            <td>
              <h2>{item.title}</h2>
              {item.description}
            </td>
          </tr>)
        } else {return null;}
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