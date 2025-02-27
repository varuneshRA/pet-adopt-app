import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';
import MarkFav from './../../components/MarkFav';
import Animated, { FadeInUp, ZoomIn, ZoomOut } from 'react-native-reanimated';

export default function PetListItem({ pet, index }) {
  const router = useRouter();

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 100).duration(500)} // Fade-in & zoom-in effect
      exiting={ZoomOut.duration(300)} // Smooth exit animation
    >
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: '/pet-details',
            params: pet
          });
        }}
        activeOpacity={0.8}
        style={{
          padding: 10,
          marginRight: 15,
          backgroundColor: Colors.WHITE,
          borderRadius: 10,
          transform: [{ scale: 1 }]
        }}
      >
        <View
          style={{
            position: 'absolute',
            zIndex: 10,
            right: 10,
            top: 10
          }}
        >
          <MarkFav pet={pet} color={'white'} />
        </View>
        <Image
          source={{ uri: pet?.imageUrl }}
          style={{
            width: 150,
            height: 135,
            objectFit: 'cover',
            borderRadius: 10
          }}
        />
        <Text
          style={{
            fontFamily: 'outfit-medium',
            fontSize: 18
          }}
        >
          {pet?.name}
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              color: Colors.GRAY,
              fontFamily: 'outfit'
            }}
          >
            {pet?.breed}
          </Text>
          <Text
            style={{
              fontFamily: 'outfit',
              color: Colors.PRIMARY,
              paddingHorizontal: 7,
              borderRadius: 10,
              fontSize: 11,
              backgroundColor: Colors.LIGHT_PRIMARY
            }}
          >
            {pet.age} YRS
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
