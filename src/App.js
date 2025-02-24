import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import playersData from './data/players.json';
import './App.css';

function App() {
  const [players, setPlayers] = useState([]);

  const highlightedPlayers = [
    'Redgar',
    'KaracaTR',
    'Berketrk',
    'Paramedic',
    'ChaosChaser',
    'QwowpTR',
    'Tiran'
  ];

  useEffect(() => {
    // Puanlara göre sırala ve sıralama numarası ekle
    const sortedPlayers = playersData.players
      .sort((a, b) => b.currentScore - a.currentScore);

    let currentRank = 1;
    let playersAtCurrentScore = 1;
    
    const rankedPlayers = sortedPlayers.map((player, index) => {
      if (index > 0) {
        if (player.currentScore === sortedPlayers[index - 1].currentScore) {
          // Aynı puana sahip oyuncular için aynı sıra
          playersAtCurrentScore++;
        } else {
          // Farklı puan için yeni sıra (önceki aynı puanlı oyuncuların toplam sayısını ekle)
          currentRank += playersAtCurrentScore;
          playersAtCurrentScore = 1;
        }
      }
      return {
        ...player,
        rank: currentRank
      };
    });

    setPlayers(rankedPlayers);
  }, []);

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'Artış':
        return <i className="fas fa-arrow-up trend-up"></i>;
      case 'Düşüş':
        return <i className="fas fa-arrow-down trend-down"></i>;
      default:
        return <i className="fas fa-equals trend-stable"></i>;
    }
  };

  const getStatusContent = (status) => {
    switch (status) {
      case 'İyi':
        return <i className="fas fa-laugh-beam status-icon status-good"></i>;
      case 'Normal':
        return <i className="fas fa-meh status-icon status-normal"></i>;
      case 'Kötü':
        return <i className="fas fa-frown status-icon status-bad"></i>;
      default:
        return status;
    }
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      />
      <div className="container-fluid py-4">
        <div className="table-responsive">
          <table className="table table-dark table-striped">
            <thead className="table-dark">
              <tr>
                <th scope="col">Sıra</th>
                <th scope="col">Oyuncu</th>
                <th scope="col">Puan</th>
                <th scope="col">Geçmiş</th>
                <th scope="col">Değişim</th>
                <th scope="col">Klan</th>
                <th scope="col">Durum</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.name}>
                  <td>{player.rank}</td>
                  <td className={highlightedPlayers.includes(player.name) ? 'highlighted-name' : ''}>
                    {player.name}
                  </td>
                  <td>{player.currentScore}</td>
                  <td>{player.previousScores.join(' ')}</td>
                  <td className="trend-cell">
                    {getTrendIcon(player.trend)}
                  </td>
                  <td>{player.clan}</td>
                  <td className="status-cell">
                    {getStatusContent(player.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
