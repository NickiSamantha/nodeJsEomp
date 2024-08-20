import express from 'express'
import {fetchUsers,fetchUser,insertUser,deleteUser,updateUser} from '../controller/usersController.js'

const router = express.Router()

router.get('/', fetchUsers)

router.get('/:id', fetchUser)

router.post('/register', insertUser)

router.patch('/update/:id', updateUser)

router.delete('/delete/:id', deleteUser)

export default router