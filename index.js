const express = require("express");
const app = express();
const Todo = require('./models/todo_models.js');
// const Todo = require("./models/todo_models")
// const cors = require('cors')
// mongoose.connect('mongodb://127.0.0.1:27017/todo-crud')
// mongoose.connect('mongodb://mongo:sEuUeLFnrNRZEfjoiRMcIHOIKYgIaQia@mongodb.railway.internal:27017')
// .then(() => { console.log("DB connected") })

app.set('view engine', 'ejs');
Todo.connect().then(()=>console.log("Connected"));
app.use(express.json());
// app.use(cors())
// Todo.query(`CREATE TABLE todofor(task TEXT, dateof TEXT, id TEXT, status TEXT, PRIMARY KEY(task, dateof, id, status))`)

// Todo.query(`INSERT INTO users (email, password) VALUES ('naba@gmail.com', 'gvhvhv')`)

// --------------------------------------------------------------
app.post('/user', async (req, res) => {

    // Todo.query(`INSERT INTO users DEFAULT VALUES`)
    const email = req.body.key1;
    const password = req.body.key2;
    Todo.query(`INSERT INTO users (email, password) VALUES ($1, $2)`,[email, password]);
    var result = await Todo.query(`SELECT * FROM users`);
    // res.redirect(`/${rows}`)
    // res.redirect(`/?q='rows'`)
    // res.send(email);
    // res.send(req.body)
    res.send(req.body);
})
//-------------------------------
app.post('/todoing', async (req, res) => {

    // Todo.query(`INSERT INTO users DEFAULT VALUES`)
    const task = req.body.key1;
    const dateof = req.body.key2;
    const id = req.body.key3;
    const status = req.body.key4;
    await Todo.query(`INSERT INTO todofor (task, dateof, id, status) VALUES ($1, $2, $3, $4)`,[task, dateof, id, status]);
    // var result = await Todo.query(`SELECT * FROM users`);
    // res.redirect(`/${rows}`)
    // res.redirect(`/?q='rows'`)
    // res.send(task);
    res.send(req.body)
    // res.send(userid)
})
app.put('/todone', async (req, res) => {

    // Todo.query(`INSERT INTO users DEFAULT VALUES`)
    const task = req.body.key1;
    const id = req.body.key2;
    await Todo.query(`UPDATE todofor SET status='done' (WHERE task=$1 AND id=$2 AND dateof=$3)`,[task.task, id, task.date]);
    // var result = await Todo.query(`SELECT * FROM users`);
    // res.redirect(`/${rows}`)
    // res.redirect(`/?q='rows'`)
    // res.send(task);
    res.send(req.body)
    // res.send(userid)
})
app.delete('/clean', async (req, res) => {

    // Todo.query(`INSERT INTO users DEFAULT VALUES`)
    const id = req.body.key1;
    const task = req.body.key2;
    await Todo.query(`DELETE FROM todofor WHERE (task=$1 AND id=$2 AND dateof=$3 and status='done')`,[task.task, id, task.date]);
    // var result = await Todo.query(`SELECT * FROM users`);
    // res.redirect(`/${rows}`)
    // res.redirect(`/?q='rows'`)
    // res.send(task);
    res.send(req.body)
    // res.send(userid)
})
//----------------------------------------
// -----------------------------------------------------------------


app.get('/getdata', async (req, res) => {
    const email = req.query.e;
    const todo = (await Todo.query(`select * from users where email=$1`,[email])).rowCount?res.send({"status": "s"}):res.send({"status": "f"});
    // await Todo.query(`DELETE FROM todos`)

})
//------------------------
app.get('/checkdata', async (req, res) => {
    const email = req.query.e;
    const password = req.query.pswd;
    const todo = (await Todo.query(`select * from users where (email=$1 AND password=$2)`,[email, password])).rowCount?(res.send({"status": "s"})):(res.send({"status": "f"}));
    // await Todo.query(`DELETE FROM todos`)

})
app.get('/taketodos', async (req, res) => {
    const id = req.query.e;
    const todo = (await Todo.query(`select task, dateof, status from todofor where id=$1`,[id]));
    // await Todo.query(`DELETE FROM todos`)
    res.json(todo.rows);

})
//------------------------
app.get('/', (req, res) => {
    res.send({"key": "check"})
})
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