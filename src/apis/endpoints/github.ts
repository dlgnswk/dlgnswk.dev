export const GITHUB_API = {
  BASE_URL: "/api/github",

  CONTRIBUTIONS: (username: string) =>
    `${GITHUB_API.BASE_URL}/contributions?username=${username}`,
} as const;
