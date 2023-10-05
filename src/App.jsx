import './App.css';
import { characterList } from "./data/characters";
import { bossList } from "./data/bosses";
import { useState, useEffect } from 'react';
import Card from './components/Card/Card';
import FloatingPaimon from './components/FloatingPaimon/FloatingPaimon';
import DotTyping from './components/DotTyping/DotTyping';
import Collapse from './components/Collapse';
import MenuItem from './components/MenuItem/MenuItem';

function App() {
  const [errorMsg, setErrorMsg] = useState();
  const initialCharacters = characterList;
  const initialbosses = bossList;
  const [availableCharacters, setAvailableCharacters] = useState(initialCharacters);
  const [availableBosses, setAvailableBosses] = useState(initialbosses);
  const initialText = 'Generate';
  const [buttonText, setButtonText] = useState(initialText);
  const [randomBoss, setRandomBoss] = useState();
  const [randomTeam, setRandomTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uiProps, setuiProps] = useState({
    displayResult: false
  });

  //loading animation display
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [loading]);

  //make sure first letter is capital
  function capitalizeFirstLetter(string) {

    return (string[0].toUpperCase() +
      string.slice(1));
  }

  //radomizer function
  function randomize(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  //pick random boss name
  const getRandomBoss = () => {
    if (availableBosses.length < 1) {
      setErrorMsg("Please select at least 1 boss to fight");
      throw new Error("Select at leat 1 boss");
    } else {
      setRandomBoss(randomize(availableBosses));
    }
  };

  //Set a team of 4 random characters from the list
  const getRandomTeam = () => {
    let team = [];
    let updatedAvailableCharacters = availableCharacters;
    //a team needs at leat 4 characters
    if (availableCharacters.length < 4) {
      setErrorMsg("Please select at least 4 characters");
      throw new Error("Select at leat 4 characters");
    } else {
      for (let index = 0; index < 4; index++) {
        let randomTeamMate = randomize(updatedAvailableCharacters);
        //make sure there is only one traveler in team and avoid double pick
        if (randomTeamMate.includes("traveler")) {
          updatedAvailableCharacters = updatedAvailableCharacters.filter((character) => character.includes("traveler") === false)
        } else {
          updatedAvailableCharacters = updatedAvailableCharacters.filter((character) => character !== randomTeamMate);
        };
        //add picked character to team array
        team.push(randomTeamMate);
      }
      console.log(updatedAvailableCharacters);
      setRandomTeam(team);
    }
  };

  //init results display, set challenge, display results after 1.5sec loading animation
  const handleGenerateChallenge = () => {
    setErrorMsg();
    setuiProps({
      displayResult: false
    });
    try {
      getRandomTeam();
      getRandomBoss();
      setLoading(true);
      setuiProps({
        displayResult: true
      });
      setTimeout(() => {
        setLoading(false);
        setButtonText('Regenerate');
      }, 1500)
      console.log(availableCharacters)
    } catch (error) {

    }
  }


  //format the name of the item to match the file name format
  function getCoverImg(name) {
    let lowerCaseName = name.toLowerCase();
    let fileName = lowerCaseName.replace(/\s/g, '-');
    return fileName;
  }

  //exclude boss or character
  const excludeItem = (state, setState, name) => {
    //if item is available, exclude him
    if ((state.indexOf(name) > -1) === true) {
      setState(
        state.filter(item => item !== name));
      //if item is already axcluded, add it back to the array
    } else if ((state.indexOf(name) > -1) === false) {
      setState(current => [...current, name]);
    }
  }

  //exclude character from available selection
  const excludeCharacterHandler = (e) => {
    const name = e.currentTarget.id;
    excludeItem(availableCharacters, setAvailableCharacters, name);
  }

  //exclude boss from available selection
  const excludeBossHandler = (e) => {
    const name = e.currentTarget.id;
    excludeItem(availableBosses, setAvailableBosses, name);
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
                <li key={character + index} id={character} onClick={excludeCharacterHandler} >
                  <MenuItem key={character} cover={"/characters/" + getCoverImg(character) + '.png'} name={capitalizeFirstLetter(character)} />
                </li>
              ))}
            </ul></Collapse>
          <Collapse collapseTitle='Exclude bosses'>
            <ul className='boss__list'>
              {bossList.map((boss, index) => (
                <li key={boss + index} id={boss} onClick={excludeBossHandler} >
                  <MenuItem key={boss} cover={"/bosses/" + getCoverImg(boss) + '.png'} name={capitalizeFirstLetter(boss)} />
                </li>
              ))}
            </ul></Collapse>
        </div>
        <div className='generator'>
          {uiProps.displayResult && <div className={`generator__result ${loading ? 'hide' : 'show'}`}>
            <div className='defeat-with'><img className='line-before' src='/line.svg' alt='separation line' />Defeat<img src='/line.svg' alt='separation line' /></div>
            <div className='portrait'>{< Card cover={"/bosses/" + getCoverImg(randomBoss) + ".png"} name={capitalizeFirstLetter(randomBoss)} />}</div><div className='defeat-with'><img className='line-before' src='/line.svg' alt='separation line' />with<img src='/line.svg' alt='separation line' /></div>
            <ul className='team'>
              {
                randomTeam.map((teamMate, index) => (
                  <li key={index} className='portrait'>{< Card cover={"/characters/" + getCoverImg(teamMate) + ".png"} name={capitalizeFirstLetter(teamMate)} />}</li>
                ))
              }
            </ul>
          </div>}
          {errorMsg && <div className="errormsg">
            <p>{errorMsg}</p>
          </div>
          }
          {(!uiProps.displayResult || loading) && <div className='loading'><FloatingPaimon />
            <div className={`dots ${loading && 'show'}`}><DotTyping /></div></div>}
          <button type='button' className='generate__btn' onClick={handleGenerateChallenge}>{buttonText}</button>
        </div>
      </main >
      <footer>
        <p>© 2023 <a href='http://tiffanieorsoni.com' target='blank'>Tiffanie Orsoni</a> all rights reserved.
        </p>
        <p>Genshin Impact Challenge is an unofficial web application created by fans, designed for enthusiasts of the Action-RPG game Genshin Impact developed by miHoYo and its associates. Genshin Impact Challenge is in no way affiliated with miHoYo or its associates.
          All logos, game names, trademarks, and artistic works associated with the game Genshin Impact are the exclusive property of miHoYo and its associates.</p>
      </footer>
    </div >
  );
}

export default App;