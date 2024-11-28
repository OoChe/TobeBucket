import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  main :  {
      backgroundColor: '#FBFBFB',
  },

  container: {
    flexGrow: 1,
    paddingHorizontal: 16,

  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  backButton: {
    borderRadius: 20,
    marginTop: 10
  },

  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  except: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30
  },

});

export default styles;
