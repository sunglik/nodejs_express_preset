import React, { Component } from 'react'
import { Authentication } from '../components/index';

export default class Register extends Component {
  render() {
    return (
      <div>
        <Authentication mode = {false} />
      </div>
    )
  }
}
