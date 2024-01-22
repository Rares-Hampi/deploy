"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMatches = exports.checkAnswer = exports.getTopMatches = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function getTopMatches(keys) {
    const topN = 3;
    const topMatches = {};
    const absolutePath = path_1.default.resolve(__dirname, "../data/data.json");
    try {
        const data = JSON.parse(fs_1.default.readFileSync(absolutePath, "utf-8"));
        for (const i of data) {
            let match = 0;
            const keywordSet = new Set(i.keywords.map((keyword) => keyword.toLowerCase()));
            if (keys.length >= keywordSet.size) {
                for (const j of keys) {
                    if (keywordSet.has(j.toLowerCase())) {
                        match++;
                    }
                }
                if (match > 0) {
                    topMatches[i.answer] = match;
                }
            }
        }
        const sortedMatches = Object.entries(topMatches)
            .sort((a, b) => b[1] - a[1])
            .slice(0, topN);
        return sortedMatches.length > 0
            ? sortedMatches.map(([key]) => key)
            : ["Sorry, I still have a lot to learn..."];
    }
    catch (error) {
        console.error(error);
        return [error.toString()];
    }
}
exports.getTopMatches = getTopMatches;
function checkAnswer(question, expectedAnswer) {
    const absolutePath = path_1.default.resolve(__dirname, "../data/questionsAndAnswers.json");
    try {
        const data = JSON.parse(fs_1.default.readFileSync(absolutePath, "utf-8"));
        for (const i of data) {
            if (i.question === question && i.answer === expectedAnswer) {
                return true;
            }
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}
exports.checkAnswer = checkAnswer;
function findMatches(question) {
    const absolutePath = path_1.default.resolve(__dirname, "../data/questions.json");
    try {
        const data = JSON.parse(fs_1.default.readFileSync(absolutePath, "utf-8"));
        const words = question.split(" ");
        let matches = [];
        for (const j of data) {
            for (const k of words) {
                if (j.question.includes(k)) {
                    matches.push(j.question);
                }
            }
        }
        return matches.length > 0
            ? matches
            : ["Sorry, I still have a lot to learn..."];
    }
    catch (e) {
        console.error(e);
        return [e.toString()];
    }
}
exports.findMatches = findMatches;
