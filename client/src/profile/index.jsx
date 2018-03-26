import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import DailyEntry from './DailyEntry';

class Profile extends Component {
  state = {
    user: {},
  };

  componentDidMount() {
    axios.get('/api/me').then(({ data }) => {
      this.setState({ user: data });
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar user={this.state.user} />
          <section className="section">
            <div className="container">
              <DailyEntry />
            </div>
          </section>
        </div>
      </Router>
    );
  }
}

render(<Profile />, document.getElementById('root'));
