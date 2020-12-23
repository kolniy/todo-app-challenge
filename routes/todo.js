const express = require("express")
const Todo = require("../models/Todo")
const router = express.Router()

router.get("/:todoId", async (req, res) => {
    const todoId = req.params.todoId
    const todo = await Todo.findOne({
        _id: todoId
    })

    if(!todo){
        return res.status(400).json({
            error: "Todo Not Found"
        })
    }

    res.json(todo)
})

router.get("/todos/all", async (req, res) => {
    const todos = await Todo.find()
    res.json(todos)
})

router.post("/create", async (req, res) => {
    if(!req.body.name){
        return res.status(400).json({
            error: "Todo must have a name"
        })
    }
    const {
        name,
        description,
        priority,
        startTime,
        endTime
    } = req.body

    const newTodo = {
        name,
        description,
        priority,
        status: false,
        start_time: startTime,
        end_time: endTime
    }

    const todo = new Todo(newTodo)
    todo.save()
    res.json(todo)
})

router.put("/:todoId", async (req, res) => {
    let todo = await Todo.findOne({
        _id: req.params.todoId
    })

    if(!todo){
        return res.status(400).json({
            error: "todo not found"
        })
    }

    const {
        name,
        description,
        priority,
        status,
        startDate,
        endDate
    } = req.body 

    if(name){
        todo.name = name
    }

    if(description){
        todo.description = description
    }

    if(priority){
        todo.priority = priority
    }

    if(status){
        todo.status = status
    }

    if(startDate){
        todo.start_date = startDate
    }

    if(endDate){
        todo.end_date = endDate
    }

    todo.save()
    
    res.json(todo)
    
})

router.delete("/:todoId", async (req, res) => {
    const todo = await Todo.findOne({
        _id: req.params.todoId
    })

    if(!todo){
        return res.status(400).json({
            error: "todo not found"
        })
    }

    await todo.remove()
    res.json(todo)
})

router.get("/todos/search", async (req, res) => {
    const searchName = req.query.name
    const searchPriority = req.query.priority

    const todoSearchResult = await Todo.find()
    const filteredTodo = todoSearchResult.filter((todo) => {
        const isNameMatch = todo.name.includes(searchName)
        const isPriorityMatch = todo.priority === searchPriority

        return isNameMatch || isPriorityMatch
        
    })

     res.json(filteredTodo)   
})


module.exports = router