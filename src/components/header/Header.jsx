import classes from './Header.module.css';

export default function Header() {
  return (
    <nav className={classes.header}>
      <div className={classes.wrapper}>
        <div
          className={classes.items}
        >
          <div className={classes.item}>
            <img className={classes.item__icon} src="./assets/icons/shop.png" alt="Shop Icon" />
            <span className={classes.item__label}>Shop</span>
          </div>

          <div className={classes.item}>
            <img className={classes.item__icon} src="./assets/icons/collection.png" alt="Collections Icon" />
            <span className={classes.item__label}>Collection</span>
          </div>

          <div className={classes.item}>
            <img className={classes.item__icon} src="./assets/icons/rewards.png" alt="Rewards Icon" />
            <span className={classes.item__label}>Rewards</span>
          </div>

          <div className={classes.item}>
            <img className={classes.item__icon} src="./assets/icons/battle.png" alt="Battle Icon" />
            <span className={classes.item__label}>Battle</span>
          </div>

          <div className={classes.item}>
            <img className={classes.item__icon} src="./assets/icons/ranking.png" alt="Ranking Icon" />
            <span className={classes.item__label}>Ranking</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
