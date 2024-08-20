import express from 'express'
import {fetchProducts,fetchProduct,insertProduct,deleteProduct,updateProduct} from '../controller/productsController.js'

const router = express.Router()

router.get('/', fetchProducts)

router.get('/:id', fetchProduct)

router.post('/addProduct', insertProduct)

router.post('/update/:id', updateProduct)

router.delete('/delete/:id', deleteProduct)

export default router