import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  StyleSheet,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import axios from 'axios';
import {AlarmList} from '../data/tempBucketData';
import PageTitle from '../components/PageTitle';

const AlarmScreen = () => {
  const [alarmList, setAlarmList] = useState([]);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  // 알림 데이터 가져오기
  useEffect(() => {
    fetchAlarms();
  }, []);

  const fetchAlarms = async () => {
    // try {
    //   const response = await axios.get('YOUR_API_ENDPOINT');
    //   if (response.status === 200) {
    //     setAlarmList(response.data.alarmList);
    //   }
    // } catch (error) {
    //   console.error('Error fetching alarms:', error);
    // }
    setAlarmList(AlarmList);
  };
  // 모든 알람 읽음 처리 함수
  const handleReadAll = () => {
    setAlarmList(prev => prev.map(alarm => ({...alarm, readStatus: 1})));
    Alert.alert('모든 알림이 읽음 처리되었습니다.');
  };

  // 삭제 모드 활성화
  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
    renderAlarm(AlarmList);
    setSelectedIds([]); // 선택 초기화
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      Alert.alert('선택된 알림이 없습니다.');
      return;
    }

    Alert.alert(
      '삭제 확인',
      '선택한 알림을 삭제하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: () => {
            setAlarmList(prev =>
              prev.filter(alarm => !selectedIds.includes(alarm.alarmId)),
            );
            setSelectedIds([]);
            setDeleteMode(false);
          },
        },
      ],
      {cancelable: true},
    );
  };

  const toggleSelection = (alarmId: string, isChecked: boolean) => {
    setSelectedIds(prev => {
      if (isChecked) {
        return [...prev, alarmId]; // 체크박스 선택 시 추가
      } else {
        return prev.filter(id => id !== alarmId); // 체크 해제 시 제거
      }
    });
  };

  // 알림 렌더링
  const renderAlarm = ({item}) => (
    <View
      style={[
        styles.alarmItem,
        {backgroundColor: item.readStatus === 0 ? '#FBDDDD' : '#E6E6E6'},
      ]}>
      <View style={styles.alarmContent}>
        <View style={{flexDirection: 'row'}}>
          {deleteMode && (
            <BouncyCheckbox
              size={25}
              fillColor="#FF6B6B"
              iconStyle={{borderColor: '#FF6B6B', borderRadius: 15}}
              onPress={isChecked =>
                toggleSelection(item.alarmId, isChecked || false)
              }
            />
          )}
          <View>
            <Text style={styles.date}>{item.receiveDate}</Text>
            <Text style={styles.content}>{item.alarmContent}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <PageTitle title="알림" colorCode="#F390A0" />
      <View style={styles.header}>
        {!deleteMode ? (
          <TouchableOpacity onPress={handleReadAll} style={styles.buttonBorder}>
            <Text style={styles.buttonBorderText}>전체 읽기</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setDeleteMode(true)}
            style={styles.buttonBorder}>
            <Text style={styles.buttonBorderText}>전체 삭제</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={!deleteMode ? toggleDeleteMode : handleDeleteSelected}
          style={styles.buttonColor}>
          <Text style={styles.buttonColorText}>삭제</Text>
        </TouchableOpacity>
      </View>
      {!deleteMode ? (
        <FlatList
          data={alarmList}
          keyExtractor={item => item.alarmId.toString()}
          renderItem={renderAlarm}
        />
      ) : (
        <FlatList
          data={alarmList}
          keyExtractor={item => item.alarmId}
          renderItem={renderAlarm}
        />
      )}
    </View>
  );
};

export default AlarmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginLeft: '46%',
    backgroundColor: '#FFF',
  },
  buttonColor: {
    width: 80,
    height: 35,
    justifyContent: 'center',
    backgroundColor: '#EE4963',
    borderRadius: 15,
  },
  buttonBorder: {
    width: 100,
    height: 35,
    justifyContent: 'center',
    borderColor: '#EE4963',
    borderWidth: 1,
    borderRadius: 15,
  },
  buttonColorText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonBorderText: {
    color: '#EE4963',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  alarmItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  alarmContent: {},
  date: {
    fontSize: 12,
    color: '#888',
  },
  content: {
    fontSize: 14,
  },
});
