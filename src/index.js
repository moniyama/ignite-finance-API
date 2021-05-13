const express = require('express')
const app = express()
const port = 3333
const { v4: uuid } = require('uuid');

app.use(express.json())

const users = []

const accountAlreadyExists = (req, res, next) => {
  const { cpf } = req.headers
  const user = users.find(user => user.cpf === cpf)

  if (!user) {
    return res.status(400).json({ message: "Conta inexistente" })
  }
  req.user = user;
  return next()
}

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
    statement: [{ teste: "oi" }]
  }

  users.push(user)
  return res.status(201).json(user)
})

app.get("/statement", accountAlreadyExists, (req, res) => {
  const { user } = req
  return res.json(user.statement)
})

app.get("/account", (req, res) => {
  return res.json(users)
})

app.post("/deposit", accountAlreadyExists, (req, res) => {
  const { user } = req
  const { qtd, description } = req.body;

  const operation = {
    description,
    type: "deposit",
    qtd,
    createdAt: new Date()
  }

  user.statement.push(operation)
  return res.status(201).json(operation)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})