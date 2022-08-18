import CardEntity from '../entities/card.entity'
import Web3 from 'web3'

const eventTypes = {

}

export const getBalance = async (tokenContract, address) => {
    return await tokenContract.methods.balanceOf(address).call()
}

export const getContract = (web3, abi, address) => {
    if (web3 === null) return null
    return new web3.eth.Contract(abi, address)
}

export const getYukiment = async (contract, account) => {
    return await contract.methods.walletOfOwner(account).call()
}

export const chooseEnemy = async (contract, nftContract, account, tokenID, setLoading, setOpponentCard) => {
    try {
        console.log(contract)
        const enemySelectedEvent = contract.events.allEvents({},
            function(error, event) { console.log(event)})
        .on('connected', function(subID) {
            console.log('connected: ', subID)
        })
        .on('data', function(event) {
            console.log('data: ', event)
        })
        .on('changed', function(event) {
            console.log('changed: ', event)
        })
        .on('error', function(error, receipt) {
            console.log('error: ', error, receipt )
        })
        console.log('event', enemySelectedEvent)
        // const web3 = new Web3(window.ethereum);
        // console.log(web3)
        // const logs = await web3.eth.getPastLogs({
        //     fromBlock: 16850839,
        //     toBlock: 16851021,
        //     address: '0xEEDfD05AAa9af094f268fA3172f864075ef0a5AC',
        //     topics: [web3.utils.sha3('EnemySelected(address,uint256,uint256)')]
        // });
        // console.log('logs:', logs);
        enemySelectedEvent.on('data', async function (event) {
            console.log('event', event)
            // const res = event.returnValues;
            // console.log(res._id, tokenID, res._from, account)
            // if (res._id === tokenID && res._from.toLowerCase() === account.toLowerCase()) {
            //     // const [element, power] = await getTraits(nftContract, res._eid)
            //     // setOpponentCard(new CardEntity({ tokenId: res._eid, name: `Yukiment ${res._eid}`, image: './assets/monsters/yukiment-wind.png', power: power, element: element }))
            //     console.log('event catched')
            // }
            setLoading(false)
        });
        await contract.methods.enterGame(tokenID, '100000000').send({
            from: account
        })
    } catch (e) {
        console.log("error:", e)
        setLoading(false)
    }
}

export const startFight = async (contract, contractAddr, tokContract, account, tokenID, bet, setFighting) => {
    try {
        const battleEndedEvent = contract.events.BattleEnded()
        battleEndedEvent.on('data', async function (event) {
            const res = event.returnValues;
            if (res._id === tokenID && res._from.toLowerCase() === account.toLowerCase()) {
                const isWin = res.result ? "You win" : "You lose"
                alert(isWin)
                setFighting(false)
            }
        });
        const allowance = await tokContract.methods.allowance(account, contractAddr).call()
        if (allowance < bet) {
            await tokContract.methods.approve(contractAddr, "1000000000000000000000").send({
                from: account
            })
        }
        await contract.methods.startFight(tokenID, bet).send({
            from: account
        })
    } catch (e) {
        console.log("error:", e)
        setFighting(false);
    }
}

export const claimReward = async (contract, account) => {
    await contract.methods.claimReward(account).send({
        from: account
    })
}

export const getWinningChance = async (contract, tokenID) => {
    return await contract.methods.calcWinPercent(tokenID).call()
}

export const getTraits = async (contract, tokenID) => {
    return await contract.methods.getTraitByID(tokenID).call()
}

export const getTokenURI = async (contract, tokenID) => {
    return await contract.methods.tokenURI(tokenID).call()
}