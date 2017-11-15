import React, { Component } from 'react'
import { Header } from 'components';

export default class App extends Component {
    render() {

        return (
            <div>
            <Header />
            {this.props.children}
            </div>
        );
    }
}
