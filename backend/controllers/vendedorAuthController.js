import bcrypt from 'bcryptjs'
import crypto from 'node:crypto'
import vendedorModel from '../models/vendedorModel.js'

const TEMPO_SESSAO_EM_DIAS = 7

function normalizarEmail(email) {
    return String(email || '').trim().toLowerCase()
}

function tokenHash(token) {
    return crypto.createHash('sha256').update(token).digest('hex')
}

function gerarToken() {
    return crypto.randomBytes(32).toString('hex')
}

function extrairToken(req) {
    const authorization = req.headers.authorization || ''
    const [tipo, token] = authorization.split(' ')

    if (tipo !== 'Bearer' || !token) {
        return null
    }

    return token
}

function dataExpiracaoSessao() {
    const expiraEm = new Date()
    expiraEm.setDate(expiraEm.getDate() + TEMPO_SESSAO_EM_DIAS)
    return expiraEm
}

async function criarRespostaAutenticada(vendedor) {
    const token = gerarToken()
    await vendedorModel.criarSessao(vendedor.id, tokenHash(token), dataExpiracaoSessao())

    return {
        token,
        vendedor,
    }
}

class VendedorAuthController {
    async cadastro(req, res) {
        const nome_loja = String(req.body.nome_loja || '').trim()
        const nome_responsavel = String(req.body.nome_responsavel || '').trim()
        const email = normalizarEmail(req.body.email)
        const telefone = String(req.body.telefone || '').trim()
        const senha = String(req.body.senha || '')

        if (!nome_loja || !nome_responsavel || !email || !senha) {
            res.status(400).json({ erro: 'Loja, responsavel, email e senha sao obrigatorios' })
            return
        }

        if (!email.includes('@')) {
            res.status(400).json({ erro: 'Email invalido' })
            return
        }

        if (senha.length < 6) {
            res.status(400).json({ erro: 'A senha precisa ter pelo menos 6 caracteres' })
            return
        }

        try {
            const vendedorExistente = await vendedorModel.buscarPorEmail(email)

            if (vendedorExistente) {
                res.status(409).json({ erro: 'Este email ja esta cadastrado para vendedor' })
                return
            }

            const senha_hash = await bcrypt.hash(senha, 10)
            const vendedor = await vendedorModel.criar({
                nome_loja,
                nome_responsavel,
                email,
                telefone,
                senha_hash,
            })
            const resposta = await criarRespostaAutenticada(vendedor)

            res.status(201).json({
                mensagem: 'Cadastro de vendedor realizado com sucesso',
                ...resposta,
            })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ erro: 'Erro ao cadastrar vendedor' })
        }
    }

    async login(req, res) {
        const email = normalizarEmail(req.body.email)
        const senha = String(req.body.senha || '')

        if (!email || !senha) {
            res.status(400).json({ erro: 'Email e senha sao obrigatorios' })
            return
        }

        try {
            const vendedor = await vendedorModel.buscarPorEmail(email)

            if (!vendedor) {
                res.status(401).json({ erro: 'Email ou senha invalidos' })
                return
            }

            const senhaCorreta = await bcrypt.compare(senha, vendedor.senha_hash)

            if (!senhaCorreta) {
                res.status(401).json({ erro: 'Email ou senha invalidos' })
                return
            }

            const { senha_hash, ...vendedorSemSenha } = vendedor
            const resposta = await criarRespostaAutenticada(vendedorSemSenha)

            res.json({
                mensagem: 'Login de vendedor realizado com sucesso',
                ...resposta,
            })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ erro: 'Erro ao fazer login de vendedor' })
        }
    }

    async vendedorLogado(req, res) {
        const token = extrairToken(req)

        if (!token) {
            res.status(401).json({ logado: false, erro: 'Token nao informado' })
            return
        }

        try {
            const vendedor = await vendedorModel.buscarPorTokenHash(tokenHash(token))

            if (!vendedor) {
                res.status(401).json({ logado: false, erro: 'Sessao invalida ou expirada' })
                return
            }

            res.json({ logado: true, vendedor })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ erro: 'Erro ao verificar sessao de vendedor' })
        }
    }

    async logout(req, res) {
        const token = extrairToken(req)

        if (!token) {
            res.json({ mensagem: 'Logout de vendedor realizado com sucesso' })
            return
        }

        try {
            await vendedorModel.removerSessao(tokenHash(token))
            res.json({ mensagem: 'Logout de vendedor realizado com sucesso' })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ erro: 'Erro ao sair da conta de vendedor' })
        }
    }
}

export default new VendedorAuthController()
