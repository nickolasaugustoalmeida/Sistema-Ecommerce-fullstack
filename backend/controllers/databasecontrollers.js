import databaseModel from "../models/databaseModel.js"

/*
  Controller recebe a chamada da rota e decide o que fazer.

  Neste caso, ele chama o model.
  A rota nao precisa saber SQL.
  O controller nao precisa saber detalhes da conexao.
*/
class DatabaseControllers {
    async buscar() {
        return await databaseModel.listar()
    }

    criar() {
        return 'criando dados'
    }

    atualizar(id) {
        return 'alterando dados ' + id
    }

    deletar(id) {
        return 'deletando dados ' + id
    }
}

export default new DatabaseControllers()
