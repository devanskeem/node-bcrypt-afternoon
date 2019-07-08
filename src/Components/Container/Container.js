import React, { Component } from 'react';
import axios from 'axios';
import './Container.css';
import Treasure from '../Treasure';

export default class Container extends Component {
  constructor() {
    super();
    this.state = {
      treasures: {},
    };
    this.addMyTreasure = this.addMyTreasure.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ treasures: {} });
    }
  }

  getDragonTreasure() {
    // axios GET to /api/treasure/dragon here
    axios.get('/treasure/dragon')
    .then(res => {
      this.setState({
        treasures: {
          dragon: res.data
        }
      })
    })
    .catch(
      err => {
        alert(err)
      }
    )
  }

  getAllTreasure() {
    axios.get('/treasure/all').then(res => {
      this.setState({
        treasures: {
          all: res.data
        }
      })
    })
    .catch(
      err => {
        alert(err)
      }
    )
  }

  getMyTreasure() {
    axios.get('/treasure/user').then(res => {
      console.log('res.data', res.data)
      this.setState({
        treasures: {
          user: res.data
        }
      })
    })  
    .catch(
      err => {
        alert(err)
      }
    )
  }

  addMyTreasure(newMyTreasure) {
    this.setState({
      treasures: {
        ...this.state.treasures,
        user: newMyTreasure,
      },
    })
    .catch(
      err => {
        alert(err)
      }
    )
  }

  render() {
    const { username } = this.props.user;
    const { dragon, user, all } = this.state.treasures;
    return (
      <div className="Container">
        {dragon ? (
          <div className="treasureBox loggedIn">
            <h1>Dragon's treasure</h1>
            <Treasure treasure={dragon} />
          </div>
        ) : (
          <div className="treasureBox">
            <button className="title" onClick={() => this.getDragonTreasure()}>
              See Dragon's <br /> Treasure
            </button>
            <p>This treasure trove does not require a user to be logged in for access</p>
          </div>
        )}
        {user && username ? (
          <div className="treasureBox loggedIn">
            <h1>
              {this.props.user.username}
              's treasure
            </h1>
            <Treasure treasure={user} addMyTreasure={this.addMyTreasure} />
          </div>
        ) : (
          <div className="treasureBox">
            <button className="title" onClick={() => this.getMyTreasure()} name="user">
              See My <br /> Treasure
            </button>
            <p>This treasure trove requires a user to be logged in for access</p>
          </div>
        )}
        {all && username ? (
          <div className="treasureBox loggedIn">
            <h1>All treasure</h1>
            <Treasure treasure={all} />
          </div>
        ) : (
          <div className="treasureBox">
            <button className="title" onClick={() => this.getAllTreasure()} name="all">
              See All <br /> Treasure
            </button>
            <p>This treasure trove requires a user to be a logged in as an admin user for access</p>
          </div>
        )}
      </div>
    );
  }
}
