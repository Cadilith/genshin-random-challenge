import logo from './logo.svg';
import './App.css';
import { characterList } from "./data/characters";
import { bossList } from "./data/bosses";
import { useState } from 'react';

function App() {

  const characters = characterList;
  const bosses = bossList;
  const [randomBoss, setRandomBoss] = useState();
  const [randomTeam, setRandomTeam] = useState([]);
  const [uiProps, setuiProps] = useState({
    buttonDisabled: false,
    displayResult: false
  }
  );


  const getRandomBoss = () => {
    setRandomBoss(bosses[Math.floor(Math.random() * bosses.length)]);
  };

  const getRandomTeam = () => {
    let team = [];
    for (let index = 0; index < 4; index++) {
      let randomTeamMate = characters[Math.floor(Math.random() * characters.length)];
      team.push(randomTeamMate);
    }
    setRandomTeam(team);
  };

  const handleGenerateChallenge = () => {
    getRandomTeam();
    getRandomBoss();
    setuiProps({
      buttonDisabled: true,
      displayResult: true
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        {/* <div className='lists'>
          <ul>
            {characters && characters.map((character, index) => (
              <li key={index}>
                {character}
              </li>
            ))}
          </ul>
          <ul>
            {bosses && bosses.map((boss, index) => (
              <li key={index}>
                {boss}
              </li>
            ))}
          </ul>
        </div> */}
        <div className='generator'>
          {uiProps.displayResult && <div className='generator__result'>
            Defeat {randomBoss} with
            <ul className='team'>
              {
                randomTeam.map((teamMate, index) => (
                  <li key={index} className='generator__result__list-item'>{teamMate}</li>
                ))
              }
            </ul>
          </div>}
          <button type='button' onClick={handleGenerateChallenge}>Generate</button>
        </div>
      </main>
    </div>
  );
}

export default App;
