import React from 'react'

export default ({eachIndMessage }) =>{
  console.log('message=>',eachIndMessage)
  console.log('name try==>',eachIndMessage.substring(0,eachIndMessage.indexOf(':')))
  let user=eachIndMessage.substring(0,eachIndMessage.indexOf(':'));
  let userMessage=eachIndMessage.substring(eachIndMessage.indexOf(':')+1)
  console.log('UserMessage in chatMessage-=>',userMessage)
  console.log('split dude=>',userMessage.split(' '))
  let splitUserMessageArr=userMessage.split(' ')

  const wordCount=(wordArr)=>{
    let newArr=[]
    for(let i=0;i<wordArr.length;i++){
        if(wordArr[i]!==""){
          newArr.push(wordArr[i])
        }
    }
    return newArr.length
  }


  return( 
     <p>
    <strong>{user}</strong>: <em>{userMessage}</em> <strong>Word-Count:{wordCount(splitUserMessageArr)}</strong> 
  </p>)
}


