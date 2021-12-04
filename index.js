const HOST = '0.0.0.0'
const PORT = 3000

const express = require('express');
const { engine } = require('express-handlebars');
const viewRouter = require("./routes/view.router")
const logger = require("./util/logger.util");
const accessLogger = require("./middleware/accesslog.middleware")
const app = express();

app.use(accessLogger)
app.use(express.static('public'))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use('/', viewRouter)

app.listen(PORT, () => {
  logger.verbose(`Server listening on http://${HOST}:${PORT}`)
});