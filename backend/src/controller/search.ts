import fs from "fs";
import path from "path";

interface KeywordData {
  keywords: string[];
  answer: string;
}

export function getTopMatches(keys: string[]): string[] {
  const topN = 3;
  const topMatches: Record<string, number> = {};
  const absolutePath = path.resolve(__dirname, "../data/data.json");

  try {
    const data: KeywordData[] = JSON.parse(
      fs.readFileSync(absolutePath, "utf-8")
    );

    for (const i of data) {
      let match = 0;
      const keywordSet = new Set(
        i.keywords.map((keyword) => keyword.toLowerCase())
      );

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
  } catch (error: any) {
    console.error(error);
    return [error.toString()];
  }
}

interface QuestionData {
  question: string;
  answer: string;
}

export function checkAnswer(question: string, expectedAnswer: string): boolean {
  const absolutePath = path.resolve(
    __dirname,
    "../data/questionsAndAnswers.json"
  );
  try {
    const data: QuestionData[] = JSON.parse(
      fs.readFileSync(absolutePath, "utf-8")
    );

    for (const i of data) {
      if (i.question === question && i.answer === expectedAnswer) {
        return true;
      }
    }

    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export function findMatches(question: string): string[] {
  const absolutePath = path.resolve(__dirname, "../data/questions.json");
  try {
    const data: QuestionData[] = JSON.parse(
      fs.readFileSync(absolutePath, "utf-8")
    );

    const words = question.split(" ");

    let matches: string[] = [];

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
  } catch (e: any) {
    console.error(e);
    return [e.toString()];
  }
}
