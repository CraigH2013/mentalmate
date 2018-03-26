import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

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
              <ul>
                <li>
                  <Link to="/profile">Home</Link>
                </li>
                <li>
                  <Link to="/profile/about">About</Link>
                </li>
              </ul>

              <hr />

              <Route exact path="/profile" component={Home} />
              <Route path="/profile/about" component={About} />
            </div>
          </section>
        </div>
      </Router>
    );
  }
}

render(<Profile />, document.getElementById('root'));
