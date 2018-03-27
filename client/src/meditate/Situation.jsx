import React, { Component } from 'react';
import classNames from 'classnames';

class Situation extends Component {
  state = {
    instructionOne: false,
  };

  componentDidMount() {
    this.instructionOne = setTimeout(() => {
      this.setState({ instructionOne: true });
    }, 3000);
  }

  componentWillUnmount() {
    clearTimeout(this.instructionOne);
  }

  render() {
    const { instructionOne } = this.state;

    return (
      <div>
        <h1
          // eslint-disable-next-line
          className="title has-text-centered has-text-white animated infinite pulse"
          style={{
            animationDuration: '5s',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.14, 0.77)',
          }}
        >
          Focus on the situation
        </h1>
        <br />
        <br />
        <br />
        <div className="columns is-centered">
          <div className="column">
            {instructionOne && (
              <h1
                className={classNames(
                  'subtitle is-1 has-text-centered has-text-white animated',
                  {
                    flash: instructionOne,
                  },
                )}
              >
                STOP IT!!
              </h1>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Situation;
