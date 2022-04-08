const REPO_API = "https://api.github.com/search/repositories";

export function fetchRepositories(params) {
  return fetch(
    `${REPO_API}?q=created:>${params.date}&sort=stars&order=desc`
  ).then((res) => res.json());
}

export function fetchFakeData() {
  return Promise.resolve({
    items: [
      {
        id: 1,
        language: "Python",
        html_url: "www.example.com",
        stargazers_count: 800,
        description: "Lorem ipsum dolor",
      },
      {
        id: 2,
        language: "JavaScript",
        html_url: "www.example.com",
        stargazers_count: 780,
        description: "Lorem ipsum dolor",
      },
      {
        id: 3,
        language: "Python",
        html_url: "www.example.com",
        stargazers_count: 760,
        description: "Lorem ipsum dolor",
      },
      {
        id: 4,
        language: "Ruby",
        html_url: "www.example.com",
        stargazers_count: 720,
        description: "Lorem ipsum dolor",
      },
      {
        id: 5,
        language: "Swift",
        html_url: "www.example.com",
        stargazers_count: 699,
        description: "Lorem ipsum dolor",
      },
      {
        id: 6,
        language: "HTML",
        html_url: "www.example.com",
        stargazers_count: 665,
        description: "Lorem ipsum dolor",
      },
      {
        id: 7,
        language: "C++",
        html_url: "www.example.com",
        stargazers_count: 630,
        description: "Lorem ipsum dolor",
      },
      {
        id: 8,
        language: "C#",
        html_url: "www.example.com",
        stargazers_count: 620,
        description: "Lorem ipsum dolor",
      },
      {
        id: 9,
        language: "JavaScript",
        html_url: "www.example.com",
        stargazers_count: 580,
        description: "Lorem ipsum dolor",
      },
      {
        id: 10,
        language: "Node",
        html_url: "www.example.com",
        stargazers_count: 540,
        description: "Lorem ipsum dolor",
      },
      {
        id: 11,
        language: "Python",
        html_url: "www.example.com",
        stargazers_count: 800,
        description: "Lorem ipsum dolor",
      },
      {
        id: 12,
        language: "JavaScript",
        html_url: "www.example.com",
        stargazers_count: 780,
        description: "Lorem ipsum dolor",
      },
      {
        id: 13,
        language: "Python",
        html_url: "www.example.com",
        stargazers_count: 760,
        description: "Lorem ipsum dolor",
      },
      {
        id: 14,
        language: "Ruby",
        html_url: "www.example.com",
        stargazers_count: 720,
        description: "Lorem ipsum dolor",
      },
      {
        id: 15,
        language: "Swift",
        html_url: "www.example.com",
        stargazers_count: 699,
        description: "Lorem ipsum dolor",
      },
      {
        id: 16,
        language: "HTML",
        html_url: "www.example.com",
        stargazers_count: 665,
        description: "Lorem ipsum dolor",
      },
      {
        id: 17,
        language: "C++",
        html_url: "www.example.com",
        stargazers_count: 630,
        description: "Lorem ipsum dolor",
      },
      {
        id: 18,
        language: "C#",
        html_url: "www.example.com",
        stargazers_count: 620,
        description: "Lorem ipsum dolor",
      },
      {
        id: 19,
        language: "JavaScript",
        html_url: "www.example.com",
        stargazers_count: 580,
        description: "Lorem ipsum dolor",
      },
      {
        id: 20,
        language: "Node",
        html_url: "www.example.com",
        stargazers_count: 540,
        description: "Lorem ipsum dolor",
      },
    ],
  });
}
