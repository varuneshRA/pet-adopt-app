import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Category from './Category'
import { collection, getDocs, query, where } from 'firebase/firestore'
import PetListItem from './PetListItem';
import {db} from './../../config/FirebaseConfig'

export default function PetListByCategory() {

  const[petList,setPetList]=useState([]);
  const [loader,setLoader]=useState(false);

  useEffect(()=>{
    GetPetList('Birds')
  },[])


  const GetPetList=async(category)=>{
    setLoader(true);
    setPetList([]);
    console.log(category)
    const q = query(collection(db, 'Pets'), where('category', '==', category));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc=>{
      console.log(doc.data())
      setPetList(petList=>[...petList,doc.data()]) 
    })
    setLoader(false)
  }
  return (
    <View>
      <Category category={(value)=>GetPetList(value)}/>
      <FlatList
      style={{
        marginTop:15
      }}
        data={petList}
        horizontal={true}
        refreshing={loader}
        onRefresh={()=>GetPetList('Birds')}
        renderItem={({item,index})=>(
          <PetListItem pet={item} />
        )}
      />

    </View>
  )
}
