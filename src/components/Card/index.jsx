function Card({ cover, name }) {
    return (
        <>
            <img className="img" src={cover} alt={name} />
            <div className="name"><p>{name}</p></div>
        </>
    )
}

export default Card