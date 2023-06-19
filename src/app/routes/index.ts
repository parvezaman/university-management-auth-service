import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';

const router = Router();

// router.use('/users', UserRoutes);
// router.use('/academic-semesters', AcademicSemesterRoutes);

// to avoid writting the routes multiple times, we can run a map/forEach loop
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
