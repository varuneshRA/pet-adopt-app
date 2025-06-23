import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection,getDocs} from 'firebase/firestore'
import {db} from './../../config/FirebaseConfig'
import Colors from './../../constants/Colors'

export default function Category({category}) {
    const [categoryList,setCategoryList]=useState([]);
    const [selectedCategory,setSelectedCatogory]=useState('Birds');

    useEffect(()=>{
        GetCategories();
    },[])
    const GetCategories=async()=>{
        setCategoryList([]);
        const snapshot=await getDocs(collection(db,'Category'));
        snapshot.forEach((doc) => {
            console.log((doc.data()))
            setCategoryList(categoryList=>[...categoryList,doc.data()])
        });
    }

  return (
    <View style={{
        marginTop:20,      
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:20
      }}>Category</Text>

      <FlatList
        data={categoryList}
        numColumns={4}
        showsHorizontalScrollIndicator={false}
        renderItem={({item,index})=>(
            <TouchableOpacity 
            onPress={()=>{
                setSelectedCatogory(item.name);
                category(item.name);
            }}
            style={{
                flex:1
            }}>
                <View style={[styles?.container,selectedCategory==item.name&&styles.selectedCategoryContainer]}>
                <Image source={{uri:item?.imageUrl}} 
                style={styles?.Image} />
                </View>
                <Text style={{
                    textAlign:'center',
                    fontFamily:'outfit'
                }}>{item?.name}</Text>
                
            </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    Image:{
        width:40,
        height:40
    },
    container:{
        backgroundColor:Colors.LIGHT_PRIMARY,
        padding:15,
        alignItems:'center',
        borderWidth:1,
        borderRadius:15,
        borderColor:Colors.PRIMARY,
        margin:5
    },
    selectedCategoryContainer:{
        backgroundColor:Colors.SECONDARY,
        borderColor:Colors.SECONDARY
    }
})
