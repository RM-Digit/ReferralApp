const Router = require("koa-router");
const share = require("../../models/shareModel");

const router = new Router({
  prefix: "/share",
});

function register(app) {
  router.post("/save", async (ctx) => {
    share.deleteMany({});
    const shareModel = new share(ctx.request.body);
    shareModel.save();
    ctx.body = { success: true };
  });
  router.post("/get", async (ctx) => {
    const shareLink = await share.find({});

    ctx.body = { success: true, shareLink: shareLink[0].shareLink };
  });
  app.use(router.routes());
  app.use(router.allowedMethods());
}

module.exports = register;
