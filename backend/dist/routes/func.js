"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const search_1 = require("../controller/search");
const router = express_1.default.Router();
router.post("/ask", (req, res) => {
    const question = req.body.keys;
    try {
        const answer = (0, search_1.getTopMatches)(question);
        res.status(200).send(answer);
    }
    catch (e) {
        res.status(404).send(e.toString());
    }
});
router.post("/quiz", (req, res) => {
    const question = req.body.question;
    const answer = req.body.answer;
    try {
        const correct = (0, search_1.checkAnswer)(question, answer);
        res.status(200).send(correct);
    }
    catch (e) {
        console.log(e);
        res.status(404).send(e.toString());
    }
});
router.post("/suggest", (req, res) => {
    const question = req.body.question;
    try {
        const matches = (0, search_1.findMatches)(question);
        res.status(200).send(matches);
    }
    catch (e) {
        res.status(404).send(e.toString());
    }
});
exports.default = router;
