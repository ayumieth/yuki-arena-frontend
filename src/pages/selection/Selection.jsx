import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiSwordFill } from 'react-icons/ri';
import yukimentNftABI from '../../consts/yukimentNftABI.json';
import yukiTokenABI from '../../consts/yukiTokenABI.json';
import { getBalance, getContract, getTokenURI, getTraits, getYukiment } from '../../utils/callHelpers';
import { useWalletConnect } from '../../hooks/useWalletConnect';
import { getFullDisplayBalance } from '../../utils/formatBalance';
import { setPlayer } from '../../redux/battle/battle.slice';
import classes from './Selection.module.css';
import { useDispatch } from 'react-redux';

const yukimentNftAddr = '0x74c88fbFD5666c66FEFd82FE8D7F084111BfE872';
const yukiTokenAddr = '0x359ddFE514678853e1e58C6130f1F12C636E3a89';

const YukiCard = ({ id, web3, onMint }) => {

  const [url, setUrl] = useState("")
  useEffect(() => {
    if (web3 !== null && id !== -1) {
      const contract = getContract(web3, yukimentNftABI, yukimentNftAddr);
      getTokenURI(contract, id).then(res => {
        setUrl(res.image)
      })
    }
  }, [id])

  return (
    <div className={classes['card-wrapper']}>
      <div className={classes.card}>
        <div className={classes['card__title']}>
          <span>
            {id === -1 ? 'Unknown' : `Yukiment${id}`}
          </span>
        </div>
        {id !== -1 ?
          <>
            <img className={classes['card__picture']} alt="Yukiment 1" src="./assets/monsters/yukiment-wind.png" />
            <button className={classes.button} onClick={() => onMint(id, url)}>Select</button>
          </> :
          <div className={classes.unknown}>
            ?
          </div>
        }
      </div>
    </div>
  )
}

export default function Selection() {
  const [playerYukis, setPlayerYukis] = useState([-1, -1, -1, -1]);
  const [balance, setBalance] = useState(0);
  const { web3, account, onConnect } = useWalletConnect();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onMint = async (_tokenID, _url) => {
    alert(`Selecting ${_tokenID} ...`);
    const nftContract = getContract(web3, yukimentNftABI, yukimentNftAddr);
    const [_element, _power] = await getTraits(nftContract, _tokenID);
    dispatch(setPlayer({ _tokenID, _element, _power, _url }));
    navigate('battle');
  }

  const filterAddress = () => {
    return account.slice(0, 5) + '...' + account.slice(38, 42)
  }

  const getInfo = async () => {
    const nftContract = getContract(web3, yukimentNftABI, yukimentNftAddr);
    const tokContract = getContract(web3, yukiTokenABI, yukiTokenAddr);
    setBalance(await getBalance(tokContract, account));
    setPlayerYukis(await getYukiment(nftContract, account));
  }

  useEffect(() => {
    if (account !== null) {
      getInfo();
    }
  }, [account])

  return (
    <div className={classes.selection}>
      <div className={classes.wallet}>
        <div className={classes.button}>
          Balance: {getFullDisplayBalance(balance)} Yuki
        </div>
        <div className={classes.button} onClick={onConnect}>
          {account ? filterAddress(account) : 'Connect Wallet'}
        </div>
      </div>
      <div className={classes.head}>
        <h1 className={classes.title}>Yukiments Arena</h1>
        <p className={classes.subtitle}>Fight or die!</p>
      </div>

      <div className={classes.body}>
        <div className={classes.heading}>
          <span>Select your Yukiment</span> <RiSwordFill /> <span>Choose wisely</span>
        </div>

        <div className={classes.content}>
          {playerYukis.length > 0 ? playerYukis.map((item, index) => {
            return (
              <YukiCard id={item} web3={web3} onMint={onMint} key={index} />
            )
          }) :
            <div className={classes.empty}>
              You don't have Yukiment NFT to start with.
            </div>}
        </div>
      </div>
    </div>
  )
}
