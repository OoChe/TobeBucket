/* [ 버킷리스트 상세 정보 옵션 드롭다운 컴포넌트]
 */
import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import dots from '../assets/icons/coldots.png';
import {deleteBucket} from '../apis/bucket/bucketService';

interface DetailProps {
  bucketId: number;
  bucketName: string;
  handleEditBucket: () => void;
}

const BucketDetailDropdown = ({
  bucketId,
  bucketName,
  handleEditBucket,
}: DetailProps) => {
  const navigation = useNavigation();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  const handleAchievementRecord = () => {
    navigation.navigate('AchievementRecord', {
      bucketId: bucketId,
      bucketName: bucketName,
    });
  };
  const handleDelete = async () => {
    try {
      const response = await deleteBucket(bucketId);
      console.log('Delete response:', response); // 디버깅용 로그
      if (response?.code === 'SU') {
        Alert.alert('삭제 완료', '버킷이 성공적으로 삭제되었습니다.');
        navigation.navigate('MyBucketList');
      } else {
        Alert.alert('삭제 실패', '삭제에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error deleting bucket:', error);
      Alert.alert('오류 발생', '삭제 중 문제가 발생했습니다.');
    }
  };

  const handleDeleteBucket = () => {
    Alert.alert(
      '삭제 확인',
      '정말로 이 버킷을 삭제하시겠습니까?',
      [
        {text: '취소', style: 'cancel'},
        {text: '삭제', onPress: handleDelete}, // 함수 분리
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={{position: 'relative'}}>
      <TouchableOpacity onPress={toggleDropdown}>
        <Image source={dots} style={{marginLeft: 120}} />
      </TouchableOpacity>

      {isDropdownVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity onPress={() => handleAchievementRecord()}>
            <Text style={styles.optionText}>달성 기록하기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleEditBucket()}>
            <Text style={styles.optionText}>수정하기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteBucket()}>
            <Text style={styles.optionText}>삭제하기</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    top: 30,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1,
    padding: 5,
  },
  optionText: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 14,
    color: '#333',
  },
});

export default BucketDetailDropdown;
