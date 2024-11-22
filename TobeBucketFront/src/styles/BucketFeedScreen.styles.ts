import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  main: {
    minHeight: 1000,
    backgroundColor: '#FBFBFB',
  },
  subText: {
    display: 'flex',
    fontFamily: 'Pretendard-Regular',
    fontSize: 22,
    color: '#707070',
    letterSpacing: 1,
    lineHeight: 30,
    textAlign: 'center',
    marginTop: 100,
    marginBottom: 30,
  },
  smallText: {
    height: 15,
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    position: 'relative',
    textAlign: 'left',
    marginLeft: 15,
    marginTop: 5,
  },
  buttonContainer: {
    width: 150,
    height: 85,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ff8736',
    borderStyle: 'solid',
    justifyContent: 'center',
    backgroundColor: '#FBFBFB',
    elevation: 7,
  },
  buttonText: {
    display: 'flex',
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default styles;
