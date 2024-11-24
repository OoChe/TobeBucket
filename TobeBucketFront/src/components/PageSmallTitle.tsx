// 각각의 페이지에 표시되는 제목 컴포넌트
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface PageTitleProps {
  title: string;
  colorCode: string;
}

interface CircleProps {
  colorCode: string;
}
const PageSmallTitle = ({title, colorCode}: PageTitleProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        {title}
      </Text>
      <Circle colorCode={colorCode} />
    </View>
  );
};

const Circle = ({colorCode}: CircleProps) => {
  return <View style={[styles.circle, {backgroundColor: colorCode}]} />;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 'auto',
    marginTop: 13,
    marginRight: 5,
    marginLeft: 15,
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
    marginLeft: 4,
    marginTop: 3
  },
  titleText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontFamily: 'Pretendard-Bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default PageSmallTitle;
