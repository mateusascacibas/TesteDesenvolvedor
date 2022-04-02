const db = require('../util/database');

module.exports = class Job {
  constructor(id, nome, idUsuario, statusJob, tipoRecorrencia, valorRecorrencia) {
    this.id = id;
    this.nome = nome;
    this.idUsuario = idUsuario;
    this.status = statusJob;
    this.tipo = tipoRecorrencia;
    this.valor = valorRecorrencia;
  }

  static fetchAll() {
    return db.execute('SELECT * FROM jobs');
  }

  static post(nome, idUsuario, status, tipo, valor) {
    return db.execute('INSERT INTO jobs (nome, idUsuario, statusJob, tipoRecorrencia, valorRecorrencia) VALUES (?,?,?,?,?)', 
      [nome, idUsuario, status, tipo, valor]);
  }

  static update(id, nome, status, tipo) {
    return db.execute('UPDATE jobs SET nome = ?, statusJob = ?, tipoRecorrencia = ? WHERE id = ?', [nome, status, tipo, id]);
  }
};
