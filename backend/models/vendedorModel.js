import conexao from "../Infraestrutura/conexao.js"

class VendedorModel {
    buscarPorEmail(email) {
        const sql = `
            SELECT id, nome_loja, nome_responsavel, email, telefone, senha_hash, criado_em
            FROM vendedores
            WHERE email = ?
            LIMIT 1
        `

        return new Promise((resolve, reject) => {
            conexao.query(sql, [email], (error, resultados) => {
                if (error) {
                    reject(error)
                    return
                }

                resolve(resultados[0] || null)
            })
        })
    }

    buscarPorId(id) {
        const sql = `
            SELECT id, nome_loja, nome_responsavel, email, telefone, criado_em
            FROM vendedores
            WHERE id = ?
            LIMIT 1
        `

        return new Promise((resolve, reject) => {
            conexao.query(sql, [id], (error, resultados) => {
                if (error) {
                    reject(error)
                    return
                }

                resolve(resultados[0] || null)
            })
        })
    }

    criar(vendedor) {
        const sql = `
            INSERT INTO vendedores (nome_loja, nome_responsavel, email, telefone, senha_hash)
            VALUES (?, ?, ?, ?, ?)
        `
        const valores = [
            vendedor.nome_loja,
            vendedor.nome_responsavel,
            vendedor.email,
            vendedor.telefone,
            vendedor.senha_hash,
        ]

        return new Promise((resolve, reject) => {
            conexao.query(sql, valores, async (error, resultado) => {
                if (error) {
                    reject(error)
                    return
                }

                try {
                    const vendedorCriado = await this.buscarPorId(resultado.insertId)
                    resolve(vendedorCriado)
                } catch (erroBusca) {
                    reject(erroBusca)
                }
            })
        })
    }

    criarSessao(vendedorId, tokenHash, expiraEm) {
        const sql = `
            INSERT INTO vendedor_sessoes (vendedor_id, token_hash, expira_em)
            VALUES (?, ?, ?)
        `

        return new Promise((resolve, reject) => {
            conexao.query(sql, [vendedorId, tokenHash, expiraEm], (error, resultado) => {
                if (error) {
                    reject(error)
                    return
                }

                resolve(resultado)
            })
        })
    }

    buscarPorTokenHash(tokenHash) {
        const sql = `
            SELECT vendedores.id, vendedores.nome_loja, vendedores.nome_responsavel,
                   vendedores.email, vendedores.telefone, vendedores.criado_em
            FROM vendedor_sessoes
            INNER JOIN vendedores ON vendedores.id = vendedor_sessoes.vendedor_id
            WHERE vendedor_sessoes.token_hash = ?
              AND vendedor_sessoes.expira_em > NOW()
            LIMIT 1
        `

        return new Promise((resolve, reject) => {
            conexao.query(sql, [tokenHash], (error, resultados) => {
                if (error) {
                    reject(error)
                    return
                }

                resolve(resultados[0] || null)
            })
        })
    }

    removerSessao(tokenHash) {
        const sql = 'DELETE FROM vendedor_sessoes WHERE token_hash = ?'

        return new Promise((resolve, reject) => {
            conexao.query(sql, [tokenHash], (error, resultado) => {
                if (error) {
                    reject(error)
                    return
                }

                resolve(resultado)
            })
        })
    }
}

export default new VendedorModel()
