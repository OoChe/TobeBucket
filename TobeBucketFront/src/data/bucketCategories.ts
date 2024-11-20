/* [카테고리 항목 데이터]
1. 변수
- 카테고리 데이터를 객체 배열로 저장
  + id 6번째 전체 보기 항목 추가
2. 함수
- getCategoryById: 특정 카테고리의 모든 정보를 가져오는 함수
- getCategoryIconPathById: 특정 id에 해당하는 icon 경로를 반환하는 함수
- getCategoryLabelById: 특정 id에 해당하는 카테고리 명을 반환하는 함수
*/

export const categories = [
  { id: 0, icon: '🔥', label: '자기계발', borderColor: '#FFACBD', iconPath: require('../assets/icons/selfImprovement.png') },
  { id: 1, icon: '🍽️', label: '음식', borderColor: '#FCC18A', iconPath: require('../assets/icons/food.png') },
  { id: 2, icon: '✈️', label: '여행', borderColor: '#FFE296', iconPath: require('../assets/icons/travel.png') },
  { id: 3, icon: '🎬', label: '문화/예술', borderColor: '#B0E1C4', iconPath: require('../assets/icons/culture.png') },
  { id: 4, icon: '🛍️', label: '쇼핑', borderColor: '#A6DAFB', iconPath: require('../assets/icons/shopping.png') },
  { id: 5, icon: '🎧', label: '취미', borderColor: '#C2AEFB', iconPath: require('../assets/icons/hobby.png') },
  { id: 6, icon: '🔍', label: '전체 보기', borderColor: '#CCCCCC', iconPath: null },
];

export const getCategoryById = (id : number) => {
  return categories.find(category => category.id === id);
};

export const getCategoryIconPathById = (id: number) => {
  const category = categories.find(category => category.id === id);
  return category ? category.iconPath : null;
};

export const getCategoryLabelById = (id: number) => {
const category = categories.find(category => category.id === id);
return category ? category.label : "NULL";
};