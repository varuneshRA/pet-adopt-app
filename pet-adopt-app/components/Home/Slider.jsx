import { View, Animated, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../config/FirebaseConfig';

export default function Slider() {
    const [sliderList, setSliderList] = useState([]);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        GetSliders();
    }, []);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [sliderList]);

    const GetSliders = async () => {
        setSliderList([]);
        const snapshot = await getDocs(collection(db, 'Sliders'));
        let sliders = [];
        snapshot.forEach((doc) => {
            sliders.push(doc.data());
        });
        setSliderList(sliders);
    };

    return (
        <View>
            <Animated.FlatList
                data={sliderList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Animated.View style={[styles.imageContainer, { opacity: fadeAnim }]}> 
                        <Image source={{ uri: item?.imageUrl }} style={styles.sliderImage} />
                    </Animated.View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        marginRight: 15,
        marginTop: 15,
    },
    sliderImage: {
        width: Dimensions.get('screen').width * 0.9,
        height: 170,
        borderRadius: 15,
    },
});
