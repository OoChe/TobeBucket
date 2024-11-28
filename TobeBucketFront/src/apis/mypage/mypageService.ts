import apiClient from '../apiClient';
import { MyInfoResponse, Response } from '../types';


// 마이페이지 정보 가져오기 함수
export const getMyInfo = async (): Promise<MyInfoResponse> => {
  const response = await apiClient.get<MyInfoResponse>('/mypage');
  console.log("마이페이지 정보", response.data);

  if (response.data.code === 'SU') {
    return response.data;
  } else {
    throw new Error(response.data.message || '마이 페이지 정보를 불러오던 중 오류가 발생했습니다.');
  }
};


// 마이페이지 정보 수정 함수
export const patchMyInfo = async (data: InfoChange): Promise<Response> => {
  const response = await apiClient.patch('/mypage/modify', data);

  if (response.data.code === 'SU') {
    return response.data;
  } else {
    throw new Error(response.data.message || '나의 정보를 수정하는 중 오류가 발생했습니다.');
  }
};