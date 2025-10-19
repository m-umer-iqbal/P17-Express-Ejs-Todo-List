const express = require('express')
const bodyParser = require('body-parser')
const date = require(__dirname + "/date.js")
const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

const items = [];
const works = [];

app.get('/', (req, res) => {

    let day = date.getDate();

    res.render('index', { listTitle: day, newListItems: items });
})

app.get('/work', (req, res) => {
    res.render('index', { listTitle: "Work List", newListItems: works });
})

app.post("/", (req, res) => {
    let item = req.body.newItem;

    if (req.body.list === "Work") {
        works.push(item)
        res.redirect("/work")
    } else {
        items.push(item)
        res.redirect("/")
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
