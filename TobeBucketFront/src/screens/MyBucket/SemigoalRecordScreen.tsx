/* [ 중간 목표 달성 기록 화면 ]
 */
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PageSmallTitle from '../../components/PageSmallTitle';

const SemigoalRecordScreen = ({bucketInfo, setBucketInfo, sendDataToDB}) => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <Text>SemiGoal Achieve</Text>
    </ScrollView>
  );
};

export default SemigoalRecordScreen;