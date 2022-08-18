import BigNumber from 'bignumber.js'

export const getBalanceNumber = (balance, decimals = 18) => {
    console.log(balance)
    const displayBalance = new BigNumber(balance).dividedBy(new BigNumber(10).pow(decimals))
    return displayBalance.toNumber()
}

export const getFullDisplayBalance = (balance, decimals = 18) => {
    return new BigNumber(balance).dividedBy(new BigNumber(10).pow(decimals)).toFixed()
}