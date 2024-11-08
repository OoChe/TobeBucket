// 카테고리 데이터를 객체 배열로 저장
export const categories = [
  { id: 'selfImprovement', icon: '🔥', label: '자기계발', borderColor: '#FFACBD' },
  { id: 'food', icon: '🍽️', label: '음식', borderColor: '#FCC18A' },
  { id: 'travel', icon: '✈️', label: '여행', borderColor: '#FFE296' },
  { id: 'culture', icon: '🎬', label: '문화/예술', borderColor: '#B0E1C4' },
  { id: 'shopping', icon: '🛍️', label: '쇼핑', borderColor: '#A6DAFB' },
  { id: 'hobby', icon: '🎧', label: '취미', borderColor: '#C2AEFB' },
];

// 특정 카테고리를 가져오는 헬퍼 함수
export const getCategoryById = (id: string) => {
  return categories.find(category => category.id === id);
};
