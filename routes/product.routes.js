const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const { check, validationResult } = require("express-validator");
const Product = require("../models/Product");
const router = Router();


//"/api/product
//             /add"
router.post(
  "/add",
    [
      check("title").exists(),
      check("password").exists()
    ],
  async (req, res) => {
    try {
      console.log('product.route - 1')
        const errors = validationResult(req);

      if (!errors.isEmpty) {
        return res.status(400).json({
          errors: errors.array(),
          message: "wrong product data",
        });
      }

      const {
        id,
        title,
        imgUrl,
        price,
        company,
        info,
        inCart,
        count,
        total,
      } = req.body;

      const tempProduct = await Product.findOne({ id });

      if (tempProduct) {
        res.status(400).json({ message: "Product exist." });
      }

     
    //   const hashedPassword = await bcrypt.hash(password, 12);
      const product = new Product({
        id,
        title,
        imgUrl,
        price,
        company,
        info,
        inCart,
        count,
        total,
      });

      await product.save().then((result) => {
        console.log("Pproduct was created!");
      });

      res.status(201).json({ message: "Product created!" });
    } catch (e) {
      return res.status(500).json({ message: "Something wrong, try again!" });
    }
  }
);
