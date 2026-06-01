import produtoModel from "../models/produtoModel.js"

/*
  Controller de produtos.

  A rota chama o controller.
  O controller valida o que veio da tela.
  Depois ele chama o model para falar com o banco.
*/
class ProdutoController {
    async listar(req, res) {
        try {
            const produtos = await produtoModel.listar()
            res.json(produtos)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ erro: 'Erro ao listar produtos' })
        }
    }

    async criar(req, res) {
        const produto = {
            nome: req.body.nome,
            descricao: req.body.descricao || '',
            preco: Number(req.body.preco),
            estoque: Number(req.body.estoque),
            categoria: req.body.categoria || '',
            imagem_url: req.body.imagem_url || '',
        }

        if (!produto.nome || Number.isNaN(produto.preco)) {
            res.status(400).json({ erro: 'Nome e preco sao obrigatorios' })
            return
        }

        try {
            const produtoCriado = await produtoModel.criar(produto)
            res.status(201).json(produtoCriado)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ erro: 'Erro ao criar produto' })
        }
    }

    async remover(req, res) {
        const { id } = req.params

        try {
            await produtoModel.remover(id)
            res.json({ mensagem: 'Produto removido com sucesso' })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ erro: 'Erro ao remover produto' })
        }
    }
}

export default new ProdutoController()
