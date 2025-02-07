import { describe, expect, it } from 'bun:test'
import EventCat from '../index'

describe('EventCat test case', () => {

  it('should be able to listen to events', () => {
    const eventCat = EventCat.create()
    // string
    eventCat.on('test-event', (data) => {
      expect(data).toEqual('test')
    })
    eventCat.emit('test-event', 'test')

    // object
    eventCat.on('test-event2', (data) => {
      expect(data).toEqual({ payload: 'test' })
    })
    eventCat.emit('test-event2', { payload: 'test' })

    // params
    eventCat.on('test-event3', (data1, data2, data3) => {
      expect(data1).toEqual('test')
      expect(data2).toEqual({ payload: 'test' })
      expect(data3).toEqual(['a'])
    })
    eventCat.emit('test-event3', 'test', { payload: 'test' }, ['a'])

  })

  it('should be able to listen to events with once', () => {
    const eventCat = EventCat.create()
    eventCat.once('test-once', (data) => {
      expect(data).toEqual('test')
    })
    eventCat.emit('test-once', 'test')

    expect(eventCat.emit('test-once', 'test')?.message).toEqual(`EventCat: test-once is not registered`)
  })


  it('should be able to listen to events with off', () => {
    const eventCat = EventCat.create()
    const handler = (data) => {
      expect(data).toEqual('test')
    }
    eventCat.on('test-off', handler)
    eventCat.emit('test-off', 'test')
    eventCat.off('test-off', handler)
    expect(eventCat.emit('test-off', 'test')?.message).toEqual(`EventCat: test-off is not registered`)

    // listen to the same event four times
    const cb1 = function () {
      expect(1).toEqual(1)
    }
    const cb2 = function () {
      expect('this function should not be called').toEqual('false')
    }
    const cb3 = function () {
      expect(1).toEqual(1)
    }
    const cb4 = function () {
      expect(1).toEqual(1)
    }
    eventCat.on('test-off', cb1)
    eventCat.on('test-off', cb2)
    eventCat.on('test-off', cb3)
    eventCat.on('test-off', cb4)
    // remove cb2
    eventCat.off('test-off', cb2)
    // emit test-off
    eventCat.emit('test-off', 'test')
  })

  it('should be able to clear event', () => {
    const eventCat = EventCat.create()
    const handler = (data) => {
      expect(data).toEqual('test')
    }
    eventCat.on('test-clear', handler)
    eventCat.on('test-clear', handler)
    eventCat.emit('test-clear', 'test')
    eventCat.clear('test-clear')
    expect(eventCat.emit('test-clear', 'test')?.message).toEqual(`EventCat: test-clear is not registered`)

    eventCat.clear()
    expect(eventCat.emit('test-off', 'test')?.message).toEqual(`EventCat: test-off is not registered`)
  })

  it('should be able to create a EventCat instance', () => {
    expect(EventCat.create()).toBeInstanceOf(EventCat)
  })

  it('should be able to get a same instance', () => {
    expect(EventCat.event).toBe(EventCat.event)
    expect(EventCat.event).toBeInstanceOf(EventCat)
  })
})