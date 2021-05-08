const Router = require("koa-router");
const product = require("../../models/productModel");
const router = new Router({
  prefix: "/api/product",
});
function register(app) {
  // product get router
  router.post("/get", async (ctx) => {
    const products = await product.find({});
    console.log("product", products);
    console.log("length", products.length);
    if (products.length) ctx.body = { success: true, product: products };
    else ctx.body = { success: false };
  });

  // product save router
  router.post("/save", async (ctx) => {
    const reqData = ctx.request.body[0];
    const model = {
      id: reqData.id,
      title: reqData.title,
      imgSRC: reqData.images[0].originalSrc,
      price: reqData.variants[0].price,
      permalink: "",
      quantity: reqData.totalInventory,
      hasOnlyDefaultVariant: reqData.hasOnlyDefaultVariant,
      sku: reqData.variants[0].sku,
    };
    const productData = new product(model);
    product.deleteMany({});
    const savedProduct = await productData.save();
    ctx.body = savedProduct;
  });

  // product remove router
  router.post("/remove", async (ctx) => {
    const deletedProduct = await product.deleteMany({});
    ctx.body = deletedProduct;
  });
  app.use(router.routes());
  app.use(router.allowedMethods());
}

module.exports = register;
