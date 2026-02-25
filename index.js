const express = require("express")
const app = express()
const Todo = require('./models/todo_models.js')
// const Todo = require("./models/todo_models")
// const cors = require('cors')
// mongoose.connect('mongodb://127.0.0.1:27017/todo-crud')
// mongoose.connect('mongodb://mongo:sEuUeLFnrNRZEfjoiRMcIHOIKYgIaQia@mongodb.railway.internal:27017')
// .then(() => { console.log("DB connected") })

app.set('view engine', 'ejs')
Todo.connect().then(()=>console.log("Connected"))
app.use(express.json())
// app.use(cors())
// Todo.query(`CREATE TABLE todofor(task TEXT, dateof DATE, id TEXT, status TEXT, PRIMARY KEY(task, dateof, id, status))`)
// const t = 'testing';
// Todo.query(`INSERT INTO users (email, password) VALUES ('naba@gmail.com', 'gvhvhv')`)
// Todo.query(`INSERT INTO todos (task, dateof, id, status) VALUES ($1, '2026-02-02', 'naba', 'not')`,[t]);
// --------------------------------------------------------------
app.post('/user', async (req, res) => {
    
    // Todo.query(`INSERT INTO users DEFAULT VALUES`)
    const email = req.body.key1;
    const password = req.body.key2;
    Todo.query(`INSERT INTO users (email, password) VALUES ($1, $2)`,[email, password]);
    // var result = await Todo.query(`SELECT * FROM users`);
    // res.redirect(`/${rows}`)
    // res.redirect(`/?q='rows'`)
    // res.send(email);
    // res.send(req.body)
    // res.send(userid)
})
//-------------------------------
// app.post('/todo', async (req, res) => {
    
//     // Todo.query(`INSERT INTO users DEFAULT VALUES`)
//     const t = req.body.key1;
//     const d = req.body.key2;
//     const i = req.body.key3;
//     const s = req.body.key4;
//     await Todo.query(`INSERT INTO todos (task, dateof, id, status) VALUES ($1, $2, $3, $4)`,[t, d, i, s]);
//     // var result = await Todo.query(`SELECT * FROM todos`);
//     // res.redirect(`/${rows}`)
//     // res.redirect(`/?q='rows'`)
//     // res.send(task);
//     //  res.json(result.rows)
//     // res.send(userid)
// })
//----------------------------------------
// -----------------------------------------------------------------
app.post('/todo', async (req, res) => {
    
    // Todo.query(`INSERT INTO users DEFAULT VALUES`)
    const t = req.body.key1;
    const d = req.body.key2;
    const i = req.body.key3;
    const s = req.body.key4;
    await Todo.query(`INSERT INTO todofor (task, dateof, id, status) VALUES ($1, $2, $3, $4)`,[t, d, i, s]);
    // var result = await Todo.query(`SELECT * FROM users`);
    // res.redirect(`/${rows}`)
    // res.redirect(`/?q='rows'`)
    // res.send(email);
    // res.send(req.body)
    res.send(d);
})

 app.get('/getdata', async (req, res) => {
    const email = req.query.e;
    const todo = (await Todo.query(`select * from users where email=$1`,[email])).rowCount?res.send({"status": "s"}):res.send({"status": "f"});
    // await Todo.query(`DELETE FROM todos`)

})
//------------------------
app.get('/checkdata', async (req, res) => {
    const email = req.query.e;
    const password = req.query.pswd;
    const todo = (await Todo.query(`select * from users where (email=$1 AND password=$2)`,[email, password])).rowCount?res.send({"status": "s"}):res.send({"status": "f"});
    // await Todo.query(`DELETE FROM todos`)
    
})
app.get('/taketodos', async (req, res) => {
    const id = req.query.e;
    const todo = await Todo.query(`select * from todos where id=$1`,[id]);
    // await Todo.query(`DELETE FROM todos`)
    res.send(todo.rows);
    
})
//------------------------

app.post('/', (req, res) => {
    res.send("<h1>Hello!</h1>")
})
app.put('/', (req, res) => {
    res.send("<h1>Hello!</h1>")
})
app.delete('/', (req, res) => {
    res.send("<h1>Hello!</h1>")
})
app.listen(3000, "0.0.0.0", () => {
    console.log("Successfully Connected")
})