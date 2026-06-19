import 'dotenv/config'
import mysql from 'mysql'

export const nomeBanco = process.env.DB_NAME || 'sistema_ecommerce'

export const configBanco = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
}

const conexao = mysql.createConnection(configBanco)

function nomeBancoSeguro() {
    if (!/^[a-zA-Z0-9_]+$/.test(nomeBanco)) {
        throw new Error('Nome do banco invalido. Use apenas letras, numeros e underline.')
    }

    return `\`${nomeBanco}\``
}

function executar(sql) {
    return new Promise((resolve, reject) => {
        conexao.query(sql, (error, resultado) => {
            if (error) {
                reject(error)
                return
            }

            resolve(resultado)
        })
    })
}

export function formatarErroBanco(error) {
    const detalhes = [
        error?.code,
        error?.errno ? `errno ${error.errno}` : '',
        error?.sqlState ? `sqlState ${error.sqlState}` : '',
        error?.sqlMessage,
        error?.message,
    ].filter(Boolean).join(' | ')

    if (error?.code === 'ECONNREFUSED') {
        return `Nao foi possivel conectar no MySQL em ${configBanco.host}:${configBanco.port}. Verifique se o MySQL esta ligado. ${detalhes}`
    }

    if (error?.code === 'ER_ACCESS_DENIED_ERROR') {
        return `Usuario ou senha do MySQL invalidos para o usuario "${configBanco.user}". ${detalhes}`
    }

    return detalhes || 'Erro desconhecido no banco de dados'
}

export async function inicializarConexao() {
    await new Promise((resolve, reject) => {
        conexao.connect((error) => {
            if (error) {
                reject(error)
                return
            }

            resolve()
        })
    })

    await executar(`
        CREATE DATABASE IF NOT EXISTS ${nomeBancoSeguro()}
        CHARACTER SET utf8mb4
        COLLATE utf8mb4_unicode_ci
    `)

    await new Promise((resolve, reject) => {
        conexao.changeUser({ database: nomeBanco }, (error) => {
            if (error) {
                reject(error)
                return
            }

            resolve()
        })
    })
}

export default conexao
