// components/DatePicker.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

interface DatePickerProps {
  label?: string;
  onDateChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ label, onDateChange }) => {
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
      onDateChange(selectedDate); // 선택된 날짜 전달
    }
  };

  const toggleDatePicker = () => {
    setShowPicker(true);
  };

  // 최소 날짜를 오늘 날짜로 설정
  const minimumDate = new Date();
  minimumDate.setHours(0, 0, 0, 0); // 자정으로 설정하여 시간 부분 제거

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity style={styles.datePickerButton} onPress={toggleDatePicker}>
        <Text style={styles.dateText}>
          {date ? format(date, 'yyyy-MM-dd') : '날짜 선택'}
        </Text>
        <Text style={styles.arrow}>⌄</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="calendar"
          onChange={handleDateChange}
          minimumDate={minimumDate} // 여기서 최소 날짜 설정
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: '#6e6e6e',
    marginBottom: 5,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 8,
    flex: 1,
  },
  dateText: {
    fontSize: 16,
    color: '#6e6e6e',
    paddingHorizontal: 15,
  },
  arrow: {
    fontSize: 16,
    color: '#EE4963',
    fontWeight: 'bold',
  },
});

export default DatePicker;
