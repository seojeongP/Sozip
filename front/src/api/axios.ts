import axios from 'axios'


// 기본 서버 주소 정보를 설정
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3030',
    withCredentials: true,
});

export default axiosInstance;