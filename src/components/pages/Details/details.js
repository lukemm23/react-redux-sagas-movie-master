import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class Details extends Component {
    backHome = () => {
        this.props.history.push('/');
    }
    edit = () => {
        this.props.history.push('/edit');
    }
    render() {
        const itemArr = this.props.store.detailReducer.selected.map((item, index) => {
            return (
                <li key={index}>
                    {item.name}
                </li>
            )
        })
        const MovieArr = this.props.store.moviesReducer.selected.map((item, index) => {
            return (
                <div key={index}>
                    <h1>{item.title}</h1>
                    {item.description}
                </div>
            )
        })

        return (
            <div className="App">
                <button onClick={this.backHome}>Back Home</button>
                <button onClick={this.edit}>Edit</button>
                {MovieArr}
                <ul>
                    {itemArr}
                </ul>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(Details);