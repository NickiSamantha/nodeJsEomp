import {getProductsDb, getProductDb, insertProductDb, deleteProductDb, updateProductDb} from '../model/productsDB.js'

const fetchProducts = async(req,res) =>{
    res.json(await getProductsDb())
}


const fetchProduct = async(req,res)=>{
    res.json(await getProductDb(req.params.id))
}

const insertProduct = async (req, res) => {
    try {
        let { prodName, quantity, amount, category, prodUrl, prodDescription } = req.body;
        await insertProductDb(prodName, quantity, amount, category, prodUrl, prodDescription);

        res.status(200).send('Product was added successfully');
    } catch (error) {
        res.status(404).send('An error occurred while adding the product');
    }
};

const deleteProduct = async (req, res) => {
    try {
        await deleteProductDb(req.params.id);
        res.status(200).send('Product was deleted successfully');
    } catch (error) {
        res.status(404).send('An error occurred while trying to delete a product');
    }
};


const updateProduct = async (req, res) => {
    try {
        let { prodName, quantity, amount, category, prodUrl, prodDescription } = req.body;
        let product = await getProductDb(req.params.id);
        prodName?prodName=prodName:prodName = product.prodName
        quantity?quantity=quantity:quantity = product.quantity
        amount?amount=amount:amount = product.amount
        category?category=category:category = product.category
        prodUrl?prodUrl=prodUrl:prodUrl = product.prodUrl
        prodDescription?prodDescription=prodDescription:prodDescription + product.prodDescription
        await updateProductDb(prodName, quantity, amount, category, prodUrl, prodDescription, req.params.id);
        res.status(200).send('Product was updated successfully');

    } catch (error) {
        res.status(404).send('An error occurred while updating the product');
    }
};

export{fetchProducts,fetchProduct,insertProduct,deleteProduct,updateProduct}

