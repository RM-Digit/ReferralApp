import dotenv from "dotenv";

dotenv.config();
const Router = require("koa-router");
const customerModel = require("../../models/customerModel");
const adminURL = "https://skullsplitter.myshopify.com/admin/api/graphql.json";
const router = new Router({
  prefix: "/api/customer",
});
const { SHOPIFY_ACCESS_TOKEN } = process.env;

function register(app) {
  router.post("/getCodeById", async (ctx) => {
    const id = ctx.request.body.id;
    const customerData = await customerModel.findOne({ id: id });
    console.log("customerData", customerData);
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
    const data = ctx.request.body;
    console.log("customer update", data.landing_site_ref);
    if (!data.landing_site_ref) return (ctx.body = { success: false });
    const filter = { id: ctx.request.body.id };

    let customerTags = {
      id: ctx.request.body.admin_graphql_api_id,
      tags: ["referedTo", "refer"],
    };

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
    const tagUpdateData = await fetch(adminURL, {
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
    console.log("customerTag", tagUpdateData);
    if (tagUpdateData) ctx.body = { success: true, customer: tagUpdateData };
    else ctx.body = { success: false, customer: tagUpdateData };
  });

  app.use(router.routes());
  app.use(router.allowedMethods());
}

module.exports = register;
