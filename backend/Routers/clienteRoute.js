import express from 'express'
import databasecontrollers from '../controllers/databasecontrollers.js'

/*
  Router cria um "mini app" de rotas.

  O express() cria o servidor principal.
  O express.Router() cria um conjunto de rotas separado.
*/
const router = express.Router()

router.get('/cliente', async (req, res) => {
    try {
        const resposta = await databasecontrollers.buscar()
        res.json(resposta)
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar clientes' })
    }
})

router.post('/cliente', (req, res) => {
    const resposta = databasecontrollers.criar()
    res.send(resposta)
})

router.get('/cliente/:id', (req, res) => {
    const { id } = req.params
    const resposta = databasecontrollers.atualizar(id)
    res.send(resposta)
})

router.delete('/cliente/:id', (req, res) => {
    const { id } = req.params
    const resposta = databasecontrollers.deletar(id)
    res.send(resposta)
})

export default router
