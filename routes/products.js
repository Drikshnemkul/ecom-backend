const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getAllProductsTesting,
  getSingleProduct,
} = require("../controllers/products");

router.route("/").get(getAllProducts);
router.route("/testing").get(getAllProductsTesting);
router.route("/:productId").get(getSingleProduct);

module.exports = router;
