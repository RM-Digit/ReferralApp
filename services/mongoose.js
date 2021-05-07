const config_mongo = require("../config/key");

const mongoose = require("mongoose");

const db_addr = config_mongo.mongoURI;
let count = 0;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false,
};
const connectWithRetry = () => {
  mongoose
    .connect(db_addr, options)
    .then(() => {
      console.log("MongoDB Database connection established Successfully.");
    })
    .catch(() => {
      console.log(
        "MongoDB connection unsuccessful, retry after 5 seconds. ",
        ++count
      );
      setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();

mongoose.set("useFindAndModify", false);
exports.mongoose = mongoose;
