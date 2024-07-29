const routes = require("express").Router();

const auth = require("../middleware/auth");
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const orderController = require("../controllers/orderController");
const verifyMerchant = require("../middleware/verifyMerchant");

routes.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});

routes.use("/", require("./trigger.route"));
// User Routes
routes.post("/register", userController.register);
routes.post("/login", userController.login);

// Product Routes
routes.post("/products", auth, productController.createProduct);
routes.get("/products", productController.listProducts);

// Order Routes
routes.post("/orders", auth, orderController.createOrder);
routes.get("/orders", auth, verifyMerchant, orderController.listOrders);

module.exports = routes;
