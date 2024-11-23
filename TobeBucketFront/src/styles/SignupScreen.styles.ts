import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // 배경 이미지가 전체 화면에 맞게 조정
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00000',
  },
  subHeader: {
    fontSize: 14,
    color: '#00000',
    marginTop: 8,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#707070',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    height: 53,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  picker: {
    height: 53,
    color: '#707070',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  eyeIcon: {
    width: 20,
    height: 20,
    tintColor: '#A3A3A3',
  },
  mbtiLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -8,
    marginBottom: 16,
  },
  mbtiText: {
    fontSize: 12,
    color: '#A3A3A3',
  },
  mbtiLink: {
    fontSize: 12,
    color: '#6A82FF',
    marginLeft: 4,
    textDecorationLine: 'underline',
  },
  signupButton: {
    backgroundColor: '#EE4963',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  loginLinkText: {
    fontSize: 14,
    color: '#A3A3A3',
  },
  loginLink: {
    fontSize: 14,
    color: '#6A82FF',
    marginLeft: 4,
    textDecorationLine: 'underline',
  },
});

export default styles;
