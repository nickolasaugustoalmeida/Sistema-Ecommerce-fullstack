class Tabelas {
    async init(conexao) {
        this.conexao = conexao

        await this.criarTabelaClientes()
        await this.criarTabelaVendedores()
        await this.criarTabelaProdutos()
        await this.criarTabelaSessoesClientes()
        await this.criarTabelaSessoesVendedores()
        await this.ajustarTabelaProdutos()
    }

    executar(sql) {
        return new Promise((resolve, reject) => {
            this.conexao.query(sql, (error, resultado) => {
                if (error) {
                    reject(error)
                    return
                }

                resolve(resultado)
            })
        })
    }

    async criarTabelaClientes() {
        const sql = `
            CREATE TABLE IF NOT EXISTS clientes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(120) NOT NULL,
                email VARCHAR(160) NOT NULL UNIQUE,
                senha_hash VARCHAR(255) NOT NULL,
                criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `

        await this.executar(sql)
        console.log('Tabela clientes pronta')
    }

    async criarTabelaVendedores() {
        const sql = `
            CREATE TABLE IF NOT EXISTS vendedores (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome_loja VARCHAR(120) NOT NULL,
                nome_responsavel VARCHAR(120) NOT NULL,
                email VARCHAR(160) NOT NULL UNIQUE,
                telefone VARCHAR(30),
                senha_hash VARCHAR(255) NOT NULL,
                criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `

        await this.executar(sql)
        console.log('Tabela vendedores pronta')
    }

    async criarTabelaSessoesClientes() {
        const sql = `
            CREATE TABLE IF NOT EXISTS cliente_sessoes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                cliente_id INT NOT NULL,
                token_hash CHAR(64) NOT NULL UNIQUE,
                criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                expira_em DATETIME NOT NULL,
                FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
                INDEX idx_cliente_sessoes_token_hash (token_hash),
                INDEX idx_cliente_sessoes_cliente_id (cliente_id)
            );
        `

        await this.executar(sql)
        console.log('Tabela de sessoes pronta')
    }

    async criarTabelaSessoesVendedores() {
        const sql = `
            CREATE TABLE IF NOT EXISTS vendedor_sessoes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                vendedor_id INT NOT NULL,
                token_hash CHAR(64) NOT NULL UNIQUE,
                criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                expira_em DATETIME NOT NULL,
                FOREIGN KEY (vendedor_id) REFERENCES vendedores(id) ON DELETE CASCADE,
                INDEX idx_vendedor_sessoes_token_hash (token_hash),
                INDEX idx_vendedor_sessoes_vendedor_id (vendedor_id)
            );
        `

        await this.executar(sql)
        console.log('Tabela de sessoes de vendedores pronta')
    }

    async criarTabelaProdutos() {
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

        await this.executar(sql)
        console.log('Tabela produtos pronta')
    }

    async ajustarTabelaProdutos() {
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

        for (const sql of ajustes) {
            try {
                await this.executar(sql)
            } catch (error) {
                const erroEsperado = ['ER_BAD_FIELD_ERROR', 'ER_DUP_FIELDNAME'].includes(error.code)

                if (!erroEsperado) {
                    throw error
                }
            }
        }
    }
}

export default new Tabelas()
