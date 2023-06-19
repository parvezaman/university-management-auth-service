import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
import httpStatus from 'http-status';

const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
// app.use('/api/v1/users', UserRoutes);
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);

// Optimizing the imports
app.use('/api/v1/', router);

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

// handle not found error
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found',
      },
    ],
  });

  next();
});
export default app;
