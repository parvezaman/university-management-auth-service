import { Router } from 'express'
import usersController from './users.controller'

const router = Router()

router.post('/create-user', usersController.createUser)

export default router
