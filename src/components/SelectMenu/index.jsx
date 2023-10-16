import './selectmenu.css'
import Collapse from "../Collapse";
import MenuItem from "../MenuItem";
import { getCoverImg, capitalizeFirstLetter } from "../../functions";

function SelectMenu({ title, list, typeOfList, availableList, setAvailableList }) {

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
    };
    //exclude character from available selection
    const excludeHandler = (e) => {
        const name = e.currentTarget.id;
        excludeItem(availableList, setAvailableList, name);
    };

    return (
        <Collapse collapseTitle={title}>
            <ul className='menu'>
                {list.map((item, index) => (
                    <li key={`${item}-${index}`} id={item} onClick={excludeHandler} >
                        <MenuItem key={item} cover={`/${typeOfList}/${getCoverImg(item)}.png`} name={capitalizeFirstLetter(item)} />
                    </li>
                ))}
            </ul></Collapse>
    )
};
export default SelectMenu;