const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: Boolean
    },
    priority: {
        type: String,
        enum:['high','low','medium']
    },
    start_time: {
        type: String
    },
    end_time: {
        type: String
    }
})

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo
