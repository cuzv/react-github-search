import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import './List.css'

export default class List extends Component {
  state = {
    users: [],
    isFirst: true,
    isLoading: false,
    error: null
  }

  componentDidMount() {
    this.token = PubSub.subscribe('updateListState', (_, state) => {
      this.setState(state)
    })
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.token)
  }

  render() {
    const {users, isFirst, isLoading, error} = this.state
    return (
      <div className="row">
        {
          isFirst ? <h1>Welcome to use</h1> :
          isLoading ? <h1>Loading...</h1> :
          error ? <h1 style={{color: 'red'}}>{error.message}</h1> :
          0 === users.length ? <h1>Ther is no result.</h1> :
          users.map(user => {
            return (
              <div className="card" key={user.id}>
                <a href={user.html_url} target="_blank" rel="noreferrer">
                  <img src={user.avatar_url} style={{width: '100px'}} alt="user avatar"/>
                </a>
                <p className="card-text">{user.login}</p>
              </div>
            )
          })
        }        
      </div>
    )
  }
}
