import React, { Component } from "react";
import "./login.css";
import logo from "../assets/logo.svg";

import api from '../services/api'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: ""
    };
  }
  async handleSubmit(e) {
    e.preventDefault()
    const response = await api.post('/devs',{
      username:this.state.username
    })
    console.log(response)
    this.props.history.push(`/dev/${response.data._id}`)
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <img src={logo} alt="logo" />
          <input
            value={this.state.username}
            onChange={e => this.setState({ username: e.target.value })}
            id="feName"
            type="name"
            placeholder="Digite seu usuario do github"
          />
          <button type='submit'>Entrar</button>
        </form>
      </div>
    );
  }
}

export default Login;
