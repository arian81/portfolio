import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const graphql = JSON.stringify({
    query: `
      query randomQuestion($categorySlug: String, $filters: QuestionListFilterInput) {
        randomQuestion(categorySlug: $categorySlug, filters: $filters) {
          titleSlug
        }
      }
    `,
    variables: {
      categorySlug: "all-code-essentials",
      filters: {},
    },
  });

  try {
    const response = await fetch("https://leetcode.com/graphql/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: graphql,
    });

    const data = await response.json();
    const titleSlug = data.data.randomQuestion.titleSlug;
    const leetCodeUrl = `https://leetcode.com/problems/${titleSlug}`;
    res.status(200).json({ url: leetCodeUrl });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch from LeetCode API" });
  }
}
