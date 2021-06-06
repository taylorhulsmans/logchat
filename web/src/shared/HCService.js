import HashedComments from '@/assets/build/HashedComments.json'
import Web3 from 'web3'

export async function getInstance() {
  try {
    const web3 = new Web3(window.ethereum)
    const networkId = await web3.eth.net.getId() 
    return await new web3.eth.Contract(HashedComments.abi, HashedComments.networks[networkId].address)
  } catch (e) {
    return e
  }
}

export async function getContractAddr() {
  const web3 = new Web3(window.ethereum)
  const networkId = await web3.eth.net.getId()
  return HashedComments.networks[networkId].address
}
export function getBytes32FromString(str) {
  try {
    const web3 = new Web3(window.ethereum)
    return web3.utils.asciiToHex(str)
  } catch (e) {
    return e
  }
}

export async function requestAccounts() {
  try {
    return await window.ethereum.request({
      method: 'eth_requestAccounts'
    })
  } catch (e) {
    return e
  }
}

export async function getAccounts() {
  try {
    return await window.ethereum.request({
      method: 'eth_accounts'
    })
  } catch (e) {
    return await requestAccounts()
  }
}

export async function createThread(
  url,
  title,
  content
) {
  const addresses = await getAccounts()
  const instance = await getInstance()
try {
  return await instance.methods.createThread(
      url, 
      title,
      content,
    ).send({
      from: addresses[0],
    })
  } catch(e) {
    console.error(e)
    return e
  }
}

export async function subscribeToThread(threadId) {
  const contract = await getInstance()
  return await contract.events.Comment({
    fromBlock: 'earliest',
    filter: {threadId: threadId}
  }, function (err, result) {
    console.log('every eve', result)
  })
    .on("connected", function(subscriptionId) {
      console.log('subid', subscriptionId)
    })
    .on("data", function(event) {
      console.log('data',event)
    })
    .on("changed", function(event) {
      console.log('changed', event)
    })
    .on("error", function(error, receipt) {
      console.log('error', error, receipt)
    })
}

export async function getThreads() {
  const contract = await getInstance();
  const threadEvents = await contract.getPastEvents('Thread', {
    fromBlock: 'earliest',
    toBlock: 'latest',
  }, (err, result) => {
    if (err) {
      return err
    }
    return result
  })
  return threadEvents.map((event) => {
    const {
      creator,
      id,
      url,
      title,
      content,
    } = event.returnValues
    return {
      creator,
      id,
      url,
      title,
      content,
    }
  })
}

export async function getThread(threadId) {
  const contract = await getInstance();
  let thread = null
  await contract.getPastEvents('Thread', {
    fromBlock: 'earliest',
    toBlock: 'latest',
    filter: {id: threadId}
  }, (err, result) => {
    if (!err) {
      console.log(result)
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
  return [thread, comments]
}

  /*
export async function addThread(
  title,
  text,
  pictureLink
) {
  const addresses = await getAccounts()
  const instance = await getInstance()
  title = title ? title : ''
  text = text ? text : ''
  pictureLink = pictureLink ? pictureLink : ''
try {
  return await instance.methods.createThread(
      title,
      text,
      pictureLink
    ).send({
      from: addresses[0],
    })
  } catch(e) {
    console.error(e)
    return e
  }
}
*/


export async function createComment(
  threadId,
  replyId,
  content
) {
  const addresses = await getAccounts()
  const instance = await getInstance()
  
  try {
    console.log(threadId)
    console.log(replyId)
  return await instance.methods.createComment(
    threadId,
    replyId,
    content,
  ).send({
      from: addresses[0],
    })
  } catch(e) {
    console.error(e)
    return e
  }
}

export async function getMyWork() {
  const addresses = await getAccounts()
  const contract = await getInstance()
  try {
    console.log(addresses[0])
    const myThreadEvents = await contract.getPastEvents("Thread", {
      fromBlock: 'earliest',
      toBlock: 'latest',
      filter: {creator: addresses[0]}
    }, (err, result) => {
      if (err) {
        console.log(err)
        return err
      } else {
        console.log(result)
        return result
      }
    })
    const myCommentEvents = await contract.getPastEvents("Comment", {
      fromBlock: 'earliest',
      toBlock: 'latest',
      filter: {creator: addresses[0]}
    }, (err, result) => {
      if (err) {
        return err
      } else {
        return result
      }
    })
    const myThreads = myThreadEvents.map((event) => {
      console.log(event)
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
    return {
      myThreads,
      myComments
    }

  } catch (e) {
    return e
  }
}
