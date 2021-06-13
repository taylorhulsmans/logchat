import Vue from 'vue'
import Vuex from 'vuex'
import Web3 from 'web3'
Vue.use(Vuex)
import HashedComments from '@/assets/build/HashedComments.json'

function getNetworkNameAndAddress(networkId, chainId) {
  console.log(networkId, chainId)
  switch (networkId) {
    case 1:
      if (chainId === 1) {
        const contractAddress = process.env.VUE_APP_ETHEREUM_ADDR
        return  {
          networkName: 'Ethereum',
          contractAddress,
          etherscan: `https://etherscan.io/address/${contractAddress}`
        }
      }
      if (chainId === 43114) {
        const contractAddress =  HashedComments.networks[networkId].address
        return {
          networkName: 'Avalanche',
          contractAddress,
          etherscan: `https://cchain.explorer.avax.network/address/${contractAddress}/contracts`
        }
      }
      return {
        networkName: 'Unsupported',
        contractAddress: process.env.VUE_APP_ETHEREUM_ADDR,
        etherscan: `https://etherscan.io/address/${process.env.VUE_APP_ETHEREUM_ADDR}`
      }
    case 56: {
        const contractAddress =  HashedComments.networks[networkId].address
        return {
          networkName: 'BSC (buggy)',
          contractAddress,
          etherscan: `https://bscscan.com/address/${contractAddress}`
        }
    }
    case 137: {
        const contractAddress =  HashedComments.networks[networkId].address
        return {
          networkName: 'Polygon (Matic)[buggy]',
          contractAddress,
          etherscan: `https://polygonscan.com/address/${contractAddress}`
        }
    }
    case 1337: {
        const contractAddress =  HashedComments.networks[networkId].address
        return {
          networkName: 'Ganache Dev',
          contractAddress,
          etherscan: ''
        }
    }
    case 250: {
        const contractAddress =  HashedComments.networks[networkId].address
        return {
          networkName: 'Fantom (Opera)',
          contractAddress,
          etherscan: `https://ftmscan.com/address/${contractAddress}`
        }

    }
    default:
        return {
          networkName: 'Unsupported',
          contractAddress: process.env.VUE_APP_ETHEREUM_ADDR,
          etherscan: `https://etherscan.io/address/${process.env.VUE_APP_ETHEREUM_ADDR}`
        }
  }
}

export default new Vuex.Store({
  state: {
    web3Enabled: false,
    account: '',
    networkId: '',
    chainId: '',
    networkName: '',
    contract: null,
    contractAddress: '',
    etherscan: '',

  },
  mutations: {
    setWeb3Enabled(state, newState) {
      state.web3Enabled = true
      state.account = newState.account
      state.networkId = newState.networkId
      state.chainId = newState.chainId
      state.networkName = newState.networkName
      state.contract = newState.contract
      state.contractAddress = newState.contractAddress
      state.etherscan = newState.etherscan
    }
  },
  actions: {
    async connectToBlockchain({commit}) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        })
        const account = accounts[0]
        const web3 = new Web3(window.ethereum)
        
        const networkId = await web3.eth.net.getId()
        const chainId = await web3.eth.getChainId()
        const { 
          networkName,
          contractAddress,
          etherscan
        } = getNetworkNameAndAddress(networkId, chainId)
        
        const contract = await new web3.eth.Contract(HashedComments.abi, contractAddress)
        commit('setWeb3Enabled', {
          account,
          networkId,
          chainId,
          networkName,
          contractAddress,
          contract,
          etherscan
        })
      } catch (e) {
        console.log(e)
      }

    }
  },
  modules: {
  }
})
