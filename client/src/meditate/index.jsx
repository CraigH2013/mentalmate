import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Topic from './Topic';
import Situation from './Situation';

const Emotions = () => (
  <div>
    <h1 className="has-text-white">Enter emotions</h1>
    <Link to="/meditate/thoughts">Thoughts</Link>
    <Link to="/meditate">Topic</Link>
  </div>
);

const Thoughts = () => (
  <div>
    <h1 className="has-text-white">Enter thoughts</h1>
    <Link to="/meditate/finish">Finish</Link>
    <Link to="/meditate/emotions">Emotions</Link>
  </div>
);

const Finish = () => (
  <div>
    <h1 className="has-text-white">Finished</h1>
  </div>
);

class Meditate extends Component {
  state = {
    topic: '',
  };

  handleTopicChange = ({ target: { value } }) =>
    this.setState({ topic: value });

  render() {
    const { topic } = this.state;

    return (
      <section className="section">
        <div className="container">
          <a href="/profile" className="delete is-large" />
          <br />
          <br />
          <Router>
            <div>
              <Route
                exact
                path="/meditate"
                render={props => (
                  <Topic
                    {...props}
                    topic={topic}
                    onTopicChange={this.handleTopicChange}
                  />
                )}
              />
              <Route path="/meditate/situation" component={Situation} />
              <Route path="/meditate/emotions" component={Emotions} />
              <Route path="/meditate/thoughts" component={Thoughts} />
              <Route path="/meditate/finish" component={Finish} />
            </div>
          </Router>
        </div>
      </section>
    );
  }
}

render(<Meditate />, document.getElementById('root'));
