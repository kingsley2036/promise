import * as chai from 'chai'
const assert=chai.assert
import promise from '../src/index'
describe('test',()=>{
  it('它是一个类',()=>{
    assert.isFunction(promise)
    assert.isObject(promise.prototype)
  })
  it('它只接受函数',()=>{
    assert.throw(()=>{
      new promise(1)
    })
    assert.throw(()=>{
      new promise('1')
    })
    
  })
})