import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    backgroundColor: '#FBFBFB',
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 10,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Pretendard-Regular',
  },

  Dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EE4963',
    marginLeft: 6,
    marginTop: 2,
    position: 'absolute',
    top: 2,
    right: 163,
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
    fontWeight: 'bold'
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
  },

  friendTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderColor : '#EE4963',

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
});

export default styles;
