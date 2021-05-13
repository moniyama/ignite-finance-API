const express = require('express')
const app = express()
const port = 3333
const { v4: uuid } = require('uuid');

app.use(express.json())

const users = []

app.post("/account", (req, res) => {
  const { name, cpf } = req.body;

  const cpfAlreadyExists = users.some(user => user.cpf === cpf)

  if (cpfAlreadyExists) {
    return res.status(400).json({ message: "CPF já cadastrado" })
  }

  const user = {
    id: uuid(),
    cpf,
    name,
    statement: []
  }

  users.push(user)
  return res.status(201).json(user)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})