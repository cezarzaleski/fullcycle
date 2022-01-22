const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

app.get('/', (req, res) => {
    const sql = `INSERT INTO people (name)
                 VALUES ('Cezar Zaleski')`
    connection.query(sql)
    connection.query(`SELECT name
                      FROM people`, (error, results, fields) => {
        res.send(`
            <h1>Full Cycle Rocks!</h1>
            <h3>Lista de nomes cadastrada no banco de dados.</h3>
            <ol>
        ${!!results.length ? results.map(el => `<li>${el.name}</li>`).join('') : ''}
      </ol>
        `)
    })

})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})