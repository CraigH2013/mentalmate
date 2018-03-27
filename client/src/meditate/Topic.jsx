import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ExampleBox from '../components/ExampleBox';

const Topic = ({ topic, onTopicChange }) => (
  <div>
    {/* eslint-disable-next-line max-len */}
    {/* <h2 className="title is-2 has-text-centered has-text-weight-normal has-text-white">
      What would you like to meditate on?
    </h2> */}
    <div className="columns is-centered">
      <div className="column is-two-thirds">
        <div className="content is-medium has-text-centered has-text-white">
          {/* <p>What would you like to meditate on?</p> */}
          <h2 className="title is-2 has-text-centered has-text-weight-normal has-text-white">
            What would you like to meditate on?
          </h2>
          <ExampleBox
            strings={[
              'Negative encounter with my boss',
              "I'm worried I might fail my classes",
            ]}
            duration={3000}
            animation={{ in: 'fadeInDown', out: 'fadeOutDown' }}
          />
        </div>
      </div>
    </div>
    <br />
    <div className="columns is-centered">
      <div className="column is-half has-text-centered">
        <input
          className="input is-size-5 has-text-centered"
          type="text"
          value={topic}
          onChange={onTopicChange}
        />
      </div>
    </div>

    <br />
    <br />

    {topic !== '' && (
      <div className="columns is-centered">
        <div className="column has-text-centered">
          <Link
            to="/meditate/situation"
            className={classNames('button is-primary animated', {
              fadeInDown: topic,
            })}
          >
            <span>Continue</span>
            <span className="icon is-small">
              <i className="fas fa-long-arrow-alt-right" />
            </span>
          </Link>
        </div>
      </div>
    )}
  </div>
);

Topic.propTypes = {
  topic: PropTypes.string.isRequired,
  onTopicChange: PropTypes.func.isRequired,
};

export default Topic;
