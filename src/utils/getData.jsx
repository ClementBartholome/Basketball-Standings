async function getData(leagueId, season) {
  const url = `https://api-basketball.p.rapidapi.com/standings?league=${leagueId}&season=${season}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0d8141fcc1msha76dd8d0b2185b8p12378ajsnf55b2132f26f",
      "X-RapidAPI-Host": "api-basketball.p.rapidapi.com",
    },
  };

  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

async function searchLeague(query) {
  const url = `https://api-basketball.p.rapidapi.com/leagues?name=${query}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0d8141fcc1msha76dd8d0b2185b8p12378ajsnf55b2132f26f",
      "X-RapidAPI-Host": "api-basketball.p.rapidapi.com",
    },
  };

  const res = await fetch(url, options);

  // Recommendation: handle errors
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

export { getData, searchLeague };
