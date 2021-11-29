const express = require("express");
const app = express();
var path = require('path');
// var bodyParser = require('body-parser');

const pool = require("./db");

app.use(express.json());  // req.body object

app.use(express.static(path.join(__dirname, 'public')));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));

// Routes

// get all products from product table
app.get("/products", async (req, res) => {
    const allproducts = await pool.query("select product_name, category_name, price, description, image_name from product natural join pcategory");
    res.json(allproducts.rows);
    // console.log(req.body);
});

// get a table (select from table?)

// insert into table ! (not create)
// this will correspond to a signup form
app.post("/", async (req, res) => {
    // username shouldn't be there
    const loginUser = await pool.query("insert into users (username, password, email, first_name, last_name, address, phone) select '"+ req.body.uname + "', '" + req.body.pwd + "', '" + req.body.email + "', '" + req.body.fname + "', '" + req.body.lname + "', '" + req.body.address + "', " + req.body.phone + " where not exists (select * from users where username='" + req.body.uname + "') returning *");

    if (loginUser.rows.length == 0) {
        res.send("400", {"message": "Username already exists"});
    }
    else {
        res.send("200", {"message": "User successfully registerd"});
    }

    console.log(loginUser.rows.length);
});

// login fetch
app.get("/", async (req, res) => {
    // username shouldn't be there
    const loginUser= await pool.query("select * from users where username='" + req.body.uname + "'"); //, [username, password, email, fname, lname, address, phone]);
    res.json(loginUser.rows);
    console.log(req.body);
});



// inserting products from admin user

// update a table (update a record in a table?)
// id is product id
app.put("/:id", async (req, res) => {
    console.log(req.body);
    const {prodname} = req.body.prod_name;
    const {description} = req.body.description;
    const {image_name} = req.body.image_name;
    const {price} = req.body.price;

    const prodUpdate = await pool.query("update product set product_name = '" + req.body.prod_name + "', description = '" + req.body.description + "', image_name = '" + req.body.image_name + "', price = " + req.body.price + " where pid = " + req.params.id + ";");
    res.json(prodUpdate.rows);
});


// delete a product
app.delete("/deletep/:id", async (req, res) => {
    const prodDelete = await pool.query("delete from product  where pid = " + req.params.id + ";");
    res.json(prodDelete.rows);
    // console.log(req.body);
});

// delete a user
// here id is the username
app.delete("/deleteu/:id", async (req, res) => {
    const userDelete = await pool.query("delete from user  where username = " + req.params.id + ";");
    res.json(userDelete.rows);
    // console.log(req.body);
});

//  ********** CART RELATED **********
// show cart
app.get("/cart/:id", async (req, res) => {
    const allcartproducts = await pool.query("select p.product_name, p.price, p.image_name, c.quantity from cart_items as c inner join products as p on c.product_id=p.pid where p.user_id = " + req.params.id + ";");
    res.json(allcartproducts.rows);
    // console.log(req.body);
});

// update quantity in cart
app.put("/cart/:id", async (req, res) => {
    // const {quant} = req.body.quantity;
    const cartUpdate = await pool.query("update cart_items set quantity = " + req.body.quantity + " where user_id = " + req.params.id + ";");
    res.json(cartUpdate.rows);
    // console.log(req.body);
});


// delete cart item (delete record or delete table itself?)
app.delete("/cart/:id", async (req, res) => {
    const cartDelete = await pool.query("delete from cart_items where user_id = " + req.params.id + ";");
    res.json(cartDelete.rows);
    // console.log(req.body);
});

//  ********************

app.listen(3000, () => {
    console.log("server is listening on port 3000");
});
