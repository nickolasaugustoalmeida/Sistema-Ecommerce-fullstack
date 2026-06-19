import bcrypt from 'bcryptjs'
import crypto from 'node:crypto'
import clienteModel from '../models/clienteModel.js'

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

async function criarRespostaAutenticada(cliente) {
    const token = gerarToken()
    await clienteModel.criarSessao(cliente.id, tokenHash(token), dataExpiracaoSessao())

    return {
        token,
        usuario: cliente,
    }
}

class AuthController {
    async cadastro(req, res) {
        const nome = String(req.body.nome || '').trim()
        const email = normalizarEmail(req.body.email)
        const senha = String(req.body.senha || '')

        if (!nome || !email || !senha) {
            res.status(400).json({ erro: 'Nome, email e senha sao obrigatorios' })
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
            const clienteExistente = await clienteModel.buscarPorEmail(email)

            if (clienteExistente) {
                res.status(409).json({ erro: 'Este email ja esta cadastrado' })
                return
            }

            const senha_hash = await bcrypt.hash(senha, 10)
            const cliente = await clienteModel.criar({ nome, email, senha_hash })
            const resposta = await criarRespostaAutenticada(cliente)

            res.status(201).json({
                mensagem: 'Cadastro realizado com sucesso',
                ...resposta,
            })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ erro: 'Erro ao cadastrar usuario' })
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
            const cliente = await clienteModel.buscarPorEmail(email)

            if (!cliente) {
                res.status(401).json({ erro: 'Email ou senha invalidos' })
                return
            }

            const senhaCorreta = await bcrypt.compare(senha, cliente.senha_hash)

            if (!senhaCorreta) {
                res.status(401).json({ erro: 'Email ou senha invalidos' })
                return
            }

            const { senha_hash, ...usuario } = cliente
            const resposta = await criarRespostaAutenticada(usuario)

            res.json({
                mensagem: 'Login realizado com sucesso',
                ...resposta,
            })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ erro: 'Erro ao fazer login' })
        }
    }

    async usuarioLogado(req, res) {
        const token = extrairToken(req)

        if (!token) {
            res.status(401).json({ logado: false, erro: 'Token nao informado' })
            return
        }

        try {
            const usuario = await clienteModel.buscarPorTokenHash(tokenHash(token))

            if (!usuario) {
                res.status(401).json({ logado: false, erro: 'Sessao invalida ou expirada' })
                return
            }

            res.json({ logado: true, usuario })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ erro: 'Erro ao verificar sessao' })
        }
    }

    async logout(req, res) {
        const token = extrairToken(req)

        if (!token) {
            res.json({ mensagem: 'Logout realizado com sucesso' })
            return
        }

        try {
            await clienteModel.removerSessao(tokenHash(token))
            res.json({ mensagem: 'Logout realizado com sucesso' })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ erro: 'Erro ao sair da conta' })
        }
    }
}

export default new AuthController()
