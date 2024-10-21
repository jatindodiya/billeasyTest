const express = require("express");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const db = require("../config/db"); 
const router = express.Router();
router.get("/getData", async (req, res) => {
  const { customer_id, start_date, end_date, location } = req.query;

  // base query
  let sql = "SELECT * FROM customers WHERE 1=1"; 
  const params = [];

  // myfilters
  if (customer_id) {
    sql += " AND customer_id = ?";
    params.push(customer_id);
  }

  if (start_date && end_date) {
    sql += " AND created_at BETWEEN ? AND ?";
    params.push(start_date, end_date);
  }

  if (location) {
    sql += " AND location = ?";
    params.push(location);
  }

  try {
    const [customers] = await db.query(sql, params);

    if (customers.length === 0) {
      return res.status(404).json({ message: "No customers found with the given criteria." });
    }

    res.status(200).json({ data: customers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error: Database connection" });
  }
});


router.post('/addCustomer', async (req, res)=> {

  console.log(req.body)
  const {name, mobile, email, location} = req.body;
  if( !(name?.trim() && mobile?.trim() && email?.trim() && location?.trim()) ) return res.status(400).json({ message: "Error: Bad Request" })

    try{

      const [existingCustomer] = await db.query("SELECT * FROM customers WHERE email = ? OR mobile = ?", [email, mobile]);
      console.log(existingCustomer)
      if(existingCustomer.length > 0){
        return  res.status(400).json({message: "error: Customer already exists"})
      }

      const newCustomer = {
        id: uuidv4(),
        name,
        mobile,
        email,
        location
      };

      await db.query("INSERT INTO customers(customer_id, name, mobile, email, location) VALUES (?, ?, ?, ?, ?)", [newCustomer.id, newCustomer.name, newCustomer.mobile, newCustomer.email, newCustomer.location])
      res.status(201).json({ message: "Customer added successfully", userId: newCustomer.id });

    }
    catch (err){
      console.error(err);
      res.status(500).json({ message: "error: Database connection" });
    }
})


module.exports = router;