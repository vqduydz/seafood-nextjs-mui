import { axiosService } from './axiosClient';

interface feedbackApiQuery {
  feedback_code?: string;
  menu_id?: string;
}

export const feedbackApi = (query?: feedbackApiQuery) => {
  const url = '/feedback';
  return axiosService.get(url, { params: { ...query } });
};
