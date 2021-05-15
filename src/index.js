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

const checkBalance = (statement) => {
  const balance = statement.reduce((acc, obj) => {
    if (obj.type === "credit") {
      return acc + obj.qtd
    } else {
      return acc - obj.qtd
    }
  }, 0)
  return balance
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
    statement: []
  }

  users.push(user)
  return res.status(201).json(user)
})

app.get("/statement", accountAlreadyExists, (req, res) => {
  const { user } = req
  return res.json(user.statement)
})

app.get("/statement/date", accountAlreadyExists, (req, res) => {
  const { user } = req
  const { date } = req.query

  const formatDate = new Date(`${date} 00:00`).toDateString()
  const result = user.statement.filter(statement => statement.createdAt.toDateString() === formatDate)
  return res.json(result)
})

app.get("/account", accountAlreadyExists, (req, res) => {
  const { user } = req
  return res.json(user)
})

app.get("/allAccounts", (req, res) => {
  return res.json(users)
})

app.post("/deposit", accountAlreadyExists, (req, res) => {
  const { user } = req
  const { qtd, description } = req.body;

  const operation = {
    description,
    type: "credit",
    qtd,
    createdAt: new Date()
  }

  user.statement.push(operation)
  return res.status(201).json(operation)
})

app.post("/withdraw", accountAlreadyExists, (req, res) => {
  const { user } = req
  const { qtd } = req.body;

  const balance = checkBalance(user.statement)
  if (balance < qtd) {
    return res.status(400).json({ message: "Saldo insuficiente" })
  }

  const operation = {
    type: "debit",
    qtd,
    createdAt: new Date()
  }
  user.statement.push(operation)
  return res.status(201).json(operation)
})

app.put("/account", accountAlreadyExists, (req, res) => {
  const { user } = req
  const { name } = req.body

  user.name = name

  return res.status(201).send()
})

app.delete("/account", accountAlreadyExists, (req, res) => {
  const { user } = req
  users.splice(user, 1)
  return res.status(200).json(users)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})