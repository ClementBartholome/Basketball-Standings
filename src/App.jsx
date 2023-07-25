/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import { getData, searchLeague } from "./utils/getData";

export default function App() {
  const [leagueId, setLeagueId] = useState(12);
  const [season, setSeason] = useState("2022-2023");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetchData();
  }, [leagueId, season]);

  const fetchData = async () => {
    try {
      const data = await getData(leagueId, season);
      const uniqueTeams = [];
      data.response[0].forEach((team) => {
        if (!uniqueTeams.some((t) => t.team.id === team.team.id)) {
          uniqueTeams.push(team);
        }
      });
      setTeams(uniqueTeams);
      console.log(uniqueTeams);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
  }

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await searchLeague(searchQuery);
      setSearchResults(data.response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const selectLeague = (league) => {
    const season2022_2023 = league.seasons.find(
      (season) => season.season === "2022-2023"
    );
    if (season2022_2023) {
      setLeagueId(league.id);
      setSeason("2022-2023");
    } else {
      console.log("Saison 2022-2023 introuvable pour ce championnat.");
    }
    setSearchResults([]);
  };

  const handleNbaClick = () => {
    setLeagueId(12);
    setSeason("2022-2023");
  };

  const handleEuroleagueClick = () => {
    setLeagueId(120);
    setSeason("2022");
  };

  const handleLnbClick = () => {
    setLeagueId(2);
    setSeason("2022-2023");
  };

  const handleLigaAcbClick = () => {
    setLeagueId(117);
    setSeason("2022-2023");
  };

  return (
    <div>
      <h1>Classements de la saison {season}</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Rechercher un championnat..."
        />
        <button type="submit">Rechercher</button>
      </form>
      {searchResults.length > 0 && (
        <div>
          <h2>Résultats de la recherche :</h2>
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>
                <button onClick={() => selectLeague(result)}>
                  {result.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <button onClick={handleNbaClick}>NBA</button>
        <button onClick={handleEuroleagueClick}>Euroleague</button>
        <button onClick={handleLnbClick}>LNB</button>
        <button onClick={handleLigaAcbClick}>Liga ACB</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Équipe</th>
            <th>Matchs joués</th>
            <th>Victoires</th>
            <th>Défaites</th>
            <th>%</th>
            <th>Points marqués</th>
            <th>Points encaissés</th>
          </tr>
        </thead>
        <tbody>
          {teams &&
            teams.map((team) => (
              <tr key={team.team.id}>
                <td>{team.team.name}</td>
                <td>{team.games.played}</td>
                <td>{team.games.win.total}</td>
                <td>{team.games.lose.total}</td>
                <td>{team.games.win.percentage}</td>
                <td>{team.points.for}</td>
                <td>{team.points.against}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
