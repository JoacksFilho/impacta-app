import axios from 'axios';
import { errrorInterceptors, responseInterceptors } from './interceptors';
import { enviroment } from '@/app/enviroment';


const Api = axios.create({
    baseURL: enviroment.URL_BASE
});

Api.interceptors.response.use(
    (response) => responseInterceptors(response),
    (error) => errrorInterceptors(error),
)

export { Api };