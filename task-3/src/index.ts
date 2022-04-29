import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import { prepopulate } from './prepopulate';
import apiRoutes from './routes/api.routes'

const PORT = process.env.PORT ?? '3000';
const app = express();

app.use(express.json());

app.use('/api', apiRoutes);

app.use(errorMiddleware);

prepopulate()

app.listen(PORT, () => {
  console.log(`Server has been started on port: ${PORT}`)
})
