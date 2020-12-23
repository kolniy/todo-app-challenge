const app = require("./todo")
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`sever is listening on port ${PORT}`)
})
