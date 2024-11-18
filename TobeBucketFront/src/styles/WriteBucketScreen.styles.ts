import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  main :  {
      backgroundColor: '#FBFBFB',
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
    marginTop : 5,
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
    alignItems : 'center',
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
