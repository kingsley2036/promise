import * as chai from 'chai'
import * as sinon from 'sinon'
import * as  sinonChai from 'sinon-chai'
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
		let fn=sinon.fake()
		const newPromise = new promise(fn)
		// @ts-ignore
		assert(fn.called)
	})
  it('new promise(fn)中的fn接受resolve和reject两个函数', () => {
		const newPromise = new promise((resolve,reject) => {
      assert.isFunction(resolve)
      assert.isFunction(reject)
		})

	})
  it('new promise(fn).then(success)中的success会在resolve被调用的时候执行', () => {
    let success=sinon.fake()
		const newPromise = new promise((resolve) => {
          assert.isFalse(success.called)
          resolve()
          setTimeout(()=>{
            assert(success.called)
          })
		})
    // @ts-ignore
    newPromise.then(success)
	})
})
