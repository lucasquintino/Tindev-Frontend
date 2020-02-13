import React, { Component } from "react";
import "./login.css";
import like from "../assets/like.svg";
import dislike from "../assets/dislike.svg";
import logo from "../assets/logo.svg";
import itsamatch from "../assets/itsamatch.png";
import { Link } from "react-router-dom";

import api from "../services/api";
import "./main.css";

import io from "socket.io-client";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      match: null
    };
  }
  componentDidMount() {
    const user = this.props.match.params.id;
    const socket = io("http://localhost:3333", {
      query: { user: user }
    });
    socket.on("match", dev => {
      this.setState({match:dev})
    });
    api
      .get("/devs", {
        headers: {
          user: user
        }
      })
      .then(res => {
        this.setState({ users: res.data });
      });
  }

  handleLike(id) {
    const user = this.props.match.params.id;
    api.post(`/devs/${id}/likes`, null, { headers: { user: user } }).then(
      this.setState({
        users: this.state.users.filter(user => user._id !== id)
      })
    );
  }

  handleDislike(id) {
    const user = this.props.match.params.id;
    api.post(`/devs/${id}/dislikes`, null, { headers: { user: user } }).then(
      this.setState({
        users: this.state.users.filter(user => user._id !== id)
      })
    );
  }

  render() {
    const renderUsers = () => {
      return this.state.users.map(user => (
        <li key={user._id}>
          <img src={user.avatar} alt="" />
          <footer>
            <strong>{user.name}</strong>
            <p>{user.bio}</p>
          </footer>
          <div className="divButtons">
            <button onClick={() => this.handleDislike(user._id)} type="button">
              <img src={dislike} />
            </button>
            <button onClick={() => this.handleLike(user._id)} type="button">
              <img src={like} />
            </button>
          </div>
        </li>
      ));
    };

    return (
      this.state.match && (
        <div className="matchContainer">
          <img src={itsamatch} alt=''/>
          <img className='avatar' src={this.state.match.avatar} />
          <strong>{this.state.match.name}</strong>
          <p>
          {this.state.match.bio}
          </p>
          <button onClick={() => this.setState({match:null})}>Fechar</button>
        </div>
      )
      ||
      <div className="containerMain">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>

        {this.state.users.length > 0 ? (
          <ul>{renderUsers()}</ul>
        ) : (
          <div className="empty">Nenhum dev para você curtir =(</div>
        )}

      </div>
    );
  }
}
export default Main;
