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
// 제목과 오른쪽 위 포인트컬러 지정
const PageTitle = ({title, colorCode}: PageTitleProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText} numberOfLines={1}>
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
    marginTop: 10,
    marginRight: 5,
    marginLeft: 15,
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
    marginLeft: 5,
  },
  titleText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontFamily: 'Pretendard-Bold',
    fontSize: 24,
    textAlign: 'center',
  },
});

export default PageTitle;
