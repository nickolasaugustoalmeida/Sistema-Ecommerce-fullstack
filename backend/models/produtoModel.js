import conexao from "../Infraestrutura/conexao.js"

/*
  Model de produtos.

  Esta camada conversa diretamente com o MySQL.
  Aqui ficam os comandos SQL do CRUD:
  - listar
  - criar
  - remover
*/
class ProdutoModel {
    listar() {
        const sql = 'SELECT * FROM produtos ORDER BY id DESC'

        return new Promise((resolve, reject) => {
            conexao.query(sql, (error, resultados) => {
                if (error) {
                    reject(error)
                    return
                }

                resolve(resultados)
            })
        })
    }

    criar(produto) {
        const sql = `
            INSERT INTO produtos (nome, descricao, preco, estoque, categoria, imagem_url)
            VALUES (?, ?, ?, ?, ?, ?)
        `

        const valores = [
            produto.nome,
            produto.descricao,
            produto.preco,
            produto.estoque,
            produto.categoria,
            produto.imagem_url,
        ]

        return new Promise((resolve, reject) => {
            conexao.query(sql, valores, (error, resultado) => {
                if (error) {
                    reject(error)
                    return
                }

                resolve({
                    id: resultado.insertId,
                    ...produto,
                })
            })
        })
    }

    remover(id) {
        const sql = 'DELETE FROM produtos WHERE id = ?'

        return new Promise((resolve, reject) => {
            conexao.query(sql, [id], (error, resultado) => {
                if (error) {
                    reject(error)
                    return
                }

                resolve(resultado)
            })
        })
    }
}

export default new ProdutoModel()
