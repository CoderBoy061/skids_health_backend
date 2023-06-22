const mongoose = require("mongoose");
module.exports = () => {
  mongoose
    .connect(process.env.CONNECTION_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected");
    })
    .catch((error) => {
      console.log(error.message);
    });
};
