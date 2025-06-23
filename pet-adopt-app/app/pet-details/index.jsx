import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import {useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import PetInfo from '../../components/PetDetails/PetInfo';
import PetSubInfo from '../../components/PetDetails/PetSubInfo';
import AboutPet from '../../components/PetDetails/AboutPet';
import OwnerInfo from '../../components/PetDetails/OwnerInfo';
import Colors from '../../constants/Colors';
import { useUser } from '@clerk/clerk-expo/dist';
import { collection, getDocs, query, setDoc, where,doc } from 'firebase/firestore';
import { db } from './../../config/FirebaseConfig';


export default function PetDetails() {
    const pet=useLocalSearchParams();
    const navigation=useNavigation();
    const {user}=useUser();
    const router=useRouter();

    useEffect(()=>{
        navigation.setOptions({
            headerTransparent:true,
            headerTitle:''
        })
    },[])

    // used to initiate the chat between two users
    const InitiateChat = async () => {
      const docId1 = user?.primaryEmailAddress?.emailAddress + '_' + pet?.email;
      const docId2 = pet?.email + '_' + user?.primaryEmailAddress?.emailAddress;
    
      console.log(docId1, docId2);
    
      const q = query(collection(db, 'Chat'), where('id', 'in', [docId1, docId2]));
      const querySnapshot = await getDocs(q);
    
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        router.push({
          pathname: '/chat',
          params: { id: doc.id },
        });
      });
    
      if (querySnapshot.docs?.length === 0) {
        console.log('Creating new chat...');
    
        try {
          await setDoc(doc(db, 'Chat', docId1), {
            id: docId1,
            users: [
              {
                email: user?.primaryEmailAddress?.emailAddress,
                imageUrl: user?.imageUrl,
                name: user?.fullName,
              },
              {
                email: pet?.email,
                imageUrl: pet?.userImage,
                name: pet?.username,
              }
            ],
            userIds:[user?.primaryEmailAddress?.emailAddress,pet?.email]
          });
    
          router.push({
            pathname: '/chat',
            params: { id: docId1 },
          });
        } catch (error) {
          console.error('Error creating chat:', error);
        }
      }
    };

  return (
    <View>
      <ScrollView>
      {/* Pet info */}
      <PetInfo pet={pet}/>

      {/* Pet subinfo */}
      <PetSubInfo pet={pet}/>

      {/* about */}
      <AboutPet pet={pet} />

      {/* owner details */}
      <OwnerInfo pet={pet} />
      <View style={{
        height:70
      }}>
      </View>   
      </ScrollView>

      {/* adopt me button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
        onPress={InitiateChat}
        style={styles.adoptBtn}>
          <Text style={{
            textAlign:'center',
            fontFamily:'outfit-medium',
            fontSize:20
          }}>Adopt Me</Text>
        </TouchableOpacity>
      </View>

      
    </View>
  )
}

const styles = StyleSheet.create({
  adoptBtn:{
    padding:15,
    backgroundColor:Colors.PRIMARY
  },
  bottomContainer:{
    position:'absolute',
    width:'100%',
    bottom:0
  }
})