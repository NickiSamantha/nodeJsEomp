import {createPool} from 'mysql2/promise'
import {config} from 'dotenv'

config()

const pool =createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
})

const getProductsDb = async()=>{
    let [data] = await pool.query('SELECT * FROM products')
    return data;
}



const getProductDb = async (id) =>{
    let [[data]] = await pool.query('SELECT * FROM products WHERE prodID = ?', [id])
    return data;
}


const insertProductDb = async(prodName, quantity, amount, category, prodUrl) =>{
    await pool.query(`
        INSERT INTO products (prodName, quantity, amount, category, prodUrl)
        VALUES (?, ?, ?, ?, ?)
        `, [prodName, quantity, amount, category, prodUrl])
}


const deleteProductDb = async(id) =>{
    await pool.query(
        `DELETE FROM products WHERE prodID = ?`, [id]
    )
}

const updateProductDb = async(prodName, quantity, amount, category, prodUrl,id) =>{
    await pool.query(`
        UPDATE products
        SET prodName = ?,
        quantity = ? ,
        amount = ? ,
        category = ? ,
        prodUrl = ?
        WHERE prodID = ?`, [prodName, quantity, amount, category, prodUrl, id])

}

// console.log(await getProductsDb());

export {getProductsDb, getProductDb, insertProductDb, deleteProductDb, updateProductDb}

