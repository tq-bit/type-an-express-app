const express = require('express');
const { engine } = require('express-handlebars');
const viewRouter = require("./routes/view.router")

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use('/', viewRouter)

app.listen(3000, () => console.log('Listening ...'));