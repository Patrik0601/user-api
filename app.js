import express from "express"
import path from "path"
import __dirname from "./util/rootpath.js"
import * as fileHandler from './util/fileHandler.js'
const app = express()
app.use(express.static(path.join(__dirname, 'public')))
const PORT = 3000

app.use(express.json())

const users = fileHandler.getData()

app.get('/users', (req, res) => {
    const users = fileHandler.getData()
    res.status(200).json(users)
})

app.get('/users/:id', (req, res) => {
    const users = fileHandler.getData()
    const id = req.params.id
    if (id < 0 || id >= users.length){
        return res.status(200).json({})
    }
    res.json(users[id])
})

app.post('/users', (req, res) => {
    const users = fileHandler.getData()
    const {firstName, lastName} = req.body
    if(!firstName || !lastName){
        return res.status(400).json({message: "Missing some data"})
    }
    const newUser = {firstName, lastName}
    users.push(newUser)
    fileHandler.saveData(users)
    res.status(200).json(newUser)
})

app.put('/users/:id', (req, res) => {
    const users = fileHandler.getData()
    const id = req.params.id
    if (id < 0 || id >= users.length){
        return res.status(404).json({message: "User not found"})
    }
    const {firstName, lastName} = req.body
    users[id] = {firstName, lastName}
    fileHandler.saveData(users)
    res.status(200).json(users[id])
})

app.patch('/users/:id', (req, res) => {
    const users = fileHandler.getData()
    users[id] = {
        firstName : firstName || users[id].firstName, 
        lastName: lastName || users[id].lastName
    }
    fileHandler.saveData(users)
    res.status(200).json(users[id])
})

app.delete('/users/:id', (req, res) => {
    const users = fileHandler.getData()
    const id = req.params.id
    if (id < 0 || id >= users.length){
        return res.status(404).json({message: "User not found"})
    }
    users.splice(id, 1)
    fileHandler.saveData(users)
    res.status(200).json({message: "Delete successful"})
})

app.listen(PORT, ()=>{
    const users = fileHandler.getData()
    console.log(`Server runs on port ${PORT}`)
})