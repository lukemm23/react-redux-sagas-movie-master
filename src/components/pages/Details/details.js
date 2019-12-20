import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class Details extends Component {


    render() {
        const detailsArr = this.props.store.moviesReducer.map((item, index) => {
            return (
                <div key={index}>
                   
                        <h2>{item.title}</h2>
                        {item.description}
                    
                </div>
            );
        })

        return (
            <div className="App">
                {detailsArr}
            </div>
        );
    }
}

export default connect(mapStoreToProps)(Details);