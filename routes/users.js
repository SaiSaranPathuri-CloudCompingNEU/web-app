const express = require("express");
const router = express.Router();
const User = require("../controllers/userscontroller");
const Product = require("../controllers/productcontroller");

router.get("/", (req, res) => {
  res.status(200).json({ msg: "show all users" });
});

router.get("/healthz", (req, res) => {
  res.status(200).json({ msg: "Heartbeat" });
});

router.route("/v1/user/:id").get(User.verify);

router.route("/v1/user").post(User.create);

router.route("/v1/user/:id").put(User.update);

router.route("/v1/product").post(Product.create);

router.route("/v1/product/:id").get(Product.get);

router.route("/v1/product/:id").put(Product.update);

router.route("/v1/product/:id").patch(Product.patch);

router.route("/v1/product/:id").delete(Product.delete);

router.route("/v1/user/:id").delete((req, res) => {
  res.status(501).json({ msg: "not implemented" });
});

router.route("/v1/user/:id").patch((req, res) => {
  res.status(501).json({ msg: "not implemented" });
});

module.exports = router;
