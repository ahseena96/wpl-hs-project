const express = require("express");
const app = express();
var path = require('path');

const pool = require("./db");

app.use(express.json());  // req.body object

app.use(express.static(path.join(__dirname, 'public')));

// Routes

// get all products from product table
app.get("/products", async (req, res) => {
    const allproducts = await pool.query("select product_name, category_name from products natural join pcategory");
    res.json(allproducts.rows);
    // console.log(req.body);
});

// get a table (select from table?)

// insert into table ! (not create)
// this will correspond to a login form
app.post("/", async (req, res) => {
    console.log("Hey, I'm here!");
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

// delete a table (delete record or delete table itself?)


app.listen(5000, () => {
    console.log("server is listening on port 5000");
});
