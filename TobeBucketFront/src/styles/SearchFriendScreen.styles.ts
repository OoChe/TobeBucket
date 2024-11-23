import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  backButton: {
    marginRight: 10,
  },

  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },

  searchTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },

  circleLeft: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FCEBDB',
    marginRight: 8,
  },

  circleRight: {
    width: 23,
    height: 23,
    borderRadius: 12,
    backgroundColor: '#D5EBF9',
    marginLeft: 8,
  },

  searchTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#707070',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 10,
    backgroundColor: '#FFF',

  },

  searchInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 14,
    color: '#A3A3A3',
  },

  searchIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
    resizeMode: 'contain',
  },

  friendList: {
    paddingHorizontal: 16,
  },

  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },

  friendInfo: {
    flex: 1,
  },

  nickname: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },

  badge: {
    marginTop: 4,
    backgroundColor: '#F5F5F5',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },

  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#EE4963',
  },

  addFriendButton: {
    borderWidth: 1,
    borderColor: '#6A82FF',
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },

  addFriendButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6A82FF',
  },

  noResultsText: {
    paddingVertical: 10,
  }
});

export default styles;
