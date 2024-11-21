import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const AchieveGraph = ({ data }) => {
  // Extract data for the chart
  const labels = [];
  const values = [];
  const years = data.map((item) => item.year);

  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);

  data.forEach((item) => {
    labels.push('상반기', '하반기');
    values.push(item.first, item.second);
  });

  return (
    <View style={styles.container}>
      {/* Chart Background */}
      <View style={styles.chartBackground}>
        {/* Line Chart */}
        <LineChart
          data={{
            labels: labels,
            datasets: [
              {
                data: values,
                color: () => '#EE4963', // Line color
              },
            ],
          }}
          width={Dimensions.get('window').width - 20} // Chart width
          height={180} // Chart height
          chartConfig={{
            backgroundColor: '#EDF0FF', // Make the chart's main background transparent
            backgroundGradientFrom: '#EDF0FF', // Start of gradient is transparent
            backgroundGradientTo: '#EDF0FF', // End of gradient is transparent
            fillShadowGradient: '#EE4963', // Gradient fill under the line
            fillShadowGradientOpacity: 0.2, // Light fill opacity
            decimalPlaces: 0, // No decimals in values
            color: () => '#333', // Line and axis color
            labelColor: () => '#333', // Label text color
            propsForBackgroundLines: {
              strokeWidth: 2, // Remove grid lines
            },
            propsForDots: {
              r: '5', // Dot size
              strokeWidth: '2',
              stroke: '#EE4963', // Dot stroke color
            },
          }}
          withDots
          withHorizontalLabels={false} // Remove horizontal axis labels
          withVerticalLines={false} // Remove vertical grid lines
          withHorizontalLines={false} // Remove horizontal grid lines
          bezier={false} // Use straight lines
          style={{
            borderRadius: 8,
          }}
          fromZero
        />

        {/* Year Labels */}
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
    elevation: 4, // For Android shadow
    width: Dimensions.get('window').width - 50, // Match chart width
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
