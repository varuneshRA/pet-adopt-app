import { View, Text, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import Colors from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp, Layout } from 'react-native-reanimated';

export default function Profile() {
  const Menu = [
    { id: 1, name: 'Add New Pet', icon: 'add-circle', path: '/add-new-pet' },
    { id: 5, name: 'My Post', icon: 'bookmark', path: '/user-post' },
    { id: 2, name: 'Favorites', icon: 'heart', path: '/(tabs)/favorite' },
    { id: 3, name: 'Inbox', icon: 'chatbubble', path: '/(tabs)/inbox' },
    { id: 4, name: 'Logout', icon: 'exit', path: 'logout' },
  ];

  const { user } = useUser();
  const router = useRouter();
  const { signOut } = useAuth();

  // Handle menu click
  const onPressMenu = (menu) => {
    if (menu.path === 'logout') {
      Alert.alert(
        "Confirm Logout",
        "Are you sure you want to log out?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Logout", style: "destructive", onPress: () => signOut() },
        ]
      );
      return;
    }
    router.push(menu.path);
  };

  return (
    <Animated.View entering={FadeInUp.duration(400)} style={{ flex: 1, padding: 20, backgroundColor: Colors.BG }}>
      <Text style={{ fontFamily: 'outfit-medium', fontSize: 30 }}>Profile</Text>

      {/* Profile Header */}
      <Animated.View entering={FadeIn.delay(200)} style={{ alignItems: 'center', marginVertical: 25 }}>
        <Image 
          source={{ uri: user?.imageUrl }} 
          style={{ width: 90, height: 90, borderRadius: 99, borderWidth: 2, borderColor: Colors.PRIMARY }}
        />
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 20, marginTop: 6 }}>{user?.fullName}</Text>
        <Text style={{ fontFamily: 'outfit', fontSize: 16, color: Colors.GRAY }}>
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </Animated.View>

      {/* Menu List */}
      <FlatList
        data={Menu}
        keyExtractor={(item) => item.id.toString()} // Ensure unique keys
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInUp.delay(index * 100)} layout={Layout}>
            <TouchableOpacity
              onPress={() => onPressMenu(item)}
              activeOpacity={0.8}
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                backgroundColor: Colors.WHITE,
                padding: 15,
                borderRadius: 12,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.15,
                shadowRadius: 4,
                elevation: 5, // For Android shadow
              }}
            >
              <Ionicons 
                name={item?.icon} 
                size={28} 
                color={Colors.PRIMARY}
                style={{
                  padding: 12,
                  backgroundColor: Colors.LIGHT_PRIMARY,
                  borderRadius: 12,
                }} 
              />
              <Text style={{ fontFamily: 'outfit', fontSize: 20 }}>{item?.name}</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    </Animated.View>
  );
}
