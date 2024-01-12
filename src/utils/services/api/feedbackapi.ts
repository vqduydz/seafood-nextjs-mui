import { axiosService, setHeader } from './axiosClient';

interface FeedbackApiQuery {
  feedback_code?: string;
  menu_id?: string;
}

export const getFeedbackApi = (query?: FeedbackApiQuery) => {
  const url = '/feedback';
  return axiosService.get(url, { params: { ...query } });
};

// export const getFeedbackApi = (feedback) => {
//   const url = `/feedback`;
//   return axiosService.get(url, { params: { ...feedback } });
// };

interface FeedbackData {
  point: number;
  feedback_content: string;
  feedback_code: string;
  menu_id: number;
  customer_id: number;
}

export const createNewFeedbackApi = ({ feedbackData, token }: { feedbackData: FeedbackData; token?: string }) => {
  const url = `/feedback`;
  const headers = setHeader(token);
  return axiosService.post(url, feedbackData, { headers });
};

// export const updateFeedbackApi = (dataUpdate) => {
//   const url = `/feedback`;
//   return axiosService.patch(url, dataUpdate);
// };

// export const deleteFeedbackApi = (id) => {
//   const url = `/feedback`;
//   return axiosService.delete(url, { data: { id } });
// };
