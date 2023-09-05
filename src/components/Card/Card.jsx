function Card({ cover, name }) {
    return (
        <>
            <img className="img" src={cover} alt={name} />
            <p className="name">{name}</p>
        </>
    )
}

export default Card