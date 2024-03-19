import { AxiosError } from "axios";

export const errrorInterceptors =  (error : AxiosError) => {

    if(error.message === 'Network Error'){
        return Promise.reject(new Error('Erro de conexão.'));
    }

    return Promise.reject(error);
}