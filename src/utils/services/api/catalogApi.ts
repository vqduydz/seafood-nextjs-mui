import { axiosService, setHeader } from './axiosClient';

interface CatalogApiQuery {
  page?: number;
  limit_per_page?: number;
  name?: string;
}

export const catalogApi = (query?: CatalogApiQuery) => {
  const url = '/catalog';
  return axiosService.get(url, { params: { ...query } });
};

export const createNewCatalogApi = (dataCatalog: { name: string; slug: string; image?: string }, token: string) => {
  const url = `/catalog`;
  const headers = setHeader(token);
  return axiosService.post(url, dataCatalog, { headers });
};

export const updateCatalogApi = (
  dataUpdate: { id: number; name: string; slug: string; image?: string },
  token: string,
) => {
  const url = `/catalog`;
  const headers = setHeader(token);
  return axiosService.patch(url, dataUpdate, { headers });
};

export const deleteCatalogApi = (id: number, token: string) => {
  const url = `/catalog`;
  const headers = setHeader(token);
  return axiosService.delete(url, { headers, data: { id } });
};

export const importCatalogsApi = (formData: any, token: string) => {
  const url = `/catalog/import`;
  const headers = setHeader(token, true);
  return axiosService.post(url, formData, { headers });
};
