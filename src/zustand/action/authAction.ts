import provider, { IProvider } from '@/providers';
import MutationTypes from '@/providers/methods';
import { toast } from 'react-toastify';
import axios from 'axios';

export const refreshToken = async (token: any) => {
  try {
    const objProvider: IProvider = {
      method: MutationTypes.POST,
      path: 'api/refresh-token',
      data: { refreshToken: token },
    };
    const response = await provider(objProvider);
    if (!response) toast.error('Network Error');
    if (response.data?.success) {
      return response.data?.tokens;
    }
  } catch (e: any) {
    console.log(e, 'error refresh token');
    if (axios.isAxiosError(e)) {
      if (e?.response?.status === 401) {
        return 'logout';
      }
    }
  }
};
