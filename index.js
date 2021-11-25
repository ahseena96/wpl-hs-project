const express = require("express");
const app = express();
var path = require('path');

const pool = require("./db");
// ajax calls are in ./public/main.js

app.use(express.json());  // req.body object

app.use(express.static(path.join(__dirname, 'public')));

// Routes

// get all products from product table
app.get("/products", async (req, res) => {
    const allproducts = await pool.query("select product_name, category_name, price, description, image_name from products natural join pcategory");
    res.json(allproducts.rows);
    // console.log(req.body);
});

// get a table (select from table?)

// insert into table ! (not create)
// this will correspond to a login form
app.post("/", async (req, res) => {

    console.log(req.body);
    const {username} = req.body.uname;
    const {password} = req.body.pwd;
    const {email} = req.body.email;
    const {fname} = req.body.fname;
    const {lname} = req.body.lname;
    const {address} = req.body.address;
    const {phone} = req.body.phone;

    const loginUser= await pool.query("insert into users (username, email, password, first_name, last_name, address, phone) values ($1, $2, $3, $4, $5, %6, $7) returning *", [username, password, email, fname, lname, address, phone]);
    res.json(loginUser.rows);
    // console.log(req.body);
});


// update a table (update a record in a table?)
// id is product id
app.put("/:id", async (req, res) => {
    console.log(req.body);
    const {prodname} = req.body.prod_name;
    const {description} = req.body.description;
    const {image_name} = req.body.image_name;
    const {price} = req.body.price;

    const prodUpdate = await pool.query("update product set product_name = $1, description = $2, image_name = $3, price = $4 where [pid = $5];", [prodname, description, image_name, price, req.params.id]);
    res.json(prodUpdate.rows);
});


// delete a product
app.delete("/deletep/:id", async (req, res) => {
    const prodDelete = await pool.query("delete from product  where pid = $1;", [req.params.id]);
    res.json(prodDelete.rows);
    // console.log(req.body);
});

// delete a user
// here id is the username
app.delete("/deleteu/:id", async (req, res) => {
    const userDelete = await pool.query("delete from user  where username = $1;", [req.params.id]);
    res.json(userDelete.rows);
    // console.log(req.body);
});

//  ********** CART RELATED **********
// show cart
app.get("/cart/:id", async (req, res) => {
    const allcartproducts = await pool.query("select p.product_name, p.price, p.image_name, c.quantity from cart as c inner join products as p on c.product_id=p.pid where p.user_id = $1", [req.params.id]);
    res.json(allcartproducts.rows);
    // console.log(req.body);
});

// update quantity in cart
app.put("/cart/:id", async (req, res) => {
    const {quant} = req.body.quantity;
    const cartUpdate = await pool.query("update cart_items set quantity = $1 where [user_id = $2];", [quant, req.params.id]);
    res.json(cartUpdate.rows);
    // console.log(req.body);
});


// delete cart item (delete record or delete table itself?)
app.delete("/cart/:id", async (req, res) => {
    const cartDelete = await pool.query("delete from cart_items  where user_id = $1;", [req.params.id]);
    res.json(cartDelete.rows);
    // console.log(req.body);
});

//  ********************

app.listen(5000, () => {
    console.log("server is listening on port 5000");
});
