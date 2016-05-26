'use strict';

const Button = require('./Button');
const Option = require('./Option');
const React = require('react');
const { Component, PropTypes } = React;
const {
  bind,
  decrement,
  increment,
  findIndexByValueProp,
  noop,
} = require('../tools/func');
const cssModules = require('react-css-modules');
const reactOutsideEvent = require('react-outside-event');

class Select extends Component {
  constructor(props) {
    super(props);

    // @todo check for single prop
    const value = props.defaultValue || props.value;
    var index = typeof value === 'string'
      ? findIndexByValueProp(props.options, value)
      : 0;

    if (index === -1) {
      console.error(`Warning: Failed propType: Required prop \`options\` doesn't contains \`value\` \`${value}\` in \`Select\``); // eslint-disable-line no-console
      index = 0;
    }

    this.state = {
      isOpened: false,
      position: index,
      selected: index,
      value: props.defaultValue || props.value || props.options[index].value,
    };

    bind(this, [
      'onClick',
      'onKeyDown',
      'onOptionClick',
      'onOptionMouseEnter',
    ]);
  }

  onClick() {
    this.setState({isOpened: !this.state.isOpened});
  }

  /**
   * http://facebook.github.io/react/docs/events.html#keyboard-events
   *
   * @param {object} e
   * @param {number} e.keyCode
   */
  onKeyDown(e) {
    if (this.props.disabled) return;
    if (e.keyCode === 9) return this.setState({isOpened: false});
    e.preventDefault();

    const { options } = this.props;
    const { isOpened, position, selected } = this.state;

    switch (e.keyCode) {
    case 13: // enter
    case 32: // space
      this.setState({
        isOpened: false,
        selected: position,
        value: this.props.options[position].value,
      });
      return this.props.onChange(e, this.props.options[position].value);
    case 27: // esc
      return this.setState({isOpened: false, position: selected});
    case 38: // up
      if (!isOpened) return this.setState({isOpened: true});
      return this.setState({position: decrement(position, options.length)});
    case 40: // down
      if (!isOpened) return this.setState({isOpened: true});
      return this.setState({position: increment(position, options.length)});
    }
  }

  onOptionClick(e, i) {
    this.setState({
      isOpened: false,
      position: i,
      selected: i,
      value: this.props.options[i].value,
    });

    this.props.onChange(e, this.props.options[i].value);
  }

  onOptionMouseEnter(e, i) {
    this.setState({position: i});
  }

  onOutsideEvent() {
    this.setState({isOpened: false});
  }

  render() {
    const { className, disabled, name, ...o } = this.props;
    const { value } = this.state;

    return (
      <div
        {...o}
        className={className}
        onKeyDown={this.onKeyDown}
        styleName='container'
      >
        {this.renderButton()}
        {this.renderPopup()}
        <input disabled={disabled} name={name} type='hidden' value={value}/>
      </div>
    );
  }

  renderButton() {
    const { disabled, options, buttonStyles } = this.props;
    const { isOpened, selected } = this.state;

    return (
      <Button
        disabled={disabled}
        onClick={this.onClick}
        styles={buttonStyles[isOpened ? 'buttonOpened' : 'buttonClosed']}
      >
        {options[selected].text}
      </Button>
    );
  }

  renderPopup() {
    const { isOpened } = this.state;

    if (!isOpened) {
      return null;
    }

    return (
      <div styleName='popup'>{this.renderOptions()}</div>
    );
  }

  renderOptions() {
    const { optionStyles, options } = this.props;
    const { position, selected } = this.state;

    return options.map(({ text, value }, i) => (
      <Option
        focused={position === i}
        identity={i}
        key={`_${value}${i}`}
        onClick={this.onOptionClick}
        onMouseEnter={this.onOptionMouseEnter}
        selected={selected === i}
        styles={optionStyles}
        value={value}
      >
        {text}
      </Option>
    ));
  }
}

Select.defaultProps = {
  buttonStyles: {},
  onClick: noop,
  onChange: noop,
  onKeyDown: noop,
  optionStyles: {},
  styles: {},
};

Select.propTypes = {
  buttonStyles: PropTypes.object,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onContextMenu: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyPress: PropTypes.func,
  onKeyUp: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseUp: PropTypes.func,
  onTouchCancel: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onTouchMove: PropTypes.func,
  onTouchStart: PropTypes.func,
  optionStyles: PropTypes.object,
  options: PropTypes.array,
  styles: PropTypes.object,
  value: PropTypes.string,
};

module.exports = reactOutsideEvent(cssModules(Select), ['click']);