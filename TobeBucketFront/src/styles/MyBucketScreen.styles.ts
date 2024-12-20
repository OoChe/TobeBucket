import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FBFBFB',
  },
  container: {
    flexDirection: 'row',
    padding: 'auto',
    marginTop: 10,
    marginRight: 5,
    marginLeft: 15,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,
  },
  categoryContainer: {
    flexWrap: 'wrap',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  bucketListContainer: {
    flexDirection: 'column',
  },
  smallText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    color: '#707070',
    position: 'relative',
    textAlign: 'center',
    marginTop: 90,
  },
  imageStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginLeft: 145,
  },
  largeText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 24,
    position: 'relative',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 35,
  },
});

export default styles;
