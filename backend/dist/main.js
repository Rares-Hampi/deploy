"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const func_1 = __importDefault(require("./routes/func"));
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(func_1.default);
app.use((req, res) => {
    console.log(req.url);
    res.status(404).send("Route doesn't exist");
});
app.listen(5500, "0.0.0.0", () => {
    console.log("Server is running");
});
