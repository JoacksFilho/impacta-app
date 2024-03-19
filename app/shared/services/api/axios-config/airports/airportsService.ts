
import { Api } from "../index";

import { enviroment } from "@/app/enviroment";

interface IAirportsData {
  AirportCode: string;
  cityName: string;
  aiportName: string;
}

interface IAirportsData {
  AirportCode: string;
  cityName: string;
  aiportName: string;
}

type TAirportsTotalCount = {
  data: IAirportsData[];
  totalCount: number;
};

const getAll = async (page = 1, filter = ""): Promise<TAirportsTotalCount | Error> => {
  try {
    const urlRelativa =
      "/airports?_page=${page}&_limit=${enviroment.LIMITE_DE_LINHAS}&cityName_like=${filter}";

    const { data, headers } = await Api.get("urlRelativa");

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || enviroment.LIMITE_DE_LINHAS),
      };
    }

    return new Error('Erro ao listar registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const getById = async (): Promise<any> => {};

const create = async (): Promise<any> => {};

const updateById = async (): Promise<any> => {};

const deleteById = async (): Promise<any> => {};

export const airportsService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
