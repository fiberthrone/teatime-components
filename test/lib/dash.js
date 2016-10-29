'use strict';

const {
  compose,
  constant,
  curry,
  groupBy,
  identity,
  invert,
  map,
  omit,
  prop,
  reduce,
} = require('../../lib/dash');
const test = require('tape');

const add = curry((a, b, c = 0) => a + b + c);
const inc = add(1);

test('invert', t => {
  t.deepEqual(invert(['a', 'b']), {a: '0', b: '1'});
  t.deepEqual(invert({a: 'b'}), {b: 'a'});
  t.end();
});

test('omit', t => {
  t.deepEqual(omit(['a', 'b'], {b: 3, c: 0, d: false}), {c: 0, d: false});
  t.deepEqual(omit(['a', 'b'])({b: 3, c: 0, d: false}), {c: 0, d: false});
  t.end();
});

test('compose', t => {
  t.equal(compose()(5), 5);
  t.equal(compose(add)(5, 1), 6);
  t.equal(compose(identity)(5), 5);
  t.equal(compose(identity, add(1))(5), 6);
  t.equal(compose(add(1), identity)(5), 6);
  t.end();
});

test('constant', t => {
  t.equal(constant(5)(), 5);
  t.end();
});

test('curry', t => {
  const add = curry((a, b, c = 0) => a + b + c);

  t.equal(add(1)(2), 3);
  t.equal(add(1, 2), 3);
  t.equal(add(1)()(2), 3);
  t.equal(add()(1)(2), 3);
  t.equal(add(1, 2, 3), 6);
  t.equal(add(1)(2, 3), 6);
  t.end();
});

test('groupBy', t => {
  t.deepEqual(groupBy(Math.round, [1, 3.2, 1.5, 2, 3]), {
    1: [1],
    2: [1.5, 2],
    3: [3.2, 3],
  });
  t.end();
});

test('map', t => {
  t.deepEqual(map(inc, [1, 2, 3]), [2, 3, 4]);
  t.deepEqual(map(inc, {a: 1, b: 2, c: 3}), [2, 3, 4]);
  t.end();
});

test('prop', t => {
  t.equal(prop('a', {a: 5}), 5);
  t.equal(prop('a')({a: 5}), 5);
  t.end();
});

test('reduce', t => {
  t.deepEqual(reduce(add, 0, [1, 2, 3]), 6);
  t.end();
});
