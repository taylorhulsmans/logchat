import Web3 from 'web3'
import LogChat from '@/assets/build/LogChat.json'

export async function connectToBlockchain(ethereum) {
  console.log(ethereum)
  try {
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts'
    })
    
    const account = accounts[0]
    const web3 = new Web3(ethereum)
    
    const networkId = await web3.eth.net.getId()
    const chainId = await web3.eth.getChainId()
    const { 
      networkName,
      contractAddress,
      etherscan
    } = getNetworkNameAndAddress(networkId, chainId)
    
    const contract = await new web3.eth.Contract(LogChat.abi, contractAddress)
    console.log(contract)
    return {
      web3,
      account,
      contract,
      networkName,
      etherscan
    }
  } catch (e) {
    console.log(e)
  }
}

export async function createThread(
  account,
  contract,
  url,
  title,
  content
) {
try {
  return await contract.methods.createThread(
      url, 
      title,
      content,
    ).send({
      from: account,
    })
  } catch(e) {
    console.error(e)
    return e
  }
}

export async function createComment(
  account,
  contract,
  threadId,
  replyId,
  content
) {
  try {
  return await contract.methods.createComment(
    threadId,
    replyId,
    content,
  ).send({
      from: account,
    })
  } catch(e) {
    console.error(e)
    return e
  }
}

export async function getThreadByUrl(
  ethereum,
  url
) {
  const netConf = await connectToBlockchain(ethereum)
  console.log(netConf)
  await netConf.contract.once('Thread', {
    fromBlock: 'earliest',
    toBlock: 'latest',
    filter: {iUrl: netConf.web3.sha3(url)}
  }, (err, event) => {
    if (!err) {
      console.log(event)
    } else {
      console.log(err)
    }
  })

}

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
        const contractAddress =  LogChat.networks[networkId].address
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
        const contractAddress =  LogChat.networks[networkId].address
        return {
          networkName: 'BSC (buggy)',
          contractAddress,
          etherscan: `https://bscscan.com/address/${contractAddress}`
        }
    }
    case 137: {
        const contractAddress =  LogChat.networks[networkId].address
        return {
          networkName: 'Polygon (Matic)[buggy]',
          contractAddress,
          etherscan: `https://polygonscan.com/address/${contractAddress}`
        }
    }
    case 1337: {
        const contractAddress =  LogChat.networks[networkId].address
        return {
          networkName: 'Ganache Dev',
          contractAddress,
          etherscan: ''
        }
    }
    case 250: {
        const contractAddress =  LogChat.networks[networkId].address
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
