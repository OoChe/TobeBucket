import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/ChangeMyInfoScreen.styles';
import PageTitle from '../../components/PageTitle';




const ChangeMyInfoScreen = () => {
  const navigation = useNavigation();


  return (
    <View style={styles.main}>
        <Text>BucketFeed Screen</Text>
    </View>
  );
};

export default ChangeMyInfoScreen;
