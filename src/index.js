const express = require('express')
const app = express()
const port = 3333

app.use(express.json())

app.get('/courses', (req, res) => {
  res.json(["Curso 1", "Curso 2", "Curso 3"])
})

app.post('/courses', (req, res) => {
  res.json(["Curso 1", "Curso 2", "Curso 3", "Curso 4"])
})

app.put('/courses/:id', (req, res) => {
  res.json(["Curso 5", "Curso 2", "Curso 3", "Curso 4"])
})

app.patch('/courses/:id', (req, res) => {
  res.json(["Curso 5", "Curso 6", "Curso 3", "Curso 4"])
})

app.delete('/courses/:id', (req, res) => {
  res.json(["Curso 5", "Curso 6", "Curso 3"])
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})