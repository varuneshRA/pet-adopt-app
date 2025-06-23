import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import {addDoc, collection, doc, getDoc, onSnapshot, query, orderBy } from 'firebase/firestore'; 
import { db } from './../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { GiftedChat } from 'react-native-gifted-chat'
import moment from 'moment'; // Make sure moment is installed: npm install moment

export default function ChatScreen() {
  const params=useLocalSearchParams();
  const navigation=useNavigation();
  console.log(params);
  const {user}=useUser();
  const [messages, setMessages] = useState([])

  useEffect(()=>{
    GetUserDetails();

    // Create a query to order messages by createdAt in descending order
    // Firebase will sort these strings lexicographically, which works for this format.
    const q = query(collection(db,'Chat',params?.id,'Messages'), orderBy('createdAt', 'desc'));

    const unsubscribe=onSnapshot(q,(snapshot)=>{ 
      const messageData=snapshot.docs.map((doc)=>({
        _id:doc.id,
        ...doc.data(),
        // Convert the string 'createdAt' back to a Date object for GiftedChat
        createdAt: moment(doc.data().createdAt, 'YYYY-MM-DD HH:mm:ss').toDate() 
      }))
      setMessages(messageData)
    });
    return ()=>unsubscribe();
  },[])

  const GetUserDetails=async()=>{
    const docRef=doc(db,"Chat",params?.id);
    const docSnap=await getDoc(docRef);

    const result=docSnap.data();
    console.log(result);
    const otherUser=result?.users.filter(item=>item.email!=user?.primaryEmailAddress?.emailAddress)
    console.log(otherUser);
    navigation.setOptions({
      headerTitle:otherUser[0].name
    })
  }

  const onSend=async(newMessage)=>{
    // GiftedChat's append already handles adding new messages to the beginning
    setMessages((previousMessage)=>GiftedChat.append(previousMessage,newMessage)); 
    
    // Format the createdAt time as a string before sending to Firebase
    newMessage[0].createdAt=moment().format('YYYY-MM-DD HH:mm:ss'); 
    
    await addDoc(collection(db,'Chat',params?.id,'Messages'),newMessage[0])
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      showUserAvatar={true}
      user={{
        _id: user?.primaryEmailAddress?.emailAddress,
        name:user?.fullName,
        avatar:user?.imageUrl
      }}
    />
  )
}