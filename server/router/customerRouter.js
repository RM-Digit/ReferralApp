import dotenv from "dotenv";

dotenv.config();
const Router = require("koa-router");
const customerModel = require("../../models/customerModel");
const adminURL =
  "https://skullsplitter.myshopify.com/admin/api/graphql.json";
const router = new Router({
  prefix: "/api/customer",
});
const { SHOPIFY_ACCESS_TOKEN } = process.env;

function register(app) {
  router.post("/getCodeById", async (ctx) => {
    const id = ctx.request.body.id;
    const customerData = await customerModel.findOne({id:id});
    console.log("customerData",customerData)
    if (customerData) ctx.body = customerData.code;
    else ctx.body = false;
  });
  router.post("/clear", async (ctx) => {
    const deleted = await customerModel.deleteMany({});
    ctx.body = deleted;
  });
  router.post("/get", async (ctx) => {
    const customers = await customerModel.find({});
    if (customers.length) ctx.body = { success: true, customer: customers };
    else ctx.body = { success: false };
  });
  router.post("/update", async (ctx) => {
    const filter = { id: ctx.request.body.id };
   
    let customerTags = {
      id: "gid://shopify/Customer/" + ctx.request.body.id,
      tags: ["referedTo", "refer"],
    };
    console.log("id",customerTags.id)

    const updated_doc = await customerModel.findOneAndUpdate(filter, {
      $inc: { score: 1 }, referringSite: ctx.request.body.refer, 
    });
    let query_old = `mutation {
      tagsAdd(
        id: ${customerTags.id}
        tags: ${customerTags.tags}
      ) {
        userErrors {
          field
          message
        }
      }
    }`;
    let query = `mutation tagsAdd($id: ID!, $tags: [String!]!) {
      tagsAdd(id: $id, tags: $tags) {
        node {
          id
        }
        userErrors {
          field
          message
        }
      }
    }`;
    const data = await fetch(adminURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query,
        variables: customerTags,
      }),
    }).then((result) => {
      return result.json();
    });
    console.log("customerTag", data);
    if (updated_doc) ctx.body = { success: true, customer: data };
    else ctx.body = { success: false,customer: data };
  });

  app.use(router.routes());
  app.use(router.allowedMethods());
}

module.exports = register;
