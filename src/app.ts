import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/user/user.routes';

const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1/users', UserRoutes);

// custom error class

// app.get('/', (req: Request, res: Response) => {
// res.send('Hello World! I have started the server')
//   try {
// errorLogger.error(throw new ApiError(400, 'ore baba sarche amake! Error!!!')
//   } catch (error) {
// errorLogger.error(error)
//   }
// })

// handling unhandled promise rejection
// app.get('/', async (req: Request, res: Response) => {
//   Promise.reject(new Error('This is a testing unhandled promise rejection'))
// })

// handling unchaught error
// app.get('/', async (req: Request, res: Response) => {
//   throw new Error('testing error logger')
// })

// global error handler
app.use(globalErrorHandler);
export default app;
