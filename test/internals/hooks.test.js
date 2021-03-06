'use strict'

const t = require('tap')
const test = t.test

const Hooks = require('../../lib/hooks')
const noop = () => {}

test('hooks should have 4 array with the registered hooks', t => {
  t.plan(4)
  const hooks = new Hooks()
  t.is(typeof hooks, 'object')
  t.ok(Array.isArray(hooks.onRequest))
  t.ok(Array.isArray(hooks.preRouting))
  t.ok(Array.isArray(hooks.preHandler))
})

test('hooks.add should add an hook to the given hook', t => {
  t.plan(6)
  const hooks = new Hooks()
  hooks.add('onRequest', noop)
  t.is(hooks.onRequest.length, 1)
  t.is(typeof hooks.onRequest[0], 'function')

  hooks.add('preRouting', noop)
  t.is(hooks.preRouting.length, 1)
  t.is(typeof hooks.preRouting[0], 'function')

  hooks.add('preHandler', noop)
  t.is(hooks.preHandler.length, 1)
  t.is(typeof hooks.preHandler[0], 'function')
})

test('hooks should throw on unexisting handler', t => {
  t.plan(1)
  const hooks = new Hooks()
  try {
    hooks.add('onUnexistingHook', noop)
    t.fail()
  } catch (e) {
    t.pass()
  }
})

test('should throw on wrong parameters', t => {
  const hooks = new Hooks()
  t.plan(2)
  try {
    hooks.add(null, noop)
    t.fail()
  } catch (e) {
    t.is(e.message, 'The hook name must be a string')
  }

  try {
    hooks.add('', null)
    t.fail()
  } catch (e) {
    t.is(e.message, 'The hook callback must be a function')
  }
})
