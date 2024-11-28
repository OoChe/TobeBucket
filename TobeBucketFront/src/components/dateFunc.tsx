const today = new Date();

function getToday() {
  return today;
}
const dateToStr = (date: Date) => {
  const week = new Array('일', '월', '화', '수', '목', '금', '토');

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayName = week[date.getDay()];

  return year + '. ' + month + '. ' + day + '. (' + dayName + ') ';
};

function calculateDDay(targetDateStr: string) {
  const targetDate = new Date(targetDateStr);

  // 밀리초 단위 차이 계산
  const diffTime = targetDate - getToday();

  // 밀리초를 일수로 변환
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

export {dateToStr, calculateDDay, getToday};
