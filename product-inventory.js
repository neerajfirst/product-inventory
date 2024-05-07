// product-catalog-service.js

const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());
// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'dpirds.clmcwsesapgy.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'scalable123',
  database: 'DPIDB'
});

// Connect to MySQL
connection.connect();


app.get('/api/get/products', (req, res) => {
  // Fetch products from database
  connection.query('SELECT * FROM product', (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post('/api/create/products', (req, res) => {
    // Create a new product
    console.log(req.body)
    const { name, desc, price,qty_avl } = req.body;
    const product = { name, desc, price, qty_avl };
    console.log(product);
    connection.query('INSERT INTO product SET ?', product, (error, results, fields) => {
      if (error) throw error;
      res.json({ message: 'Product inventory created successfully', productId: results.insertId });
    });
  });

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Product catalog service running on port ${PORT}`);
});
