export let config: any

if (process.env['NODE_ENV'] === 'production') {
  config = require('./prod')
} else {
  config = require('./dev')
}
const port = process.env['PORT'] || 3030;