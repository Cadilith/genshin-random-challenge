import { useState } from "react";

function MenuItem({ cover, name }) {

    const [excluded, setExcluded] = useState(false);

    const toggle = () => {
        setExcluded(!excluded)
    }

    return (
        <div className={`portrait ${excluded ? 'excluded' : ''}`} onClick={toggle} key={name} id={name}>
            <img className="img" src={cover} alt={name} />
            <div className="name"><p>{name}</p></div>
        </div>

    )
}

export default MenuItem