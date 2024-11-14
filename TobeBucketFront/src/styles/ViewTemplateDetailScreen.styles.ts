import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FBFBFB',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#6A82FF',
    marginRight: 10,
  },
  backButtonText: {
    color: '#6A82FF',
    fontSize: 16,
  },
  submitButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#707070',
  },
  submitButtonText: {
    color: '#707070',
    fontSize: 16,
  },
});

export default styles;
