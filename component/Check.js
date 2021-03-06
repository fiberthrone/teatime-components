'use strict';

const {Component} = require('react');
const {genericName, omitNonStandardAttrsAndHandlers} = require('../lib/util');
const {genericId} = require('../lib/identity');
const {isUndefined, noop} = require('../lib/dash');
const PropTypes = require('prop-types');
const React = require('react');
const cc = require('classnames');

const cssModules = {
  l: require('../style/check/check-l.css'),
  m: require('../style/check/check-m.css'),
};

class Check extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id || genericId(),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      id: isUndefined(nextProps.id)
        ? this.state.id
        : nextProps.id,
    });
  }

  css = tokenName => genericName(this.props, tokenName)

  focus() {
    if (!this._check) return;
    this._check.focus();
  }

  _onChange = e => {
    const {checked, value} = e.target;
    const {name} = this.props;

    this.props.onChange(e, {checked, name, value});
  }

  render() {
    const {className} = this.props;
    const {css} = this;

    return (
      <span
        {...omitNonStandardAttrsAndHandlers(this.props)}
        className={cc(css('wrapper'), className)}
        onChange={void 0}>
        {this.renderInput()}
        {this.renderControl()}
        {this.renderLabel()}
      </span>
    );
  }

  renderInput() {
    const {
      checked,
      defaultChecked,
      disabled,
      name,
      onBlur,
      onFocus,
      value,
    } = this.props;

    const {id} = this.state;
    const {css} = this;

    return (
      <input
        checked={checked}
        className={css('native')}
        defaultChecked={defaultChecked}
        disabled={disabled}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={this._onChange}
        onFocus={onFocus}
        ref={r => this._check = r}
        type='checkbox'
        value={value}/>
    );
  }

  renderControl() {
    const {children, hasLabel, label} = this.props;
    const {id} = this.state;
    const {css} = this;

    const text = isUndefined(label)
      ? children
      : label;

    return (
      <label
        children={hasLabel ? void 0 : text}
        className={css('control')}
        htmlFor={id}/>
    );
  }

  renderLabel() {
    if (!this.props.hasLabel) return null;

    const {children, label} = this.props;
    const {id} = this.state;
    const {css} = this;

    const text = isUndefined(label)
      ? children
      : label;

    return (
      <label
        children={text}
        className={css('label')}
        htmlFor={id}/>
    );
  }
}

Check.defaultProps = {
  hasLabel: true,
  onChange: noop,
  size: 'm',
  styles: cssModules,
};

Check.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  hasLabel: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.node,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  size: PropTypes.oneOf([
    'l',
    'm',
  ]),
  styles: PropTypes.object,
  value: PropTypes.string,
};

module.exports = Check;
