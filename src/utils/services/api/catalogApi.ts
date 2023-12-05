import { axiosService } from './axiosClient';

// export const catalogApi = (slug) => {
//   if (!slug) {
//     const url = `/catalog`;
//     return axiosService.get(url);
//   } else {
//     const url = `/catalog/${slug}`;
//     return axiosService.get(url);
//   }
// };

import { AxiosResponse } from 'axios';

interface CatalogApiQuery {
  page?: number;
  limit_per_page?: number;
  name?: string;
}

export const catalogApi = (query?: CatalogApiQuery) => {
  const url = '/catalog';
  return axiosService.get(url, { params: { ...query } });
};

// export const createNewCatalogApi = (dataCatalog:{}) => {
//   const url = `/catalog`;
//   return axiosService.post(url, dataCatalog);
// };

// export const updateCatalogApi = (dataUpdate:{}) => {
//   const url = `/catalog`;
//   return axiosService.patch(url, dataUpdate);
// };

// export const deleteCatalogApi = (id) => {
//   const url = `/catalog`;
//   return axiosService.delete(url, { data: { id } });
// };

// export const importCatalogsApi = (formData:{}) => {
//   const url = `/catalog/import`;
//   return axiosService.post(url, formData);
// };
