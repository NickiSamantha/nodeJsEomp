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
    let [[data]] = await pool.query('SELECT * FROM products WHERE id = ?', [id])
    return data;
}

const insertProduct = async(name, quantity, amount, category, image) =>{
    let [data] = await pool.query(`
        INSERT INTO products (prodName, quantity, amount, category, prodUrl)
        VALUES (?, ?, ?, ?, ?)
        `, [name, quantity, amount, category, image])
}

const deleteProduct = async(id) =>{
    await pool.query(
        `DELETE FROM products WHERE id = ?`, [id]
    )
}

const updateProductDb = async(id) =>{
    let [data] = await pool.query(`
        UPDATE products
        SET prodName = ? quantity = ? amount = ? category = ? prodUrl = ?
        WHERE prodID = ?`, [name, quantity, amount, category, image, id])

}

console.log(await getProductsDb());

export {getProductsDb, getProductDb, insertProduct, deleteProduct, updateProductDb}

