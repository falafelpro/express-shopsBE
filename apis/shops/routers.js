const express = require("express");
const router = express.Router();
const { shopCreate, getShops, productCreate } = require("./controllers");

// Param Middleware
router.param("shopId", async (req, res, next, shopId) => {
  const shop = await fetchShop(shopId, next);
  if (shop) {
    req.shop = shop;
    next();
  } else {
    next({ status: 404, message: "Shop Not Found!" });
  }
});

router.get("/", getShops);
router.post("/", shopCreate);
router.post("/:shopId/products", productCreate);

module.exports = router;
