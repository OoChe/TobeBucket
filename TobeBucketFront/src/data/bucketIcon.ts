// 카테고리 데이터를 객체 배열로 저장
export const iconCategories = [
  {id: 0, icon: require('../assets/icons/selfImprovement.png'), label: '자기계발'},
  {id: 1, icon: require('../assets/icons/food.png'), label: '음식'},
  {id: 2, icon: require('../assets/icons/travel.png'), label: '여행'},
  {id: 3, icon: require('../assets/icons/culture.png'), label: '문화/예술'},
  {id: 4, icon: require('../assets/icons/shopping.png'), label: '쇼핑'},
  {id: 5, icon: require('../assets/icons/hobby.png'), label: '취미'},
];

// 특정 id에 해당하는 icon 경로를 반환하는 함수
export const getCategoryIconById = (id: number) => {
    const category = iconCategories.find(category => category.id === id);
    return category ? category.icon : null; // 아이콘이 없는 경우 null 반환
  };

  // 특정 id에 해당하는 icon 경로를 반환하는 함수
export const getCategoryLabelById = (id: number) => {
  const category = iconCategories.find(category => category.id === id);
  return category ? category.label : null; // 아이콘이 없는 경우 null 반환
};