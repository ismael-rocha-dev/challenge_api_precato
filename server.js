const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();
const db = require("./models");
const corsSettings = {
  originL: "http://localhost:8081"
};
require('dotenv/config')

const subscriptionService = require('./services/subscription.service');
subscriptionService();

const subscriptionRoutes = require('./routes/subscription.route');
const message_flowRoutes = require('./routes/message_flow.route');

server.use(cors(corsSettings));
// Parse request of content-type - application/json
server.use(bodyParser.json());
// parse requests of content-type -application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }));

//configurar rotas a serem usadas
server.use("/api/subscriptions",subscriptionRoutes);
server.use("/api/message",message_flowRoutes);

// set listening ports for request
const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});
// Run following function if you want drop existing tables and re-sync database
// db.dropRestApiTable();
db.databaseConf.sync();
