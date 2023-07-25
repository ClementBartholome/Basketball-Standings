import React, { useState, useEffect } from "react";
import getData from "./utils/getData";

export default function App() {
  const [leagueId, setLeagueId] = useState(12);
  const [season, setSeason] = useState("2022-2023");
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
      <h1>Classements de la saison 2022-2023</h1>
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
