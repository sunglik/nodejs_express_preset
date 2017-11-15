import React, { Component } from 'react'
import { Authentication } from '../components/index';

export default class Login extends Component {
  render() {
    return (
      <div>
        <Authentication mode={true}/>
      </div>
    )
  }
}
