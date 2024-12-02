import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: '#FBFBFB',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    marginTop: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 25,
    fontFamily: 'PaytoneOne-Regular',
  },
  bellIcon: {
    width: 24,
    height: 24,
  },
});

export default styles;
