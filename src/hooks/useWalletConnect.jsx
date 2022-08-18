import Web3 from 'web3'
import { useSelector, useDispatch } from 'react-redux'
import { setConnection, setAccountChanged, setChainChanged } from '../redux/wallet/wallet.slice'

export const useWalletConnect = () => {
    const dispatch = useDispatch()
    const web3 = useSelector((state) => state.wallet.web3)
    const account = useSelector((state) => state.wallet.account)

    const handleConnect = async () => {
        try {
            const res = await window.ethereum.request({
                method: "eth_requestAccounts"
            })
            const _web3 = new Web3(window.ethereum)
            const _provider = _web3.currentProvider
            const _account = res[0]
            const _chainId = await _web3.eth.getChainId()
            dispatch(setConnection({ _web3, _provider, _account, _chainId }))
            handleProviderChanged(_provider)
        } catch (e) {
            console.log("error:", e)
            alert("Please connect metamask")
        }
    }

    const handleProviderChanged = (_provider) => {
        _provider.on('accountsChanged', function (accounts) {
            dispatch(setAccountChanged(accounts[0]))
        })

        _provider.on('chainChanged', function (networkId) {
            dispatch(setChainChanged(networkId))
        })
    }

    return { web3: web3, account: account, onConnect: handleConnect }
}