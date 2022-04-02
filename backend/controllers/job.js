const Job = require('../models/job');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test_dev",
  password: "sua senha"
  
});

// Mostra todos os Jobs sem filtro nem ordenação

// exports.getAllJob = async (req, res, next) => {
//   try {
//     const [allUser] = await Job.fetchAll();
//     res.status(200).json(allUser);
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// };

exports.listarJobs = async (req, res) => {
  const user = 'SELECT * FROM jobs';
  let jobList = [];
  con.query(user, function(err, result){
    if(err) throw err;
    dataJson = JSON.parse(JSON.stringify(result))
    jobList = dataJson;
    const pagina = req.query['pag'] || 1;
    const ordem = req.query['ordem']; // ASC, DESC
    const filtroJob = req.query['filtro-job'];
    const itensPorPagina = req.query['itens-por-pagina'] || 3;
    let jobRetornar = jobList;
    
    // filtrar
    if (filtroJob) {
      jobRetornar = jobRetornar.filter(
        t => t.nome.toLowerCase().indexOf(filtroJob.toLowerCase()) === 0);
    }

    //ordenar
    if (ordem === 'ASC') {
      jobRetornar.sort((t1, t2) => (t1.nome.toLowerCase() > t2.nome.toLowerCase()) ? 1 : -1);
    } else if (ordem === 'DESC') {
      jobRetornar.sort((t1, t2) => (t1.nome.toLowerCase() < t2.nome.toLowerCase()) ? 1 : -1);
    }
    
    // retornar
    res.json({
      totalItens: jobRetornar.length,
      jobs: jobRetornar.slice(0).splice((pagina - 1) * itensPorPagina, itensPorPagina),
      pagina: pagina
    });
  });
}


//Listar por ID, para edição
exports.listId = async (req, res) => {
  const id = req.params.id;
  const job = 'SELECT * FROM jobs WHERE id = ?';
  con.query(job, [id], function(err, result){
    if(err) throw err;
    res.json(result);
  });
}

//Realiza a introdução de um novo job
exports.postJob = async (req, res, next) => {
  try {
    const postResponse = await Job.post(req.body.nome, req.body.idUsuario, req.body.statusJob, req.body.tipoRecorrencia, req.body.valorRecorrencia);
    res.status(201).json(postResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


//Edição
exports.putJob = async (req, res, next) => {
  try {
    const putResponse = await Job.update(req.body.id, req.body.nome, req.body.statusJob, req.body.tipoRecorrencia);
    res.status(200).json(putResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

