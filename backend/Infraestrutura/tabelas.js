class Tabelas {
    init(conexao) {
        this.conexao = conexao
        this.criarTabelaClientes()
        this.criarTabelaProdutos()
        this.ajustarTabelaProdutos()
    }

    criarTabelaClientes() {
        const sql = `
            CREATE TABLE IF NOT EXISTS clientes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(120) NOT NULL,
                email VARCHAR(160) NOT NULL UNIQUE,
                senha_hash VARCHAR(255) NOT NULL,
                criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `

        this.conexao.query(sql, (error) => {
            if (error) {
                console.log('Deu erro na hora de criar a tabela')
                console.log(error.message)
                return
            }

            console.log('criou as tabelas com sucesso')
        })
    }

    criarTabelaProdutos() {
        const sql = `
            CREATE TABLE IF NOT EXISTS produtos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(120) NOT NULL,
                descricao TEXT,
                preco DECIMAL(10, 2) NOT NULL,
                estoque INT NOT NULL DEFAULT 0,
                categoria VARCHAR(80),
                imagem_url VARCHAR(255),
                criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `

        this.conexao.query(sql, (error) => {
            if (error) {
                console.log('Deu erro na hora de criar a tabela produtos')
                console.log(error.message)
                return
            }

            console.log('criou a tabela produtos com sucesso')
        })
    }

    ajustarTabelaProdutos() {
        /*
          Seu banco ja tinha uma tabela produtos de outro teste.
          Ela tinha vendedor_id obrigatorio.

          Para este CRUD simples funcionar sem login de vendedor ainda,
          deixamos vendedor_id aceitar NULL e adicionamos categoria textual.
        */
        const ajustes = [
            'ALTER TABLE produtos MODIFY vendedor_id INT NULL',
            'ALTER TABLE produtos ADD COLUMN categoria VARCHAR(80)',
        ]

        ajustes.forEach((sql) => {
            this.conexao.query(sql, (error) => {
                if (error) {
                    return
                }
            })
        })
    }
}

export default new Tabelas()
