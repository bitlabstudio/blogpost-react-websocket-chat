import React from 'react'

export default ({message }) =>{
  console.log('message=>',message)
  console.log('name try==>',message.substring(0,message.indexOf(':')))
  let user=message.substring(0,message.indexOf(':'));
  let userMessage=message.substring(message.indexOf(':')+1)
  let wordCount=userMessage.split(' ').length-1


  return( 
     <p>
    <strong>{user}</strong>: <em>{message}</em> <strong>Word-Count:{wordCount}</strong> 
  </p>)
}


