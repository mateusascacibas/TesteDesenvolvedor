const db = require('../util/database');

module.exports = class User {
  constructor(id, nome, email, telefone, senha) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.senha = senha;
  }

  static fetchAll() {
    return db.execute('SELECT * FROM usuario');
  }

  static fetchById(id) {
    return db.execute('SELECT * FROM usuario WHERE id = ?', [id]);
  }

  static post(nome,email,telefone,senha) {
    return db.execute('INSERT INTO usuario (nome,email,telefone,senha) VALUES (?,?,?,?)', [nome,email,telefone,senha]);
  }

  static update(id, nome, email, telefone) {
    return db.execute('UPDATE usuario SET nome = ?, email = ?, telefone = ? WHERE id = ?', [nome, email, telefone, id]);
  }

  static delete(id) {
    return db.execute('DELETE FROM usuario WHERE id = ?', [id]);
  }
};
