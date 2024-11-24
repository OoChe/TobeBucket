import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FBFBFB',
  },

  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    backgroundColor: '#FBFBFB',
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  subTitle: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },

  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },

  goalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
  },

  removeButton: {
    width: 24, // 버튼의 너비와 높이를 동일하게 설정
    height: 24,
    backgroundColor: '#EE4963',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12, // 버튼 크기의 절반으로 설정하여 동그랗게 만듦
    marginRight: 8,
    fontWeight: 'bold',
  },

  removeButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  goalInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#f9f9f9',
  },

  addButton: {
    backgroundColor: '#EEE',
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 4,
    margin: 8,
  },

  addButtonText: {
    color: '#000000',
    fontSize: 16,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  backButton: {
    backgroundColor: '#FBFBFB', // 뒤로 가기 버튼 색상
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
    borderColor: '#707070',
    borderWidth: 2,
  },

  backButtonText: {
    color: '#333', // 뒤로 가기 버튼 텍스트 색상
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#EE4963', // 작성 완료 버튼 색상
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff', // 작성 완료 버튼 텍스트 색상
    fontSize: 16,
    fontWeight: 'bold',
  },

  dateSectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  dateLabel: {
    fontSize: 16,
    color: '#6e6e6e',
    marginRight: 10,
  },

  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 8,
    width: '100%', // 버튼의 너비를 더 넓게 설정
  },

  friendTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  friendTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FBFBFB',
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
    borderColor: '#EE4963',
    borderWidth: 1,
  },
  friendTagText: {
    color: '#333',
    fontSize: 14,
    marginRight: 6,
  },
  removeTagButton: {
    borderRadius: 10,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeTagText: {
    color: '#EE4963',
    fontSize: 15,
    fontWeight: 'bold',
  },

  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  picker: {
    flex: 1,
    marginRight: 8,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  friendItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedFriendItem: {
    backgroundColor: '#EEE',
  },
  friendItemText: {
    fontSize: 16,
  },

  confirmButton: {
    backgroundColor: '#EE4963',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },

  subTitle: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 16,
  },
  templateContainer: {
    backgroundColor: 'rgba(251, 221, 221, 0.42)',
    padding: 16,
    borderRadius: 12,
  },
  templateText: {
    color: '#000000',
    fontSize: 16,
    marginBottom: 8,
  },
  templateButton: {
    marginTop: 5,
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#EE4963',
    alignSelf: 'flex-end',
  },
  templateButtonText: {
    color: '#EE4963',
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },

  switch: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },

  nextButton: {
    backgroundColor: '#EE4963',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },

  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
