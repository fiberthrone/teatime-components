'use strict';

const {
  compose,
  isUndefined,
  negate,
  prop,
} = require('./dash');

const BUBBLES = {
  onBlur: false,
  onFocus: false,
};

const isControlled = compose(negate(isUndefined), prop('value'));
const whiteList = /^(?:data-|on[A-Z]|style$)/;

exports.isControlled = isControlled;
exports.filterProps = omitNonStandardAttrs; // alias for compatibility with previous version, will be remove on 0.9.x
exports.genericName = genericName;
exports.nullToString = nullToString;
exports.omitNonStandardAttrs = omitNonStandardAttrs;
exports.omitNonStandardAttrsAndHandlers = omitNonStandardAttrsAndHandlers;

// genericName :: object -> string -> string
function genericName({size, styles = {}, theme}, name) {
  const preset = `${theme}-${size}`.replace(/-?undefined-?/, '');

  if (!name) return styles[preset];
  if (!styles[preset]) {
    const presets = Object.keys(styles).map(p => JSON.stringify(p)).join(', ');

    if (isUndefined(theme)) throw new Error('The existing preset was not found. Expected one of [' + presets + '].' +
      ' Make sure that provided value of `size` `' + size + '` prop is valid.');
    if (isUndefined(size)) throw new Error('The existing preset was not found. Expected one of [' + presets + '].' +
      ' Make sure that provided value of `theme` `' + theme + '` props is valid.');
    throw new Error('The existing preset was not found. Expected one of [' + presets + '].' +
      ' Make sure that provided values of `theme` `' + theme + '` and `size` `' + size + '` props are valid.');
  }

  return styles[preset][name];
}

// nullToString :: a -> b
function nullToString(a) {
  return a === null ? '' : a;
}

// omitNonStandardAttrs :: a -> b
function omitNonStandardAttrs(props) {
  const keys = Object.keys(props);
  const length = keys.length;
  const nextProps = {};

  for (let j = 0; j < length; ++j) {
    const key = keys[j];

    if (whiteList.test(key)) nextProps[key] = props[key];
  }

  return nextProps;
}

// omitNonStandardAttrsAndHandlers :: a -> b
function omitNonStandardAttrsAndHandlers(props) {
  const keys = Object.keys(props);
  const length = keys.length;
  const nextProps = {};

  for (let j = 0; j < length; ++j) {
    const key = keys[j];

    if (whiteList.test(key) && BUBBLES[key] !== false) nextProps[key] = props[key];
  }

  return nextProps;
}
