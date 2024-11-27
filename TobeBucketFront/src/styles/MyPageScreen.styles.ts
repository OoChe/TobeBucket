import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FBFBFB',
    flex: 1, // Ensures the main container takes up the full screen
  },

  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },

  headerContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },

  statsContainer: {
    paddingHorizontal: 30,
    borderRadius: 12,
    paddingVertical: 16,
  },

  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  statTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#555',
  },

  noGraphText: {
    marginBottom : 30
  },

  progressBarContainer: {
    height: 8,
    width: '100%',
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 8,
  },

  progressBarFill: {
    height: '100%',
    backgroundColor: '#EE4963',
  },

  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },

  graphContainer: {
      paddingHorizontal: 30,
      paddingVertical: 0,
  },

  graphTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10
  },

  mbtiContainer: {
      paddingHorizontal: 30,

  },

  mbtiTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10
  },

  categoryList: {
    paddingVertical: 5,
    flexDirection: 'row', // 수평 정렬
    alignItems: 'center', // 세로 축 정렬
    justifyContent: 'space-between', // 공간 분배
  },

  categoryItemsContainer: {
    flexDirection: 'column', // 수직 정렬
  },

  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: 180,
  },

  bucketImage: {
    width: 150,
    height: 150,
    marginLeft: 20,
  },

  mbtiTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5
  },

  mbtiHighlight: {
    color: '#F55353',
  },


});

export default styles;
