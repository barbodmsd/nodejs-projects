import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../Controllers/productControl.js";
const productRoute = express.Router();

productRoute.route("").get(getAllProducts).post(createProduct);
productRoute
  .route("/:id")
  .get(getProductById)
  .patch(updateProduct)
  .delete(deleteProduct);

export default productRoute;
