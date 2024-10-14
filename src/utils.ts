// 消除async await 异步的传染性
function getUser () {
  console.log(1)
  return fetch('https://my-json-server.typicode.com/typicode/demo/profile')
}
function m1 () {
  // other works
  return getUser()
}
function m2 () {
  // other works
  return m1()
}

function m3 () {
  // other works
  return m2()
}

function main () {
  const user = m3()
  console.log('user', user)
}

function run (func: (...args: any) => void) {
  let cache: any = []
  let i = 0
  const _originalFetch = window.fetch
  window.fetch = (...args) => {
    if (cache[i]) {
      if (cache[i].status === 'fulfilled') {
        return cache[i].data
      } else if (cache[i].status === 'rejected') {
        throw cache[i].data
      }
    }
    const result = {
      status: 'pending',
      data: null,
    }
    cache[i++] = result
    const prom = _originalFetch(...args)
      .then(resp => resp.json())
      .then(resp => {
        result.status = 'fulfilled'
        result.data = resp
      }, err => {
        result.status = 'rejected'
        result.data = err
      })
    throw prom
  }
  try {
    func()
  } catch (err) {
    if (err instanceof Promise) {
      const reRun = () => {
        i = 0
        func()
      }
      err.then(reRun, reRun).finally(() => {
        window.fetch = _originalFetch
      })
    }
  }
}

run(main)
