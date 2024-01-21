import express from "express";
import { getTopMatches, checkAnswer, findMatches } from "../controller/search";
import { log } from "console";

const router = express.Router();

router.post("/ask", (req, res) => {
  const question = req.body.keys;

  try {
    const answer = getTopMatches(question);
    res.status(200).send(answer);
  } catch (e: any) {
    res.status(404).send(e.toString());
  }
});

router.post("/quiz", (req, res) => {
  const question = req.body.question;
  const answer = req.body.answer;
  try {
    const correct = checkAnswer(question, answer);
    res.status(200).send(correct);
  } catch (e: any) {
    console.log(e);
    res.status(404).send(e.toString());
  }
});

router.post("/suggest", (req, res) => {
  const question = req.body.question;

  try {
    const matches = findMatches(question);
    res.status(200).send(matches);
  } catch (e: any) {
    res.status(404).send(e.toString());
  }
});

export default router;
