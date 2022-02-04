require('dotenv').config();
const express = require('express');
const userRouter = require('./app/routes/user.routes');
const componentesRouter = require('./app/routes/componentes.routes');
const seguimentoRouter = require('./app/routes/seguimento.routes');
const grupoRouter = require('./app/routes/grupo.routes');
const cubagemRouter = require('./app/routes/cubagem.routes');
const synchronizationDb = require('./database/synchronization');
const apiVersion = 1;

const app = express();
synchronizationDb();
app.use(express.json());
app.use(userRouter);

app.use(`/api/v${apiVersion}/user`, userRouter);
app.use(`/api/v${apiVersion}/componente`, componentesRouter);
app.use(`/api/v${apiVersion}/seguimento`, seguimentoRouter);
app.use(`/api/v${apiVersion}/grupo`, grupoRouter);
app.use(`/api/v${apiVersion}/projetos`, cubagemRouter);

app.listen(Number(process.env.PORT), () =>
	console.log(`Server up and running at port ${process.env.PORT}`));