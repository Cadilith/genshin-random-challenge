import './App.css';
import { characterList } from "./data/characters";
import { bossList } from "./data/bosses";
import { useState } from 'react';

function App() {

  const characters = characterList;
  let availableCharacters = characters;
  const bosses = bossList;
  const initialText = 'Generate';

  const [buttonText, setButtonText] = useState(initialText);
  const [randomBoss, setRandomBoss] = useState();
  const [randomTeam, setRandomTeam] = useState([]);
  const [uiProps, setuiProps] = useState({
    displayResult: false
  });

  function randomize(list) {
    return list[Math.floor(Math.random()*list.length)];
  }

  const getRandomBoss = () => {
    setRandomBoss(randomize(bosses));
  };

  const getRandomTeam = () => {
    let team = [];
    for (let index = 0; index < 4; index++) {
      let randomTeamMate = randomize(availableCharacters);
      availableCharacters = availableCharacters.filter((character) => character !== randomTeamMate);
      team.push(randomTeamMate);
      console.log(availableCharacters)
    }
    setRandomTeam(team);
  };

  const handleGenerateChallenge = () => {
    getRandomTeam();
    getRandomBoss();
    setuiProps({
      displayResult: true
    });
    setButtonText('Regenerate');
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Genshin impact challenge generator</h1>
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
          <button type='button' onClick={handleGenerateChallenge}>{buttonText}</button>
        </div>
      </main>
    </div>
  );
}

export default App;
