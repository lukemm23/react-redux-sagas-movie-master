import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class Details extends Component {
    // componentDidMount() { // react Component method
    //     this.props.dispatch({
    //         type: 'GET_ITEM_DETAIL',
    //         payload: this.props.match.params.title
    //       })
    //   }

    //ROUTE buttons handler
    backHome = () => {
        this.props.history.push('/');
    }
    edit = () => {
        this.props.history.push('/edit');
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
                <button onClick={this.edit}>Edit</button>
                   <h1>{this.props.store.detailReducer.selected&&this.props.store.detailReducer.selected[0]&&this.props.store.detailReducer.selected[0].title}</h1> 
                   {this.props.store.detailReducer.selected&&this.props.store.detailReducer.selected[0]&&this.props.store.detailReducer.selected[0].description}
                <ul>
                    {itemArr}
                </ul>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(Details);