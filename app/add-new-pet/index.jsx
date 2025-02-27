import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity, Pressable, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Colors from './../../constants/Colors'
import { Picker } from '@react-native-picker/picker';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '@clerk/clerk-expo/dist';

export default function AddNewPet() {
  const navigation= useNavigation();
  const [formData,setFormData]=useState(
    {category:'Birds',sex:'Male'}
  );
  const [gender,setGender]=useState();
  const [categoryList,setCategoryList]=useState([]);
  const [selectedCategory,setSelectedCatogory]=useState();
  const[image,setImage]=useState();
  const [loader,setLoader]=useState(false);
  const {user}=useUser();
  const router=useRouter();


  useEffect(()=>{
    navigation.setOptions({
      headerTitle:'Add New Pet'
    })
    GetCategories()
  },[])

  const GetCategories=async()=>{
    setCategoryList([]);
    const snapshot=await getDocs(collection(db,'Category'));
    snapshot.forEach((doc) => {
        console.log((doc.data()))
        setCategoryList(categoryList=>[...categoryList,doc.data()])
    });
  }

  //documentation used to pick image from gallery

  const imagePicker=async()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  const handleInputChange=(fieldName,fieldValue)=>{
    setFormData(prev=>({
      ...prev,
      [fieldName]:fieldValue
    }))
  }

  const onSubmit=()=>{
    if(Object.keys(formData).length!=9){
      ToastAndroid.show("Enter all Details",ToastAndroid.SHORT)
      return ;
    } 
    SaveFormData();
  }

  const SaveFormData=async()=>{
    setLoader(true);

    const docId=Date.now().toString();
    await setDoc(doc(db,'Pets',docId),{
      ...formData,
      username:user?.fullName,
      email:user?.primaryEmailAddress?.emailAddress,
      userImage:user?.imageUrl,
      id:docId
    })
    console.log("saved successfully")
    setLoader(false);
    router.replace('/(tabs)/home')
  }

  return (
    <ScrollView style={{
      padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:20
      }}>Add New Pet for Adoption</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet image link *</Text>
        <TextInput style={styles.input} onChangeText={(value)=>handleInputChange('imageUrl',value)}/>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Name *</Text>
        <TextInput style={styles.input} onChangeText={(value)=>handleInputChange('name',value)}/>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Category *</Text>
        <Picker
        selectedCategory={selectedCategory}
        style={styles.input}
        onValueChange={(itemValue, itemIndex) =>{
          setSelectedCatogory(itemValue);
          handleInputChange('category',itemValue)
        }}>
          {categoryList.map((category,index)=>(
            <Picker.Item key={index} label={category.name} value={category.name} />
          ))}
        
      </Picker>
    </View>
    
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Breed *</Text>
        <TextInput style={styles.input} onChangeText={(value)=>handleInputChange('breed',value)}/>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age *</Text>
        <TextInput style={styles.input} 
        keyboardType='number-pad'
        onChangeText={(value)=>handleInputChange('age',value)}/>
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender *</Text>
        <Picker
        selectedValue={gender}
        style={styles.input}
        onValueChange={(itemValue, itemIndex) =>{
          setGender(itemValue),
          handleInputChange('sex',itemValue)
        }}>
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
      </Picker>
    </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight *</Text>
        <TextInput style={styles.input} 
        keyboardType='number-pad'
        onChangeText={(value)=>handleInputChange('weight',value)}/>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address *</Text>
        <TextInput style={styles.input} onChangeText={(value)=>handleInputChange('address',value)}/>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>About *</Text>
        <TextInput style={styles.input} 
        numberOfLines={5}
        multiline={true}
        onChangeText={(value)=>handleInputChange('about',value)}/>
      </View>

      <TouchableOpacity style={styles.button} 
      disabled={loader}
      onPress={onSubmit}>
        {loader?<ActivityIndicator size={'large'} />:
        <Text style={{
          fontFamily:'outfit-medium',
          textAlign:'center',
          color:Colors.WHITE
        }}>Submit</Text>
      }
      </TouchableOpacity>


    </ScrollView>
  )
}

const styles = StyleSheet.create({
  inputContainer:{
    marginVertical:5

  },
  input:{
    padding:10,
    backgroundColor:Colors.WHITE,
    borderRadius:7,
    fontFamily:'outfit'
  },
  label:{
    marginVertical:5,
    fontFamily:'outfit'
  },
  button:{
    padding:15,
    backgroundColor:Colors.PRIMARY,
    borderRadius:7,
    marginVertical:10,
    marginBottom:50
  }
})