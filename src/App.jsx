import './App.css';
import { useEffect } from 'react';
import { characterList } from "./data/characters";
import { bossList } from "./data/bosses";
import { useState } from 'react';
import Card from './components/Card/Card';
import FloatingPaimon from './components/FloatingPaimon/FloatingPaimon';
import DotTyping from './components/DotTyping/DotTyping';
import Collapse from './components/Collapse';

function App() {

  const characters = characterList;
  let availableCharacters = characters;
  const bosses = bossList;
  const initialText = 'Generate';

  const [buttonText, setButtonText] = useState(initialText);
  const [randomBoss, setRandomBoss] = useState();
  const [randomTeam, setRandomTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uiProps, setuiProps] = useState({
    displayResult: false
  });

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [loading]);

  function capitalizeFirstLetter(string) {

    return (string[0].toUpperCase() +
      string.slice(1));
  }

  function randomize(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  const getRandomBoss = () => {
    setRandomBoss(randomize(bosses));
  };

  const getRandomTeam = () => {
    let team = [];
    for (let index = 0; index < 4; index++) {
      let randomTeamMate = randomize(availableCharacters);
      if (randomTeamMate.includes("traveler")) {
        availableCharacters = availableCharacters.filter((character) => character.includes("traveler") === false)
      } else {
        availableCharacters = availableCharacters.filter((character) => character !== randomTeamMate);
      };
      team.push(capitalizeFirstLetter(randomTeamMate));
    }
    setRandomTeam(team);
  };

  const handleGenerateChallenge = () => {
    setuiProps({
      displayResult: false
    });
    getRandomTeam();
    getRandomBoss();
    setLoading(true);
    setuiProps({
      displayResult: true
    });
    setTimeout(() => {
      setLoading(false);
      setButtonText('Regenerate');
    }, 2000)
  }

  function getCoverImg(name) {
    let lowerCaseName = name.toLowerCase();
    let fileName = lowerCaseName.replace(/\s/g, '-');
    return fileName;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Genshin Impact Challenge</h1>
      </header>
      <main>
        <div className='selections'>
          <Collapse collapseTitle='Exclude characters'>
          <ul className='character__list'>
            {characterList.map((character, index) => (
              <li key={index} className='portrait'><Card cover={"/characters/" + getCoverImg(character) + '.png'} name={capitalizeFirstLetter(character)} /></li>
            )
            )}
            </ul></Collapse>
        </div>
        <div className='generator'>
          {uiProps.displayResult && <div className={`generator__result ${loading ? 'hide' : 'show'}`}>
            <div className='defeat-with'><img className='line-before' src='/line.svg' alt='separation line' />Defeat<img src='/line.svg' alt='separation line' /></div> <div className='portrait'>{< Card cover={"/bosses/" + getCoverImg(randomBoss) + ".png"} name={randomBoss} />}</div><div className='defeat-with'><img className='line-before' src='/line.svg' alt='separation line' />with<img src='/line.svg' alt='separation line' /></div>
            <ul className='team'>
              {
                randomTeam.map((teamMate, index) => (
                  <li key={index} className='portrait'>{< Card cover={"/characters/" + getCoverImg(teamMate) + ".png"} name={teamMate} />}</li>
                ))
              }
            </ul>
          </div>}
          {(!uiProps.displayResult || loading) && <div className='loading'><FloatingPaimon /><div className={`dots ${loading && 'show'}`}><DotTyping /></div></div>}
          <button type='button' className='generate__btn' onClick={handleGenerateChallenge}>{buttonText}</button>
        </div>
      </main>
      <footer>
        <p>© 2023 <a href='http://tiffanieorsoni.com' target='blank'>Tiffanie Orsoni</a> all rights reserved.
        </p>
        <p>Genshin Impact Challenge is an unofficial web application created by fans, designed for enthusiasts of the Action-RPG game Genshin Impact developed by miHoYo and its associates. Genshin Impact Challenge is in no way affiliated with miHoYo or its associates.
          All logos, game names, trademarks, and artistic works associated with the game Genshin Impact are the exclusive property of miHoYo and its associates.</p>
      </footer>
    </div>
  );
}

export default App;