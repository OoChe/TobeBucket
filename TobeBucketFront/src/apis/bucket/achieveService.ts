import apiClient from '../apiClient';
import {achieveRecordData, achieveRecordResponse} from '../types';

// 목표 달성 기록에 필요한 스티커 목록 가져오기 함수
export const getUnlockedSticker = async (): Promise<number> => {
  try {
    // 서버에서 데이터 가져오기
    const response = await apiClient.get<{
      code: string;
      message: string;
      stickerProcess: number;
    }>('/home/achievement-record');
    if (response.data.code === 'SU') {
      return response.data.stickerProcess;
    } else {
      throw new Error(
        response.data.message ||
          '스티커 목록을 불러오는 중 오류가 발생했습니다.',
      );
    }
  } catch (error) {
    console.error('달성 기록 스티커 요청 오류:', error);
    throw error; // 에러 재발생
  }
};

// 버킷 달성 기록 내용 전송 함수
export const achieveRecord = async (
  data: achieveRecordData,
): Promise<achieveRecordResponse> => {
  const response = await apiClient.put('/home/achievement-record', data);
  return response.data;
};
