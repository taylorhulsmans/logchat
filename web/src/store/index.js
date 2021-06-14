import Vue from 'vue'
import Vuex from 'vuex'
import Web3 from 'web3'
import HashedComments from '@/assets/build/HashedComments.json'

Vue.use(Vuex)

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
    threads: [],
    myWork: [],
    thread: []

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
    },
    setThreads(state, threads) {
      console.log(threads)
      state.threads = threads
    },
    setThread(state, thread) {
      state.thread = thread
    },
    setMyWork(state, myWork) {
      state.myWork = myWork
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
    },
    async getRecentThreads({commit, state, dispatch}) {
      let contract = state.contract;
      if (!contract) {
        await dispatch('connectToBlockchain') 
        contract = state.contract
      }
      console.log(contract)
      const threadEvents = await contract.getPastEvents('Thread', {
        fromBlock: 'earliest',
        toBlock: 'latest',
      }, (err, result) => {
        if (err) {
          return err
        }
        return result
      })
      const threads = threadEvents.map((event) => {
        const {
          creator,
          id,
          url,
          title,
          content,
        } = event.returnValues
        return {
          hover: false,
          creator,
          id,
          url,
          title,
          content,
        }
      })
      commit('setThreads', threads)
      return threads
    },
    async setThread({commit, state, dispatch}, threadId) {
      let contract = state.contract;
      if (!contract) {
        await dispatch('connectToBlockchain')
        contract = state.contract
      }
      let thread = null
      await contract.getPastEvents('Thread', {
        fromBlock: 'earliest',
        toBlock: 'latest',
        filter: {id: threadId}
      }, (err, result) => {
        if (!err) {
          thread = {
            creator: result[0].returnValues.creator,
            id: result[0].returnValues.id,
            iUrl: result[0].returnValues.iUrl,
            content: result[0].returnValues.content,
            title: result[0].returnValues.title,
            url: result[0].returnValues.url
          }
        } else {
          return err
        }
      })
      let comments = null;
      await contract.getPastEvents('Comment', {
        filter: {threadId: threadId},
        fromBlock: 'earliest',
        toBlock: 'latest'
      }, (err, result) => {
        if (!err) {
          comments = result.map((event) => {
            return {
              showReplyBox: false,
              creator: event.returnValues.creator,
              id: event.returnValues.id,
              replyId: event.returnValues.replyId,
              threadId: event.returnValues.threadId,
              content: event.returnValues.content
            }
          })
        } else {
          return err
        }
      })
      commit('setThread',[thread, comments])
      return [thread, comments]
    },
  async setMyWork({commit, state, dispatch}) {
      let contract = state.contract;
      if (!contract) {
        await dispatch('connectToBlockchain')
        contract = state.contract
      }
    const account = state.account
    try {
      const myThreadEvents = await contract.getPastEvents("Thread", {
        fromBlock: 'earliest',
        toBlock: 'latest',
        filter: {creator: account}
      }, (err, result) => {
        if (err) {
          console.log(err)
          return err
        } else {
          return result
        }
      })
      const myCommentEvents = await contract.getPastEvents("Comment", {
        fromBlock: 'earliest',
        toBlock: 'latest',
        filter: {creator: account}
      }, (err, result) => {
        if (err) {
          return err
        } else {
          return result
        }
      })
      const myThreads = myThreadEvents.map((event) => {
        return {
          postType: 'Thread',
          threadId: event.returnValues.id,
          title: event.returnValues.title
        }
      })
      const myComments = myCommentEvents.map((event) => {
        return {
          postType: 'Comment',
          threadId: event.returnValues.threadId
        }
      })
      console.log(myThreads, myComments)
      commit('setMyWork', {myThreads, myComments})
      return {
        myThreads,
        myComments
      }

    } catch (e) {
      return e
    }
  },
  },
  getters: {
    getThread: (state) => {
      return state.thread
    }
  }
})
