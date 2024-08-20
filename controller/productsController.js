import {getProductsDb, getProductDb, insertProductDb, deleteProductDb, updateProductDb} from '../model/productsDB.js'

const fetchProducts = async(req,res) =>{
    res.json(await getProductsDb())
}


const fetchProduct = async(req,res)=>{
    res.json(await getProductDb(req.params.id))
}

const insertProduct = async(req,res)=>{
    let {prodName, quantity, amount, category, prodUrl} = req.body
    await insertProductDb(prodName, quantity, amount, category, prodUrl)
    res.send('Product was inserted successfully')
}

const deleteProduct = async(req,res)=>{
    await deleteProductDb(req.params.id)
    res.send('Product was deleted successfully')
}

const updateProduct = async(req,res) =>{
    let {prodName, quantity, amount, category, prodUrl} = req.body
    let product = await getProductDb(req.params.id)
    prodName?prodName=prodName:prodName = product.prodName
    quantity?quantity=quantity:quantity = product.quantity
    amount?amount=amount:amount = product.amount
    category?category=category:category = product.category
    prodUrl?prodUrl=prodUrl:prodUrl = product.prodUrl
    await updateProductDb(prodName, quantity, amount, category, prodUrl, req.params.id)
    res.send('Product was updated successfully')
}

export{fetchProducts,fetchProduct,insertProduct,deleteProduct,updateProduct}