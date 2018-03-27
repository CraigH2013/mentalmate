import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class ExampleBox extends Component {
  static propTypes = {
    strings: PropTypes.arrayOf(PropTypes.string).isRequired,
    duration: PropTypes.number,
    repeat: PropTypes.bool,
    animation: PropTypes.shape({
      in: PropTypes.string,
      out: PropTypes.string,
    }),
    className: PropTypes.string,
  };

  static defaultProps = {
    duration: 1000,
    repeat: false,
    animation: {
      in: 'fadeInRight',
      out: 'fadeOutLeft',
    },
    className: '',
  };

  state = {
    index: 0,
    animate: 'in',
  };

  componentDidMount() {
    const { duration } = this.props;
    this.loop = setInterval(() => {
      const { animate } = this.state;
      let { index } = this.state;
      const { repeat, strings } = this.props;

      if (index + 1 === strings.length) {
        if (repeat) {
          if (animate === 'out') {
            index = -1;
          }
        } else {
          return clearInterval(this.loop);
        }
      }

      return this.setState({
        animate: animate === 'in' ? 'out' : 'in',
        index: animate === 'out' ? index + 1 : index,
      });
    }, duration);
  }

  componentWillUnmount() {
    clearInterval(this.loop);
  }

  render() {
    const { animate, index } = this.state;
    const { strings, className, animation } = this.props;
    return (
      <div>
        <p
          className={classNames('animated', className, {
            [animation.in]: animate === 'in',
            [animation.out]: animate === 'out',
          })}
        >
          {strings[index]}
        </p>
      </div>
    );
  }
}

export default ExampleBox;
