"use client";

import { useGithubContributions } from "@/apis/queries/useGithubContributions";

export function GithubContributions() {
  const { data, isLoading } = useGithubContributions("dlgnswk");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
}
