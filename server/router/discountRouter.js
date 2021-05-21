import dotenv from "dotenv";
dotenv.config();
const { SHOPIFY_ACCESS_TOKEN } = process.env;
const Router = require("koa-router");
const productModel = require("../../models/productModel");
const customerModel = require("../../models/customerModel");
const adminURL =
  "https://skullsplitter.myshopify.com/admin/api/2021-04/graphql.json";
const router = new Router({
  prefix: "/discount",
});

function register(app) {
  router.post("/createDiscount", async (ctx) => {
    const data = ctx.request.body;
    console.log("landing site", data.landing_site_ref);
    if (!data.landing_site_ref) return (ctx.body = { success: false });
    const customerId = ctx.request.body.admin_graphql_api_id;
    const filter = { id: ctx.request.body.id };
    let today = new Date();
    let end = new Date();
    end.setDate(today.getDate() + 180);
    const product = await productModel.find({});
    const code = Math.random().toString(36).substring(2);
    const productId = product[0].id;
    const percent = 1;
    let query = `mutation discountCodeBasicCreate($basicCodeDiscount: DiscountCodeBasicInput!) {
          discountCodeBasicCreate(basicCodeDiscount: $basicCodeDiscount) {
            codeDiscountNode {
              id
              codeDiscount {
                ... on DiscountCodeBasic {
                  title
                  summary
                  status
                  codes(first: 1) {
                    edges {
                      node {
                        code
                      }
                    }
                  }
                }
              }
            }
            userErrors {
              message
            }
          }
        }`;
    let variables = {
      basicCodeDiscount: {
        appliesOncePerCustomer: true,
        code: code,
        startsAt: today.toISOString(),
        endsAt: end.toISOString(),
        appliesOncePerCustomer: true,
        customerGets: {
          items: {
            products: {
              productsToAdd: productId,
            },
          },
          value: {
            percentage: parseFloat(percent),
          },
        },
        customerSelection: {
          customers: {
            add: customerId,
          },
        },
        title: "referral app discount code",
        usageLimit: 1,
      },
    };
    const createdData = await fetch(adminURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query,
        variables: variables,
      }),
    }).then((result) => {
      return result.json();
    });
    const isErr =
      createdData.data.discountCodeBasicCreate.userErrors.length > 0
        ? true
        : false;
    console.log("lk", isErr);
    if (!isErr) {
      customerModel.findOneAndUpdate(filter, { discountCode: code });
    }
    ctx.body = isErr;
  });
  app.use(router.routes());
  app.use(router.allowedMethods());
}

module.exports = register;
