import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function OwnerInfo({pet}) {
  return (
    <View style={styles.container}>
        <View style={{
            display:'flex',
            flexDirection:'row',
            gap:20
        }}>
        <Image source={{uri:pet?.userImage}} 
        style={{
            width:50,
            height:50,
            borderRadius:99
        }}/>
        <View>
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize:17
            }}>{pet?.name}</Text>
            <Text style={{
                fontFamily:'outfit',
                color:Colors.GRAY
            }}>Pet Owner</Text>
        </View>      
        </View>
        <FontAwesome name="send" size={24} color={Colors.PRIMARY} />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20,
        paddingHorizontal:20,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:20,
        borderWidth:1,
        borderRadius:15,
        borderColor:Colors.PRIMARY,
        padding:20,
        backgroundColor:Colors.WHITE,
        justifyContent:'space-between'
    }
    
})