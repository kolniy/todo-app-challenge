const mongoose = require("mongoose")
const Todo = require("../../models/Todo")

const todoOneId = new mongoose.Types.ObjectId()
const todoOne = {
    _id: todoOneId,
    name: "my first task for today",
    description: "getting started for today",
    priority: "high"
}

const todoTwoId = new mongoose.Types.ObjectId()
const todoTwo = {
    _id: todoTwoId,
    name: "second task for today",
    description: "getting started for today",
    priority: "medium"
}

const setupTestDatabase = async () => {
    await Todo.deleteMany()
    await new Todo(todoOne).save()
    await new Todo(todoTwo).save()
}

module.exports = {
    todoOneId,
    todoOne,
    todoTwoId,
    todoTwo,
    setupTestDatabase
}