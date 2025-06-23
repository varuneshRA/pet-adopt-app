import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import UserItem from '../../components/Inbox/UserItem';
import Colors from '../../constants/Colors';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function Inbox() {
  const { user } = useUser();
  const [userList, setUserList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    user && GetUserList();
  }, [user]);

  // Get user list based on current user's email
  const GetUserList = async () => {
    setLoader(true);
    setUserList([]); // Reset list
    const q = query(collection(db, 'Chat'), where('userIds', 'array-contains', user?.primaryEmailAddress?.emailAddress));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setUserList((prevList) => [...prevList, doc.data()]);
    });
    setLoader(false);
  };

  // Filter the list to show only the other user
  const MapOtherUserList = () => {
    const list = [];
    userList.forEach((record) => {
      const otherUser = record.users?.filter(u => u?.email !== user?.primaryEmailAddress?.emailAddress);
      if (otherUser.length > 0) {
        const result = {
          docId: record.id,
          ...otherUser[0]
        };
        list.push(result);
      }
    });
    return list;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inbox</Text>

      <FlatList
        data={MapOtherUserList()}
        refreshing={loader}
        onRefresh={GetUserList}
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInUp.delay(index * 100).duration(500)} style={styles.itemContainer}>
            <UserItem userInfo={item} />
          </Animated.View>
        )}
        keyExtractor={(item) => item.docId}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontFamily: 'outfit-medium',
    fontSize: 30,
  },
  list: {
    marginTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  separator: {
    height: 15,
  },
});
