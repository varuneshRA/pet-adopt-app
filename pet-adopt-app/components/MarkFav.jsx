import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Shared from './../Shared/Shared'
import { useUser } from '@clerk/clerk-expo';

export default function MarkFav({pet,color='black'}) {
    const { user } = useUser();
    const [favList, setFavList] = useState();

    useEffect(() => {
        user && GetFav();
    }, [user])

    const GetFav = async () => {
        const result = await Shared.GetFavList(user)
        console.log(result);
        setFavList(result?.favorites ? result.favorites : [])
    }

    const AddToFav=async()=>{
        const favResult=favList;
        favResult.push(pet?.id)
        await Shared.UpdateFav(user,favResult)
        GetFav();
    }

    const removeFromFav=async()=>{
        const favResult=favList.filter(item=>item!=pet.id);
        await Shared.UpdateFav(user,favResult)
        GetFav();
    }

    return (
        <View>
        {favList?.includes(pet.id) ?
        <Pressable onPress={removeFromFav}>
            <FontAwesome name="heart" size={24} color="red" />
        </Pressable> :
        <Pressable onPress={()=>AddToFav()}>
            <FontAwesome name="heart-o" size={24} color={color} />
        </Pressable> }
        </View>
    )
}