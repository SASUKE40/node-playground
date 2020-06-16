class MyPromise {
  #resolveCallbacks = [];
  #rejectCallbacks = [];
  #state = State.PENDING;
  #value = null;
  constructor(fn) {
    try {
      fn(this.#resolve, this.#reject);
    } catch (error) {
      this.#reject(error);
    }
  }
  #resolve = (value) => {
    setTimeout(() => {
      if (this.#state === State.PENDING) {
        this.#state = State.RESOLVE;
        this.#value = value;
        while (this.#resolveCallbacks.length > 0) {
          let cb = this.#resolveCallbacks.shift();
          cb(this.#value);
        }
      }
    }, 0);
  };
  #reject = (error) => {
    setTimeout(() => {
      if (this.#state === State.PENDING) {
        this.#state = State.REJECT;
        this.#value = error;
        while (this.#rejectCallbacks.length > 0) {
          let cb = this.#rejectCallbacks.shift();
          cb(this.#value);
        }
      }
    }, 0);
  };
  then = (resolve, reject) => {
    typeof resolve !== 'function' ? (resolve = (v) => v) : null;
    typeof reject !== 'function' ? (reject = (e) => e) : null;
    return new MyPromise((res, rej) => {
      const resFn = (value) => {
        try {
          let x = resolve(value);
          x instanceof MyPromise ? x.then(res, rej) : res(x);
        } catch (e) {
          res(e);
        }
      };
      const rejFn = (error) => {
        try {
          let x = reject(error);
          x instanceof MyPromise ? x.then(res, rej) : rej(error);
        } catch (e) {
          rej(e);
        }
      };
      if (this.#state === State.PENDING) {
        this.#resolveCallbacks.push(resFn);
        this.#rejectCallbacks.push(rejFn);
      }
      if (this.#state === State.RESOLVE) {
        resFn(this.#value);
      }
      if (this.#state === State.REJECT) {
        rejFn(this.#value);
      }
    });
  };
  catch = (reject) => {
    return this.then(null, reject);
  };
}

const State = {
  PENDING: 'pending',
  RESOLVE: 'resolve',
  REJECT: 'reject',
};

let p = new MyPromise((resolve, reject) => {
  console.log('start');
  setTimeout(() => {
    resolve('test data');
  }, 1000);
  setTimeout(() => {
    reject('test err');
  }, 2000);
  console.log('end');
})
  .then(
    (data) => {
      console.log('then data', data);
      return 'new data';
    },
    (err) => {
      console.log('then err', err);
    }
  )
  .then((data) => {
    console.log('then2 data', data);
  })
  .catch((err) => {
    console.log('catch', err);
  });
