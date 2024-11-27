import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FBFBFB',
    flex: 1,
  },

  container: {
    paddingHorizontal: 16,
  },

  addButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // 버튼을 오른쪽으로 배치
    paddingHorizontal: 16,
  },

  addButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#6A82FF',
  },

  addButtonText: {
    color: '#6A82FF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  reloadButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#249E9E',
    marginLeft: 20
  },

  reloadButtonText: {
    color: '#249E9E',
    fontSize: 16,
    fontWeight: 'bold',
  },

  friendItem: {
    marginVertical: 10,
  },

  dropdown: {
    position: 'absolute',
    right: 16,
    top: 60, // ListFriendShort 컴포넌트 아래 위치
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 1000,
  },

  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  dropdownItemText: {
    fontSize: 14,
    color: '#FF4D4D',
    fontWeight: 'bold',
  },

  friendRequestSection: {
      paddingHorizontal: 16,
  },
  requestTitle: {
    width: 100,
    height: 50,
    resizeMode: 'contain'
  }
});

export default styles;
