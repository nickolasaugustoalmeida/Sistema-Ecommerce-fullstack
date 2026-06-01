import conexao from "../Infraestrutura/conexao.js"

/*
  Model e a camada que conversa com o banco.

  Aqui fica o SQL.
  A rota chama o controller.
  O controller chama o model.
  O model chama o MySQL.
*/
class DatabaseModel {
    listar() {
        const sql = 'SELECT * FROM clientes'

        /*
          conexao.query usa callback.
          Para usar await no controller, transformamos isso em Promise.
        */
        return new Promise((resolve, reject) => {
            conexao.query(sql, (error, resultados) => {
                if (error) {
                    console.log('Erro no SELECT')
                    reject(error)
                    return
                }

                resolve(resultados)
            })
        })
    }
}

export default new DatabaseModel()
