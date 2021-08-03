class promise {
	// succeed=null
	// fail=null
	callbacks = []
	state = 'pending'
	// 这是因为立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。
	resolve(result) {
		setTimeout(() => {
			if (this.state !== 'pending') return
			this.state = 'fulfilled'
			this.callbacks.forEach((handle) => {
				if (typeof handle[0] === 'function') {
					handle[0].call(undefined, result)
				}
			})
		}, 0)
	}
	reject(reason) {
			setTimeout(() => {
				if (this.state !== 'pending') return
				this.state = 'rejected'
        this.callbacks.forEach((handle) => {
				if (typeof handle[1] === 'function') {
					handle[1].call(undefined, reason)
				}
      })
			}, 0)

	}
	constructor(fn) {
		if (typeof fn !== 'function') {
			throw new Error('必须是函数')
		}
		fn(this.resolve.bind(this), this.reject.bind(this))
	}
	then(succeed?, fail?) {
		const handle = []
		if (typeof succeed === 'function') {
			handle[0] = succeed
		}
		if (typeof fail === 'function') {
			handle[1] = fail
		}
		this.callbacks.push(handle)
	}
}
export default promise
