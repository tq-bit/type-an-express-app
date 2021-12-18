const HOST: string = '0.0.0.0';
const PORT: Number = 3000;

import express from 'express';
import { engine } from 'express-handlebars';
import viewRouter from './routes/view.router';
import logger from './util/logger.util';
import accessLogger from './middleware/accesslog.middleware';
const app: express.Application = express();

app.use(accessLogger);
app.use(express.static('public'));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use('/', viewRouter);

app.listen(PORT, () => {
  logger.verbose(`Server listening on http://${HOST}:${PORT}`);
});
