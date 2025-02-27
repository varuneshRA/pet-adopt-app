import { View, Text, FlatList, Pressable, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import {collection, deleteDoc, doc, getDocs, query, where} from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';
import PetListItem from './../../components/Home/PetListItem'
import { db } from './../../config/FirebaseConfig';
import Colors from '../../constants/Colors';

export default function UserPost() {
    const navigation=useNavigation();
    const {user}=useUser();
    const [userPostList,setUserPostList]=useState([]);
    const [loader,setLoader]=useState(false);

    useEffect(()=>{
        navigation.setOptions({
            headerTitle:'User Post'
        })
        user && GetUserPost();
    },[user]);


   //used to get user post
    const GetUserPost=async()=>{
        setLoader(true);
        setUserPostList([]);
        const q=query(collection(db,'Pets'),where('email','==',user?.primaryEmailAddress?.emailAddress));
        const querySnapshot=await getDocs(q);
        
        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
            setUserPostList(prev=>[...prev,doc.data()])
        })
        setLoader(false);
    }

    const OnDeletePost=(docId)=>{
        Alert.alert('Do You Want to Delete?','Do You Really want to delete this post',[{
            text:'Cancel',
            onPress:()=>console.log("Cancel click"),
            style:'cancel'
        },
        {
            text:'Delete',
            onPress:()=>deletePost(docId)
        }
    ])

    }

    const deletePost=async(docId)=>{
        await deleteDoc(doc(db,'Pets',docId));
        GetUserPost();
    }

  return (
    <View style={{
        padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:30,
        marginBottom:15
      }}>UserPost</Text>
      <FlatList 
        data={userPostList}
        numColumns={2}
        refreshing={loader}
        onRefresh={GetUserPost}
        renderItem={({item,index})=>(
            <View>
            <PetListItem pet={item} key={index} />
            <Pressable onPress={()=>OnDeletePost(item?.id)} style={styles.deleteButton}>
                <Text style={{
                    fontFamily:'outfit',
                    textAlign:'center'
                }}>Delete</Text>
            </Pressable>
            </View>
        )}
      />

      {userPostList?.length==0 && <Text style={{
        fontFamily:'outfit-medium',
        fontSize:20,
        marginTop:40,
        textAlign:'center'
      }}>No Post Found </Text> }
    </View>
  )
}

const styles = StyleSheet.create({
    deleteButton:{
        backgroundColor:Colors.LIGHT_PRIMARY,
        padding:5,
        borderRadius:7,
        marginTop:5,
        marginRight:10
        

    }
})