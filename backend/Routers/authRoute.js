import express from 'express'
import authController from '../controllers/authController.js'
import vendedorAuthController from '../controllers/vendedorAuthController.js'

const router = express.Router()

router.post('/auth/cadastro', authController.cadastro)
router.post('/auth/login', authController.login)
router.get('/auth/me', authController.usuarioLogado)
router.post('/auth/logout', authController.logout)
router.post('/auth/vendedor/cadastro', vendedorAuthController.cadastro)
router.post('/auth/vendedor/login', vendedorAuthController.login)
router.get('/auth/vendedor/me', vendedorAuthController.vendedorLogado)
router.post('/auth/vendedor/logout', vendedorAuthController.logout)

export default router
