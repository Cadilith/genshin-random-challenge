import './collapse.css'
import { useState } from 'react'
import arrow from '../../assets/img/arrow.svg'


function Collapse(props) {
  const [open, setOpen] = useState(window.innerWidth >= 1126 ? true : false);
  const toggle = () => {
    setOpen(!open)
  }

  return (
    <div className="collapse-container">
      <div className="collapse-title">
        <p>{props.collapseTitle}</p>
        <button
          aria-expanded={open ? 'true' : 'false'}
          aria-controls="collapse-parent"
          aria-label="open this collapse"
        >
          <img
            src={arrow}
            className={open ? 'arrow down' : 'arrow up'}
            alt="Ouvrir l'article"
            onClick={toggle}
          />
        </button>
      </div>

      <div
        id="collapse-parent"
        className={open ? 'collapse-parent show' : 'collapse-parent hide'}
      >
        <div className="collapse-content">{props.children}</div>
      </div>
    </div>
  )
}

export default Collapse
