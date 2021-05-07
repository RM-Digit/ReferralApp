const Router = require("koa-router");
const product = require("../../models/productModel");
const router = new Router({
  prefix: "/api/product",
});
function register(app) {
  // product get router
  router.post("/get", async (ctx) => {
    const products = await product.find({});
    ctx.body = products;
  });

  // product save router
  router.post("/save", async (ctx) => {
    const productData = new product(ctx.request.body);
    product.deleteMany({});
    const savedProduct = await productData.save();
    ctx.body = savedProduct;
  });

  app.use(router.routes());
  app.use(router.allowedMethods());
}

module.exports = register;
