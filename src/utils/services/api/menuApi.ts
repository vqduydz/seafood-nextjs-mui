import { axiosService } from './axiosClient';

interface menuApiQuery {
  page?: number;
  limit_per_page?: number;
  slug?: string;
}

export const menuApi = (query?: menuApiQuery) => {
  const url = '/menu';
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
