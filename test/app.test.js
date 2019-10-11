const { Express } = require('jest-express/lib/express')
const server = require('../src/server')

let app

describe('Server', () => {
  beforeEach(() => {
    app = new Express()
  })

  afterEach(() => {
    app.resetMocked()
  })

  test('should listen to configured port', () => {
    const options = {
      port: 8080
    }

    server(app, options)

    expect(app.listen).toBeCalledWith(options.port, expect.any(Function))
  })
})
