import { useUser } from "@clerk/clerk-expo";
import { Link, Redirect, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const rootNavigationState=useRootNavigationState()
  useEffect(()=>{
    CheckNavLoaded();
  },[])
  const CheckNavLoaded=()=>{
    if(!rootNavigationState.key)
      return null;
  }

  const {user}=useUser();

  return (
    <View
      style={{
        flex: 1
      }}
    >
      {/* <Redirect href={'/(tabs)/home'}/> */}
      {user?
        <Redirect href={'/(tabs)/home'}/>
        :<Redirect href={'/login'} />}

    </View>
  );
}
