// src/apis/apiClient.ts
import axios from 'axios';
import { API_BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
  baseURL: 'http:/223.130.139.150:8080/tobebucket',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const authNotRequired = ['/signup', '/login'];

// 요청 인터셉터 설정
apiClient.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('authToken');

    // 현재 요청 URL이 인증이 필요하지 않은 엔드포인트에 포함되지 않을 때만 Authorization 헤더 추가
    if (token && !authNotRequired.includes(config.url || '')) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 요청 정보 로그 출력
    console.log(
      `📤 요청: [${config.method?.toUpperCase()}] ${config.baseURL}${config.url}`,
      {
        data: config.data,
      }
    );

    return config;
  },
  error => {
    console.error('요청 인터셉터 오류:', error);
    return Promise.reject(error);
  }
);


//응답 인터셉터
apiClient.interceptors.response.use(
  response => {
    console.log(
      `✅ 응답: [${response.config.method?.toUpperCase()}] ${response.config.baseURL}${response.config.url}`,
      {
        status: response.status,
        data: response.data,
      }
    );
    return response;
  },
  error => {
    console.error(
      `❌ 오류 응답: [${error.config?.method?.toUpperCase() || 'Unknown Method'}] ${error.config?.baseURL || ''}${error.config?.url || 'Unknown URL'}`,
      {
        status: error.response?.status || 'Unknown Status',
        data: error.response?.data || error.message,
      }
    );
    return Promise.reject(error);
  }
);

export default apiClient;
