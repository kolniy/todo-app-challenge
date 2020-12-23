const request = require("supertest")
const  app = require("../todo")
const Todo = require("../models/Todo")

// used to insert test data into the database
const {
    todoOneId,
    todoOne,
    todoTwoId,
    todoTwo,
    setupTestDatabase
} = require("./fixtures/db")

beforeEach(setupTestDatabase)

test("should create todo with valid details", async () => {
    const response = await request(app)
        .post("/todo/create")
        .send({
            name: "basic to test"
        })
        .expect(200)

     const todo = await Todo.findById(response.body._id)   
     expect(todo).not.toBeNull()
})

test("should not create todo with invalid data", async () => {
    const response = await request(app)
        .post("/todo/create")
        .send({})
        .expect(400)
})

test("should retun all todos", async () => {
    const response = await request(app)
        .get("/todo/todos/all")
        .send()
        .expect(200)

        const todos = response.body
        expect(todos.length).not.toEqual(0)
})

test("should retieve a todo by ID", async () => {
    const response = await request(app)
        .get(`/todo/${todoOneId}`)
        .send()
        .expect(200)

       const todo = response.body
       expect(todo).not.toBeNull()
})

test("should delete todo by ID", async () => {
        await request(app)
        .delete(`/todo/${todoTwoId}`)
        .send()
        .expect(200)

        const deletedTodo = await Todo.findById(todoTwoId)
        expect(deletedTodo).toBeNull()
})


test("should update a todo", async () => {
        await request(app)
        .put(`/todo/${todoTwoId}`)
        .send({
            status: true,
            priority: "medium"
        })
        .expect(200)

        const todo = await Todo.findById(todoTwoId)
        expect(todo.status).toBe(true)
        expect(todo.priority).toEqual("medium")
})

test("should search for todo by priority", async () => {
    const response = await request(app)
    .get("/todo/todos/search?priority=medium")
    .send()
    .expect(200)

    const tasks = response.body
    expect(tasks).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                priority:"medium"
            })
        ])
    )
})

test("should search for todo by name", async () => {
    const response = await request(app)
    .get("/todo/todos/search?name=second task for today")
    .send()
    .expect(200)

    const tasks = response.body
    expect(tasks).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                name: "second task for today"
            })
        ])
    )
})





