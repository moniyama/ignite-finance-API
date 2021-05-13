# API FINANCEIRA

## Requisitos

- [ ]  Criar uma conta `/account`
- [ ]  Buscar o extrato bancário do cliente `/account/:cpf`
- [ ]  Realizar um depósito `/deposit`
- [ ]  Realizar um saque `/withdraw`
- [ ]  Buscar o extrato bancário do cliente por data `/statement/date`
- [ ]  Atualizar dados da conta do cliente `/account`
- [ ]  Obter dados da conta do cliente `/account`
- [ ]  Deletar uma conta `/account`
- [ ]  Retornar o saldo`/balance`

## Regras de negócio

Não deve ser possível:

- [ ]  Cadastrar uma outra conta com CPF já existente
- [ ]  Fazer depósito, buscar extrato e saldo, realizar saque e excluir em uma conta não existente
- [ ]  Fazer saque se o saldo for insuficiente
