import express from 'express'
import produtoController from '../controllers/produtoController.js'

/*
  Rotas de produtos.

  GET /produtos
    Lista os produtos do banco.

  POST /produtos
    Cria um produto novo.

  DELETE /produtos/:id
    Remove um produto pelo id.
*/
const router = express.Router()

router.get('/produtos', produtoController.listar)
router.post('/produtos', produtoController.criar)
router.delete('/produtos/:id', produtoController.remover)

export default router
