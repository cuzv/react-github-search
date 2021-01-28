import React, { Component } from 'react'
import axios from 'axios'
import PubSub from 'pubsub-js'

export default class Search extends Component {
  handleSearch = () => {
    const {value} = this.searchInputTag
    const query = value.trim()
    if (!query) {
      alert("Input can't be empty")
      return
    }

    PubSub.publish('updateListState', {isFirst: false, isLoading: true})

    axios.get(`https://api.github.com/search/users?q=${query}`).then(
      response => {
        PubSub.publish('updateListState', {isLoading: false, users: response.data.items})
      },
      error => {
        PubSub.publish('updateListState', {isLoading: false, error: error})
      }
    )
  }

  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input type="text" placeholder="enter the name you search" ref={c => this.searchInputTag = c} />&nbsp;
          <button onClick={this.handleSearch}>Search</button>
        </div>
      </section>
    )
  }
}
