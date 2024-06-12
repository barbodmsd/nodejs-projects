import fs from "fs";
import { __dirname } from "../server.js";

// get all products
export const getAllProducts = (req, res, next) => {
  try {
    const products = JSON.parse(
      fs.readFileSync(__dirname + "/data/products.json")
    );
    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "something is wrong" });
  }
};

// get product by id
export const getProductById = (req, res, next) => {
  try {
    const { id } = req.params;
    const products = JSON.parse(
      fs.readFileSync(__dirname + "/data/products.json")
    );
    const product = products.filter((e) => e.id == id);
    if (product.length == 0) {
      return res.status(400).json({data:product, message: "invalid id" });
    }
    return res.status(200).json({data:product,message:'get success'});
  } catch (error) {
    res.status(500).json({ message: "something is wrong" });
  }
};

// update product
export const updateProduct = (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    let update=false
    const products = JSON.parse(
      fs.readFileSync(__dirname + "/data/products.json")
    );
    const newProducts = products.map((e) => {
      if (e.id == id) {
        update=true
        return { ...e, ...data };
      }
      return e;
    });
    fs.writeFileSync(
      __dirname + "/data/products.json",
      JSON.stringify(newProducts)
    );
    if(update){
      return res
      .status(201)
      .json({ data: {...data}, message: "update success" });
    }
    return res
      .status(400)
      .json({ data: {...data}, message: "invalid id" });
  } catch (error) {
    res.status(500).json({ message: "something is wrong" });
  }
};

// create product
export const createProduct = (req, res, next) => {
  try {
    const data = req.body;
    const products = JSON.parse(
      fs.readFileSync(__dirname + "/data/products.json")
    );
    const newId = products[products.length - 1].id + 1;
    products.push({ ...data, id: newId });
    fs.writeFileSync(
      __dirname + "/data/products.json",
      JSON.stringify(products)
    );
    return res.status(200).json({ data: products, message: "create success" });
  } catch (error) {
    res.status(500).json({ message: "something is wrong" });
  }
};

// delete product
export const deleteProduct = (req, res, next) => {
  try {
    let remove = false;
    const { id } = req.params;
    const products = JSON.parse(
      fs.readFileSync(__dirname + "/data/products.json")
    );
    const newProducts = products.filter((e) => {
      if (e.id == id) {
        remove = true;
        return false;
      }
      return true;
    });
    fs.writeFileSync(
      __dirname + "/data/products.json",
      JSON.stringify(newProducts)
    );
    if (remove) {
      return res
        .status(200)
        .json({ message: "delete success" });
    }
    return res.status(400).json({message:'invalid id'})
  } catch (error) {
    res.status(500).json({ message: "something is wrong" });
  }
};
