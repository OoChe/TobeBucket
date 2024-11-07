import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 'auto',
    marginTop: 10,
    marginRight: 5,
    marginLeft: 15,
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
    color: '#000000',
    position: 'relative',
    textAlign: 'center',
    marginBottom: 15,
  },
});

export default styles;
