require('dotenv').config()

const express = require('express')
const server = require('./src/server')

const app = express()
const options = {
  port: process.env.PORT || 8080
}

server(app, options)
