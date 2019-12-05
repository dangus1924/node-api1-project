const express = require('express')
let db = require('./data/db')

// this is done to create an instance of our express app
const app = express()
//this is one case of middleware "use" 
app.use(express.json())

//defining route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to our API!"})
})

app.get('/users', (req, res) => {
    // this is calling the db we imported to display all users
    res.json(db) 
})

app.get('/users/:id', (req, res) => {
    const user = db.find(row => row.id === req.params.id)
    if (user) {
        res.json(user)
    } else {
        res.status(404).json({error: "No User Found"})
    }
})

app.delete('/users/:id', (req, res) => {
    const user = db.find(row => row.id === req.params.id)

    if (user) {
        db = db.filter(row => row.id !== req.params.id)
        res.json(user)
    } else {
        res.status(404).json({ error: "User not found"})
    }
})

app.post('/users', (req, res) => {
    const user = req.body
    if (!req.body.name,) {
            return res.status(400).json({ error: "Need requied field"})
        }

    const newUser = {
        id: String(db.length + 1),
        name: req.body.name,
        bio: req.body.bio,
    }
    db.push(newUser)
    res.status(201).json(newUser)
})

app.put('/users/:id', (req, res) => {
    const user = db.find(row => row.id === req.params.id)
    if (!req.body.name,
        !req.body.bio,
        ) {
            return res.status(400).json({ error: "Please fill in the updated info"})
        }
    const editUser = {
        name: req.body.name,
        bio: req.body.bio

    }
})

const port = 8080
const host = '127.0.0.1'
app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
})