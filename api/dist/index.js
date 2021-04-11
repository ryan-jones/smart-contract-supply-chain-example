"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
// import isAuth from "./middlewares/auth";
// import { IAuth } from "./interfaces";
const dotenv_1 = require("dotenv");
const app = express_1.default();
dotenv_1.config();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.use(morgan_1.default("dev"));
// app.use(isAuth);
// mongoose
//   .connect(process.env.MONGO_DOCKER_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDb connected"))
//   .catch((err: any) => console.error(err));
app.use("/api", routes_1.default);
app.use((err, req, res) => {
    console.error(err.message);
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    res.status(err.statusCode).send(`${err.statusCode} - ${err.message}`);
});
app.listen(8080, () => {
    console.log("App is running on port 8080");
});
//# sourceMappingURL=index.js.map