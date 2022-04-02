const User = require('../models/usuario');
var mysql = require('mysql');



var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test_dev",
  password: "sua senha"
  
});

// Mostra todos os usuarios, sem filtro nem ordenação.

// exports.getAllUser = async (req, res, next) => {
//   try {
//     const [allUser] = await User.fetchAll();
//     res.status(200).json(allUser);
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// };

exports.listarUsers = async (req, res) => {
  const user = 'SELECT * FROM usuario';
  let usersList = [];
  con.query(user, function(err, result){
    if(err) throw err;
    dataJson = JSON.parse(JSON.stringify(result))
    usersList = dataJson;
    const pagina = req.query['pag'] || 1;
    var ordem = req.query['ordem']; // ASC, DESC
    var ordemData = req.query['ordemData']; // ASC, DESC
    const filtroUser = req.query['filtro-usuario'];
    const ordemUserOrData = req.query['ordemUserOrData'];
    const itensPorPagina = req.query['itens-por-pagina'] || 3;
    let userRetornar = usersList;
    // filtrar
    if (filtroUser) {
      userRetornar = userRetornar.filter(
        t => t.nome.toLowerCase().indexOf(filtroUser.toLowerCase()) === 0);
    }
      //ordenar
    if(ordemUserOrData == 1){
        if (ordem === 'ASC') {
          userRetornar.sort((t1, t2) => (t1.nome.toLowerCase() > t2.nome.toLowerCase()) ? 1 : -1);
        } else if (ordem === 'DESC') {
          userRetornar.sort((t1, t2) => (t1.nome.toLowerCase() < t2.nome.toLowerCase()) ? 1 : -1);
        }
    }else{
      if (ordemData === 'ASC') {
        userRetornar.sort((t1, t2) => (t1.data_criacao > t2.data_criacao ? 1 : -1));
      } else if (ordemData === 'DESC') {
        userRetornar.sort((t1, t2) => (t1.data_criacao < t2.data_criacao ? 1 : -1));
      }
    }
    // retornar
    res.json({
      totalItens: userRetornar.length,
      users: userRetornar.slice(0).splice((pagina - 1) * itensPorPagina, itensPorPagina),
      pagina: pagina
    });
  });
}


exports.listId = async (req, res) => {
  const id = req.params.id;
  const user = 'SELECT * FROM usuario WHERE id = ?';
  con.query(user, [id], function(err, result){
    if(err) throw err;
    res.json(result);
  });
}

exports.UserEdit = async (req, res) => {
  if (!req.body['nome']){
    res.status(400).json({ erro: 'Requisição inválida.' });
  }
  const id = req.params.id;
  let usuarioAtualizada = false;
  usuario = usuario.map(usuario => {
    if (usuario.id === id) {
      usuario.nome = req.body['nome'];
      usuario.concluido = req.body['concluido'];
      usuarioAtualizada = true;
    }
    return usuario;
  });
  if (!usuarioAtualizada) {
    res.status(404).json({ erro: 'Usuario não encontrado.' });
  }
  
  const waitTill = new Date(new Date().getTime() + 2 * 1000);
  while(waitTill > new Date()){};
  res.json({
    id: id,
    nome: req.body['nome'],
    concluido: req.body['concluido']
  });
}

exports.postUser = async (req, res, next) => {
  try {
    const postResponse = await User.post(req.body.nome, req.body.email, req.body.telefone, req.body.senha);
    res.status(201).json(postResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.putUser = async (req, res, next) => {
  try {
    const putResponse = await User.update(req.body.id, req.body.nome, req.body.email, req.body.telefone);
    res.status(200).json(putResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const deleteResponse = await User.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
function test(users, result) {
  users.push(result);
}

