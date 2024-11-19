import { useQuery } from "@tanstack/react-query";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionData {
  totalContributions: number;
  weeks: ContributionWeek[];
}

const fetchGithubContributions = async (
  username: string
): Promise<ContributionData> => {
  const response = await fetch(
    `/api/github/contributions?username=${username}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub data");
  }

  const data = await response.json();

  return {
    totalContributions: data.totalContributions,
    weeks: data.weeks.map((week: any) => ({
      contributionDays: week.contributionDays.map((day: any) => ({
        date: day.date,
        count: day.contributionCount,
        level: day.contributionLevel,
      })),
    })),
  };
};

export const useGithubContributions = (username: string) => {
  return useQuery({
    queryKey: ["githubContributions", username],
    queryFn: () => fetchGithubContributions(username),
  });
};
