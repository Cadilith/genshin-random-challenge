import './floatingpaimon.css';
import paimon from '../../assets/img/paimon.png'

function FloatingPaimon() {
    return (
        <div className="paimon-frame">
            <img className="paimon floating" src={paimon} alt="Paimon is waiting for generation" />
            <span className="shadow"></span>
        </div>
    )
}

export default FloatingPaimon