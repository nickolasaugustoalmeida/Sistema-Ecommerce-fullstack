import express from 'express'
import cors from 'cors'
import router from './Routers/clienteRoute.js'
import produtoRouter from './Routers/produtoRoute.js'
import conexao from './Infraestrutura/conexao.js'
import tabelas from './Infraestrutura/tabelas.js'

const app = express()
const port = 3001

/*
  express.json permite receber JSON no req.body.
  Ainda nao e essencial para o GET /cliente, mas sera importante no POST.
*/
app.use(express.json())
app.use(cors())

/*
  Cria a tabela clientes quando o backend inicia.
*/
tabelas.init(conexao)

/*
  Conecta as rotas do arquivo clienteRoute.js ao app principal.
*/
app.use(router)
app.use(produtoRouter)

app.listen(port, () => {
    console.log(`Está rodando na porta ${port}`)
})
