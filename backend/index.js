import express from 'express'
import cors from 'cors'
import router from './Routers/clienteRoute.js'
import produtoRouter from './Routers/produtoRoute.js'
import authRouter from './Routers/authRoute.js'
import conexao, { formatarErroBanco, inicializarConexao, nomeBanco } from './Infraestrutura/conexao.js'
import tabelas from './Infraestrutura/tabelas.js'

const app = express()
const port = 3001

app.use(express.json())
app.use(cors())

app.use(router)
app.use(produtoRouter)
app.use(authRouter)

async function iniciarServidor() {
    try {
        await inicializarConexao()
        console.log(`Banco ${nomeBanco} pronto`)

        await tabelas.init(conexao)

        app.listen(port, () => {
            console.log(`Esta rodando na porta ${port}`)
        })
    } catch (error) {
        console.error('Erro ao iniciar o banco de dados')
        console.error(formatarErroBanco(error))
        process.exit(1)
    }
}

iniciarServidor()
