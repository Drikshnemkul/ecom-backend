const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { category, name, featured, sort, select } = req.query;
  console.log(sort);
  const queryObject = {};

  if (category) {
    queryObject.category = category;
  }

  if (featured) {
    queryObject.featured = featured;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let apiData = Product.find(queryObject);

  if (sort) {
    let sortFix = sort.split(",").join(" ");
    apiData = apiData.sort(sortFix);
  }

  // (select = name category;
  if (select) {
    // let selectFix = select.replace(",", " ");
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 10;

  let skip = (page - 1) * limit;

  // page = 2;
  // limit = 3;
  // skip =  1 * 3 = 3

  apiData = apiData.skip(skip).limit(limit);

  console.log(queryObject);

  const myData = await apiData;
  res.status(200).json(myData);
};

const getSingleProduct = async (req, res) => {
  try {
    const productId = req.params.productId; // Assuming you pass the product ID as a parameter in the URL
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllProductsTesting = async (req, res) => {
  console.log(req.query);
  const myData = await Product.find(req.query).skip(2);
  // sort = name,price;

  res.status(200).json(myData);
};

module.exports = { getAllProducts, getAllProductsTesting, getSingleProduct };
