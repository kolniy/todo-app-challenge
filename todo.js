const express = require("express")
const app = express()
const todoDB = require("./connection/todoDB")

todoDB()

app.use(express.json({ extended: false }))

const todoRoute = require("./routes/todo")

app.use('/todo', todoRoute)

module.exports = app