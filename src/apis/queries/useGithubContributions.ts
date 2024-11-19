import { useSuspenseQuery } from "@tanstack/react-query";

interface ContributionDetail {
  repo?: string;
  commits: number;
  pullRequests: number;
  reviews: number;
  reviewComments: number;
}

interface DayContribution {
  date: string;
  count: number;
  level: number;
  details: ContributionDetail;
}

interface WeekContributions {
  days: DayContribution[]; // 길이 7의 배열
}

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

const fetchGithubContributions = async (
  username: string
): Promise<{ yearContributions: WeekContributions[] }> => {
  const query = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              contributionLevel
            }
          }
        }
        commitContributionsByRepository {
          repository {
            name
          }
          contributions(first: 20) {
            nodes {
              occurredAt
              commitCount
            }
          }
        }
        pullRequestContributions(first: 50) {
          nodes {
            occurredAt
            pullRequest {
              number
              comments(first: 50) {
                nodes {
                  author {
                    login
                  }
                  createdAt
                  id
                }
              }
              reviews(first: 50) {
                nodes {
                  author {
                    login
                  }
                  createdAt
                  comments(first: 50) {
                    nodes {
                      author {
                        login
                      }
                      createdAt
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { username },
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub data");
  }

  const responseData = await response.json();

  const calendar =
    responseData?.data?.user?.contributionsCollection?.contributionCalendar;
  const commits =
    responseData?.data?.user?.contributionsCollection
      ?.commitContributionsByRepository;
  const prs =
    responseData?.data?.user?.contributionsCollection?.pullRequestContributions;
  const reviews =
    responseData?.data?.user?.contributionsCollection
      ?.pullRequestReviewContributions;

  const now = new Date();
  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(now.getFullYear() - 1);

  const yearContributions: WeekContributions[] = [];
  let currentWeek: DayContribution[] = [];

  calendar?.weeks.forEach((week) => {
    week.contributionDays.forEach((day) => {
      const date = new Date(day.date);

      if (date >= oneYearAgo && date <= now) {
        const dailyCommits =
          commits?.reduce(
            (acc, repo) =>
              acc +
              (repo.contributions.nodes?.filter(
                (c) =>
                  new Date(c.occurredAt).toDateString() === date.toDateString()
              ).length || 0),
            0
          ) || 0;

        const dailyPRs =
          prs?.nodes?.filter(
            (pr) =>
              new Date(pr.occurredAt).toDateString() === date.toDateString()
          ).length || 0;

        const dailyReviews =
          reviews?.nodes?.filter(
            (review) =>
              new Date(review.occurredAt).toDateString() === date.toDateString()
          ).length || 0;

        const dailyReviewComments =
          prs?.nodes?.reduce((acc, pr) => {
            const reviews = pr.pullRequest.reviews.nodes || [];
            return (
              acc +
              reviews.reduce((reviewAcc, review) => {
                if (
                  review.author.login === username &&
                  new Date(review.createdAt).toDateString() ===
                    date.toDateString()
                ) {
                  return reviewAcc + (review.comments.nodes?.length || 0);
                }
                return reviewAcc;
              }, 0)
            );
          }, 0) || 0;

        currentWeek.push({
          date: day.date,
          count: day.contributionCount,
          level: day.contributionLevel,
          details: {
            commits: dailyCommits,
            pullRequests: dailyPRs,
            reviews: dailyReviews,
            reviewComments: dailyReviewComments,
          },
        });

        if (currentWeek.length === 7) {
          yearContributions.push({ days: currentWeek });
          currentWeek = [];
        }
      }
    });
  });

  if (currentWeek.length > 0) {
    yearContributions.push({ days: currentWeek });
  }

  return { yearContributions };
};

export const useGithubContributions = (username: string) => {
  return useSuspenseQuery({
    queryKey: ["githubContributions", username],
    queryFn: () => fetchGithubContributions(username),
  });
};
