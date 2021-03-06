var pg = require('pg');
var URI = `postgres://hgupiezguzpovh:fd330a613a424f531d6dd0cdd08083649029724e28406d906b9f05f0f904ebe9@ec2-54-163-234-4.compute-1.amazonaws.com:5432/d4e7j43jj6v6se`

function query(sql, cb){
  pg.connect(URI, (err, client, done) => {
    if(err) return cb(err);
    done();
    client.query(sql, (err, result) => {
      if(err) return cb(err);
      return cb(err, result);
    });
  });
}

//insert
//select
//update
//delete

function insertNote(sub, note, cb){
  var sql = `INSERT INTO "Notes"(subject, content) VALUES ('${sub}', '${note}') RETURNING *`;
  query(sql, cb);
}

function selectNote(cb){
  query('SELECT * FROM "Notes"', cb);
}

function removeNote(id, cb){
  var sql = `DELETE FROM "Notes" WHERE id=${id}`;
  query(sql, cb);
}

function updateNote(subject, content, id, cb){
  var sql = `UPDATE "Notes" SET subject='${subject}', content='${content}' WHERE id = ${id} RETURNING *`;
  query(sql, cb);
}

module.exports = {insertNote, selectNote, removeNote, updateNote};
