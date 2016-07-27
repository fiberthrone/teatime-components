'use strict';

const { PropTypes } = require('react');
const Button = require('../view/Button');

const predefinedStyles = {
  'action-xs': require('../style/button/button-action-xs.css'),
  'action-s': require('../style/button/button-action-s.css'),
  'action-m': require('../style/button/button-action-m.css'),
  'action-l': require('../style/button/button-action-l.css'),
  'link-xs': require('../style/button/button-link-xs.css'),
  'link-s': require('../style/button/button-link-s.css'),
  'link-m': require('../style/button/button-link-m.css'),
  'link-l': require('../style/button/button-link-l.css'),
  'normal-xs': require('../style/button/button-normal-xs.css'),
  'normal-s': require('../style/button/button-normal-s.css'),
  'normal-m': require('../style/button/button-normal-m.css'),
  'normal-l': require('../style/button/button-normal-l.css'),
};

class ButtonComponent extends Button {
  styles() {
    return predefinedStyles[this.props.theme + '-' + this.props.size];
  }
}

ButtonComponent.defaultProps = {
  size: 's',
  theme: 'normal',
};

ButtonComponent.propTypes = {
  size: PropTypes.oneOf([
    'xs',
    's',
    'm',
    'l',
  ]),
  theme: PropTypes.oneOf([
    'action',
    'link',
    'normal',
  ]),
};

module.exports = ButtonComponent;
