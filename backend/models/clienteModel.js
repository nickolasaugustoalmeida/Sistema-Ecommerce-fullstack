import conexao from "../Infraestrutura/conexao.js"

class ClienteModel {
    listar() {
        const sql = 'SELECT id, nome, email, criado_em FROM clientes ORDER BY id DESC'

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

    buscarPorEmail(email) {
        const sql = 'SELECT id, nome, email, senha_hash, criado_em FROM clientes WHERE email = ? LIMIT 1'

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
        const sql = 'SELECT id, nome, email, criado_em FROM clientes WHERE id = ? LIMIT 1'

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

    criar(cliente) {
        const sql = 'INSERT INTO clientes (nome, email, senha_hash) VALUES (?, ?, ?)'
        const valores = [cliente.nome, cliente.email, cliente.senha_hash]

        return new Promise((resolve, reject) => {
            conexao.query(sql, valores, async (error, resultado) => {
                if (error) {
                    reject(error)
                    return
                }

                try {
                    const clienteCriado = await this.buscarPorId(resultado.insertId)
                    resolve(clienteCriado)
                } catch (erroBusca) {
                    reject(erroBusca)
                }
            })
        })
    }

    criarSessao(clienteId, tokenHash, expiraEm) {
        const sql = `
            INSERT INTO cliente_sessoes (cliente_id, token_hash, expira_em)
            VALUES (?, ?, ?)
        `

        return new Promise((resolve, reject) => {
            conexao.query(sql, [clienteId, tokenHash, expiraEm], (error, resultado) => {
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
            SELECT clientes.id, clientes.nome, clientes.email, clientes.criado_em
            FROM cliente_sessoes
            INNER JOIN clientes ON clientes.id = cliente_sessoes.cliente_id
            WHERE cliente_sessoes.token_hash = ?
              AND cliente_sessoes.expira_em > NOW()
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
        const sql = 'DELETE FROM cliente_sessoes WHERE token_hash = ?'

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

export default new ClienteModel()
