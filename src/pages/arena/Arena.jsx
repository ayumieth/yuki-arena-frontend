import { useEffect, useState } from 'react';

import Card from '../../components/card/Card';
import CoinSelect from '../../components/coin-select/CoinSelect';

import cards from '../../consts/cards.const';
import CardEntity from '../../entities/card.entity';

import { RiSwordFill } from 'react-icons/ri'

import classes from './Arena.module.css';
import { useSelector } from 'react-redux';
import { chooseEnemy, getContract, getWinningChance, startFight } from '../../utils/callHelpers';
import { useWalletConnect } from '../../hooks/useWalletConnect';
import { getBalanceNumber, getFullDisplayBalance } from '../../utils/formatBalance';
import { getBalance } from '../../utils/callHelpers';
import arenaBattleABI from '../../consts/arenaBattle.json';
import yukiTokenABI from '../../consts/yukiTokenABI.json';
import yukiNftABI from '../../consts/yukimentNftABI.json';
const arenaBattleAddr = '0xEEDfD05AAa9af094f268fA3172f864075ef0a5AC';
const yukiTokenAddr = '0x359ddFE514678853e1e58C6130f1F12C636E3a89';
const yukiNftAddr = '0x74c88fbFD5666c66FEFd82FE8D7F084111BfE872';

export default function Arena() {
  const { tokenID, element, power, imageURL } = useSelector((state) => state.battle);
  const { web3, account } = useWalletConnect();
  const [tokContract, nftContract, battleContract] = [
    getContract(web3, yukiTokenABI, yukiTokenAddr),
    getContract(web3, yukiNftABI, yukiNftAddr),
    getContract(web3, arenaBattleABI, arenaBattleAddr)]

  const [bet, setBet] = useState({ value: 1, coin: 'monsta' });
  const [loading, setLoading] = useState(false);
  const [maxBet, setMaxBet] = useState(1);
  const [minBet, setMinBet] = useState(1);
  const [winningChance, setWinningChance] = useState(100);
  const [fighting, setFighting] = useState(false);
  const fightingDuration = 1000;


  const [playerCard, setPlayerCard] = useState(new CardEntity({ tokenId: tokenID, name: `Yukiment ${tokenID}`, image: './assets/monsters/yukiment-wind.png', power: power, element: element }));
  const [opponentCard, setOpponentCard] = useState(new CardEntity());

  const randomizeCards = () => {
    const playerIndex = Math.round(Math.random() * (cards.length - 1));
    const opponentIndex = Math.round(Math.random() * (cards.length - 1));

    setPlayerCard(cards[playerIndex]);
    setOpponentCard(cards[opponentIndex]);
  }

  const onBetValueChange = e => {
    setBet({ ...bet, value: e });
  }

  const onBetCoinChange = e => {
    setBet({ ...bet, coin: e });
  }

  const onFight = () => {
    setFighting(true);
    startFight(battleContract, arenaBattleAddr, tokContract, account, tokenID, web3.utils.toWei(bet.value.toString(), 'ether'), setFighting);
  }

  const onSkip = () => {
    setLoading(true);
    chooseEnemy(battleContract, nftContract, account, tokenID, setLoading, setOpponentCard).catch(e => {
      setLoading(false);
    });
  }

  useEffect(() => {
    getBalance(tokContract, arenaBattleAddr).then(res => {
      setMaxBet(getBalanceNumber(res) / 10)
    })
  }, [])

  useEffect(() => {
    if (opponentCard.name !== "Unknown") {
      getWinningChance(battleContract, tokenID).then(res => {
        setWinningChance(res)
      })
    }
  }, [loading])

  return (
    <main className={`${classes.arena} ${fighting ? classes['arena--fighting'] : ''}`}>
      <div className={classes.card}>
        <Card card={playerCard} />
      </div>

      <div className={classes.board}>
        <div className={classes.title}>
          <span>Quick Battle</span>
        </div>

        <div className={classes.content}>
          <div className={classes.bet}>
            <span className={classes.label}>Your Bet :</span>
            <CoinSelect
              stepValue={0.1}
              maxValue={maxBet}
              minValue={minBet}
              onCoinChange={onBetCoinChange.bind(this)}
              onValueChange={onBetValueChange.bind(this)}
            />
          </div>

          <div className={classes.row}>
            <span>Max bet</span>
            <span className={classes.highlight}>{maxBet} ${bet.coin}</span>
          </div>

          <div className={classes.row}>
            <span>Winning chance</span>
            <span className={classes.highlight}>{winningChance} %</span>
          </div>

          <div className={classes.row}>
            <span>Prize</span>
            <span className={[classes.highlight, classes.prize].join(' ')}>{bet.value}~{2 * bet.value} ${bet.coin}</span>
          </div>
        </div>

        <div className={classes.controls}>
          <div className={classes.button} onClick={onFight}>Fight</div>
          <a className={classes.link} onClick={onSkip}>Skip</a>
        </div>
      </div>

      <div className={classes.battle}>
        <RiSwordFill />
      </div>

      <div className={classes.card}>
        <Card card={opponentCard} loading={loading} />
      </div>
    </main>
  );
}