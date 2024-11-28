import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FBFBFB',
    flex: 1,
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
  nobucket: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 20,
    position: 'relative',
    textAlign: 'center',
    marginLeft: 15,
    marginTop: 120,
  },
});

export default styles;
