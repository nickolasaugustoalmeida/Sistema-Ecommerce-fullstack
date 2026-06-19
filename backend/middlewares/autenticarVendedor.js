import crypto from 'node:crypto'
import vendedorModel from '../models/vendedorModel.js'

function tokenHash(token) {
    return crypto.createHash('sha256').update(token).digest('hex')
}

function extrairToken(req) {
    const authorization = req.headers.authorization || ''
    const [tipo, token] = authorization.split(' ')

    if (tipo !== 'Bearer' || !token) {
        return null
    }

    return token
}

export default async function autenticarVendedor(req, res, next) {
    const token = extrairToken(req)

    if (!token) {
        res.status(401).json({ erro: 'Login de vendedor obrigatorio' })
        return
    }

    try {
        const vendedor = await vendedorModel.buscarPorTokenHash(tokenHash(token))

        if (!vendedor) {
            res.status(401).json({ erro: 'Sessao de vendedor invalida ou expirada' })
            return
        }

        req.vendedor = vendedor
        next()
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ erro: 'Erro ao validar vendedor' })
    }
}
