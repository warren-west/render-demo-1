require('dotenv').config()
const express = require('express')
const { stat } = require('fs')
const app = express()

// middleware
app.use(express.json())

// get a default endpoint
app.get('/', (req, res) => {
    return res.status(200).json({ message: "You've hit the GET / endpoint!" })
})

// get list of users
app.get('/users', (req, res) => {
    return res.status(200).json([{ id: 1, name: "Warren" }, { id: 2, name: "Nicholas" }, { id: 3, name: "Dean" }])
})

// add a user
app.post('/users', (req, res) => {
    const { name } = req.body

    if (!name) {
        return res.status(400).json({ message: "Error! Name must not be empty." })
    }

    return res.status(201).json({ message: "New user created!", data: { id: 4, name } })
})

// get a user by id
app.get('/users/:id', (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ message: "Error! A valid user ID needs to nbe present." })
    }

    return res.status(200).json({ id: req.params.id, name: "Warren" })
})

app.get('/cars', (req, res) => {
    res.status(200).json([{ id: 1, color: 'blue'}, { id: 2, color: 'red'}, { id: 3, color: 'yellow'}])
})

const port = process.env.APP_PORT || 3000

app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`)
})