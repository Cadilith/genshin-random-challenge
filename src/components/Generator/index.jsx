import './generator.css';
import FloatingPaimon from "../FloatingPaimon";
import DotTyping from "../DotTyping";
import Card from "../Card";
import { capitalizeFirstLetter, getCoverImg } from "../../functions";
import { useState, useEffect } from "react";

function Generator({ availableBosses, availableCharacters, setErrorMsg, errorMsg }) {
    const initialText = 'Generate';
    const [buttonText, setButtonText] = useState(initialText);
    const [randomBoss, setRandomBoss] = useState();
    const [randomTeam, setRandomTeam] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uiProps, setuiProps] = useState({
        displayResult: false
    });

    //radomizer function
    function randomize(list) {
        return list[Math.floor(Math.random() * list.length)];
    };


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

    //loading animation display
    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    }, [loading]);

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

    return (
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
    )
};

export default Generator;