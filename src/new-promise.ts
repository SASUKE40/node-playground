enum State {
  PENDING,
  RESOLVED,
  REJECTED,
}
class NewPromise<T> {
  constructor(fn) {
    try {
      fn(this.resolve, this.reject)
    } catch (err) {
      this.reject(err)
    }
  }
  #state: State = State.PENDING
  #value: T
  #resolvedCallbacks: Function[] = []
  #rejectedCallbacks: Function[] = []
  resolve(value: T) {
    if (this.#state === State.PENDING) {
      this.#state = State.RESOLVED
      this.#value = value
      this.#resolvedCallbacks.map((cb) => cb(this.#value))
    }
  }
  reject(value: T) {
    if (this.#state === State.PENDING) {
      this.#state = State.REJECTED
      this.#value = value
      this.#rejectedCallbacks.map((cb) => cb(this.#value))
    }
  }
  then(onFulfilled?: Function, onRejected?: Function) {
    onFulfilled = onFulfilled ? onFulfilled : (v) => v
    onRejected = onRejected
      ? onRejected
      : (e) => {
          throw e
        }
    if (this.#state === State.PENDING) {
      this.#resolvedCallbacks.push(onFulfilled)
      this.#resolvedCallbacks.push(onRejected)
    }
    if (this.#state === State.RESOLVED) {
      onFulfilled(this.#value)
    }
    if (this.#state === State.REJECTED) {
      onRejected(this.#value)
    }
  }
}
