/*
 [달성 그래프 컴포넌트]
  - 파라미터
    1) data : 최근 2년 반기 별 버킷 달성 개수
 */

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const AchieveGraph = ({ data }) => {
  const sortedData = data.sort((a, b) => a.year - b.year);
  const labels = [];
  const values = [];
  const years = sortedData.map((item) => item.year);
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);

  data.forEach((item) => {
    labels.push('상반기', '하반기');
    values.push(item.first, item.second);
  });

  return (
    <View style={styles.container}>
      {/* 차트 배경 */}
      <View style={styles.chartBackground}>
        {/* 차트 */}
        <LineChart
          data={{
            labels: labels,
            datasets: [
              {
                data: values,
                color: () => '#EE4963',
              },
            ],
          }}
          width={Dimensions.get('window').width - 20}
          height={180} // Chart height
          chartConfig={{
            backgroundColor: '#EDF0FF',
            backgroundGradientFrom: '#EDF0FF',
            backgroundGradientTo: '#EDF0FF',
            fillShadowGradient: '#EE4963',
            fillShadowGradientOpacity: 0.2,
            decimalPlaces: 0,
            color: () => '#333',
            labelColor: () => '#333',
            propsForBackgroundLines: {
              strokeWidth: 2,
            },
            propsForDots: {
              r: '5',
              strokeWidth: '2',
              stroke: '#EE4963',
            },
          }}
          withDots
          withHorizontalLabels={false}
          withVerticalLines={false}
          withHorizontalLines={false}
          bezier={false}
          style={{
            borderRadius: 8,
          }}
          fromZero
        />

        {/* 연도 라벨 */}
        <View style={styles.yearLabelContainer}>
          {years.map((year, index) => (
            <Text key={index} style={styles.yearLabel}>
              {year}년
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginBottom: 20,
  },
  chartBackground: {
    backgroundColor: '#EDF0FF',
    borderRadius: 12,
    paddingVertical: 10,
    elevation: 4,
    width: Dimensions.get('window').width - 50,
  },
  yearLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 78,
  },
  yearLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007AFF',
    textAlign: 'center',
  },
});

export default AchieveGraph;
