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
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
    if (selectedDate) {
      onDateChange(selectedDate); // 선택된 날짜 전달
    }
  };

  const toggleDatePicker = () => {
    if (Platform.OS === 'android') {
      setShowPicker(true);
    } else {
      setShowPicker(!showPicker); // iOS에서만 토글 기능 사용
    }
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity style={styles.datePickerButton} onPress={toggleDatePicker}>
        <Text style={styles.dateText}>
          {date ? format(date, 'yyyy-MM-dd') : '날짜 선택'}
        </Text>
        <Text style={styles.arrow}>⌄</Text>
      </TouchableOpacity>

      {showPicker && Platform.OS === 'android' && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="calendar"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            handleDateChange(event, selectedDate);
          }}
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
    flex: 1
  },
  dateText: {
    fontSize: 16,
    color: '#6e6e6e',
    paddingHorizontal : 15
  },
  arrow: {
    fontSize: 16,
    color: '#6e6e6e',
    fontWeight : 'bold'
  },
});

export default DatePicker;
