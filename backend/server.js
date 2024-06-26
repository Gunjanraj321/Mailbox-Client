require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require('http');
const socketIo = require('socket.io'); 

const verify = require("./middleware/verifyToken");

const signRoute = require("./routes/userSignRoute");
const forgotPassRoute = require("./routes/forgotPassRoute");
const mailRoute = require("./routes/mailRoute");
const socketHandler = require('./routes/SocketHandler');

const user = require("./models/user");
const forgotPasswordRequest = require("./models/forgotpassModel");
const Mail = require("./models/mail");

const sequelize = require("./utils/db");

const app = express();
const server = http.createServer(app);
const io = socketIo(server); 

app.use(cors());
app.use(express.json());

forgotPasswordRequest.belongsTo(user, {
  foreignKey: "userId",
});
user.hasMany(forgotPasswordRequest, {
  foreignKey: "userId",
});

user.hasMany(Mail, { foreignKey: "senderId" });
user.hasMany(Mail, { foreignKey: "recipientId" });

app.use("/sign", signRoute);
app.use("/pass", forgotPassRoute);
app.use("/mail", verify.verify, mailRoute);

socketHandler(io);

async function initiate() {
  try {
    await sequelize.sync();
    console.log("db connected");
    server.listen(3001, () => {
      console.log(`Server Running at 3001`);
    });
  } catch (error) {
    console.log(error);
  }
}

initiate();
