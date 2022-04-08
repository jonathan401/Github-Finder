import React, { Component } from 'react';
import Navbar from './components/layouts/Navbar';
import Users from './components/Users/Users';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    users: [],
    loading: false
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get('https://api.github.com/users');

    const users = [...res.data];
    this.setState({ users, loading: false });
  }

  render() {
    return (
      <main>
        <Navbar />
        <div className="container">
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </main>
    );
  }
}

export default App;
