import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoImage: {
    width: 360,
    height: 340,
    resizeMode: 'contain'
  },

  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#707070',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    fontSize: 14,
    color: '#000',
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  eyeIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
    tintColor: '#707070',
  },

  loginButton: {
    backgroundColor: '#6096FD',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E3E3E3',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#707070',
  },
  signupButton: {
    backgroundColor: '#FB788E',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  signupButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default styles;
