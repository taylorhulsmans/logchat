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

