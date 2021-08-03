import * as chai from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
chai.use(sinonChai)
const assert = chai.assert
import promise from '../src/index'
describe('test', () => {
	it('它是一个类', () => {
		assert.isFunction(promise)
		assert.isObject(promise.prototype)
	})
	it('它只接受函数', () => {
		assert.throw(() => {
			new promise(1)
		})
		assert.throw(() => {
			new promise('1')
		})
	})
	it('它有一个then方法', () => {
		const newPromise = new promise(() => {})
		// @ts-ignore
		assert.isFunction(newPromise.then)
	})
	it('new promise(fn)中的fn立即执行', () => {
		let fn = sinon.fake()
		const newPromise = new promise(fn)
		// @ts-ignore
		assert(fn.called)
	})
	it('new promise(fn)中的fn接受resolve和reject两个函数', () => {
		const newPromise = new promise((resolve, reject) => {
			assert.isFunction(resolve)
			assert.isFunction(reject)
		})
	})
	it('new promise(fn).then(success)中的success会在resolve被调用的时候执行', (done) => {
		let success = sinon.fake()
		const newPromise = new promise((resolve) => {
			assert.isFalse(success.called)
			resolve()
			setTimeout(() => {
				assert(success.called)
				done()
			})
		})
		newPromise.then(success)
	})
	it('new promise(fn).then(null,fail)中的fail会在reject被调用的时候执行', (done) => {
		let fail = sinon.fake()
		const newPromise = new promise((resolve, reject) => {
			assert.isFalse(fail.called)
			reject()
			setTimeout(() => {
				assert(fail.called)
				done()
			})
		})
		newPromise.then(null, fail)
	})
	it('2.2.1 ,忽略success', () => {
		const newPromise = new promise((resolve, reject) => {
			resolve()
		})
    newPromise.then(false)
	})
  it('2.2.1 ,忽略fail', () => {
		const newPromise = new promise((resolve, reject) => {
			reject()
		})
    newPromise.then(null,false)
	})
  it('2.2.2,success', (done) => {
    const success=sinon.fake()
		const newPromise = new promise((resolve) => {
      assert.isFalse(success.called)
			resolve(233)
      resolve(233)
      setTimeout(() => {
        assert(newPromise.state==='fulfilled')
				assert(success.calledWith(233))
        assert(success.calledOnce)
				done()
			})
		})  
    newPromise.then(success)
	})
  it('2.2.2,fail', (done) => {
    const fail=sinon.fake()
		const newPromise = new promise((resolve,reject) => {
      assert.isFalse(fail.called)
			reject(233)
      reject(233)

      setTimeout(() => {
        assert(newPromise.state==='rejected')
				assert(fail.calledWith(233))
        assert(fail.calledOnce)
				done()
			})
		})  
    newPromise.then(null,fail)
	})
  it('2.2.4,success',(done)=>{
    const success=sinon.fake()
		const newPromise = new promise((resolve) => {
			resolve(233)     
		})  
    newPromise.then(success)
    console.log(0)
    assert.isFalse(success.called)
    setTimeout(()=>{
      assert(success.called)
      done()
    },0)

  })
  it('2.2.4,fail',(done)=>{
    const fail=sinon.fake()
		const newPromise = new promise((resolve,reject) => {
			reject(233)     
		})  
    newPromise.then(null,fail)
    console.log(0)
    assert.isFalse(fail.called)
    setTimeout(()=>{
      assert(fail.called)
      done()
    },0)
  })
  it('不传递this,success',(done)=>{
    const newPromise = new promise((resolve) => {
			resolve()     
		}) 
    newPromise.then(function(){
      'use strict'
      assert(this===undefined)
      done()
    })
  })
  it('不传递this,fail',(done)=>{
    const newPromise = new promise((resolve,reject) => {
			reject()     
		}) 
    newPromise.then(null,function(){
      'use strict'
      assert(this===undefined)
      done()
    })
  })
	it('2.2.6 then可以在同一个promise里被多次调用',(done)=>{
		const newPromise = new promise((resolve) => {
			resolve()     
		})
		const callbacks=[sinon.fake(),sinon.fake(),sinon.fake()]
		newPromise.then(callbacks[0])
		newPromise.then(callbacks[1])
		newPromise.then(callbacks[2])
		setTimeout(()=>{
			assert(callbacks[0].called)
			assert(callbacks[1].called)
			assert(callbacks[2].called)
			assert(callbacks[1].calledAfter(callbacks[0]))
			assert(callbacks[2].calledAfter(callbacks[1]))
			done()
		})
	


	})
})
