import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FBFBFB',
    flexGrow: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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

  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonText: {
    fontSize: 14,
    color: '#356859',
    textDecorationLine: 'underline',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#FFF',
    fontSize: 14,
    color: '#000',
  },
  mbtiLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  mbtiLinkText: {
    fontSize: 12,
    color: '#6C7278',
    marginRight: 5,
  },
  mbtiLinkButton: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6C7278',
    textDecorationLine: 'underline',
  },
  submitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#249E9E',
    borderRadius: 10,
    backgroundColor: '#FBFBFB',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#249E9E',
  },
});

export default styles;
