const express = require("express")
const app = express()
const todoDB = require("./connection/todoDB")
const PORT = process.env.PORT || 3000

todoDB()

app.use(express.json({ extended: false }))

const todoRoute = require("./routes/todo")

app.use('/todo', todoRoute)

app.listen(PORT, () => {
    console.log(`sever is listening on port ${PORT}`)
})

module.exports = {
    app
}