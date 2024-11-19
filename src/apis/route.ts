import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const username = url.searchParams.get("username");

  if (!username) {
    return new Response(JSON.stringify({ error: "Username is required" }), {
      status: 400,
    });
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${import.meta.env.PUBLIC_GITHUB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    const data = await response.json();

    if (data.errors) {
      return new Response(JSON.stringify({ error: data.errors[0].message }), {
        status: 400,
      });
    }

    return new Response(
      JSON.stringify(
        data.data.user.contributionsCollection.contributionCalendar
      ),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          // CORS 헤더 추가
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch GitHub data" }),
      { status: 500 }
    );
  }
};
