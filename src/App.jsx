import './App.css';
import { characterList } from "./data/characters";
import { bossList } from "./data/bosses";
import { useState } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import SelectMenu from './components/SelectMenu';
import Generator from './components/Generator';

function App() {
  const [errorMsg, setErrorMsg] = useState();
  const initialCharacters = characterList;
  const initialbosses = bossList;
  const [availableCharacters, setAvailableCharacters] = useState(initialCharacters);
  const [availableBosses, setAvailableBosses] = useState(initialbosses);



  return (
    <div className="App">
      <Header />
      <main>
        <div className='selections'>
          <SelectMenu title='Exclude characters' list={initialCharacters} typeOfList='characters' availableList={availableCharacters} setAvailableList={setAvailableCharacters} />
          <SelectMenu title='Exclude bosses' list={initialbosses} typeOfList='bosses' availableList={availableBosses} setAvailableList={setAvailableBosses} />
        </div>
        <Generator availableBosses={availableBosses} availableCharacters={availableCharacters} setErrorMsg={setErrorMsg} errorMsg={errorMsg} />
      </main>
      <Footer />
    </div>
  );
}

export default App;