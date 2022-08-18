import { FaShieldAlt } from 'react-icons/fa';
import { CgShapeRhombus } from 'react-icons/cg';
import { RiSwordLine } from 'react-icons/ri';
import CircularProgress from '@mui/material/CircularProgress';

import Tilt from 'react-parallax-tilt';

import classes from './Card.module.css';

export default function Card(props) {
  const status = props.card?.winner ? 'winzner' : 'loserz';
  const classkey = `card--${status}`;

  return (
    <div className={classes.cardWrapper}>
      <Tilt className="Tilt" glareEnable={true} scale='1.1'>
        <div className={[classes.card, classes[classkey]].join(' ')}>
          <div className={classes.card__head}>
            <div className={classes.chip}>
              <span title={`Power: ${props.card?.power}`} className={classes.power}>{props.card?.power}</span>
              <span title={`Name: ${props.card?.name}`}>{props.card?.name}</span>
              {/* <span title={`Defense: ${props.card?.defense}`}><FaShieldAlt /> {props.card?.defense}</span> */}
            </div>
          </div>

          <div className={classes.card__content}>
            {
              props.loading ?
                <CircularProgress color="warning" size={80} thickness={7} /> :
                props.card?.image ?
                  <img className={classes.logo} src={props.card?.image} alt="Monster" /> :
                  <div className={classes.unknown}>?</div>
            }
          </div>

          <div className={classes.meta}>
            {/* <span title={`Energy: ${props.card?.energy}`} className={`${classes.metaChip} ${classes['metaChip--energy']}`}><CgShapeRhombus /> {props.card?.energy}</span> */}
            {/* <span title={`Offense: ${props.card?.offense}`} className={`${classes.metaChip} ${classes['metaChip--battle']}`}><RiSwordLine /> {props.card?.offense}</span> */}
            {/* <span title={`Number: #${props.card?.number}`} className={`${classes.metaChip} ${classes['metaChip--number']}`}>{props.card?.number}</span> */}
          </div>

          <div className={classes.card__foot}>
            <span>{status}!</span>
          </div>
        </div>
      </Tilt>

      {/* <div className={classes['algo-cost']}>Algorithmic Cost <span className={classes.highlight}>{props.card?.cost?.toFixed(2)} USD</span></div> */}
    </div>
  );
}
