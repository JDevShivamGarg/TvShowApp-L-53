import axios from 'axios';
import { Cast, Show } from './models/Show';

export const searchShows = (keyword: string): Promise<Show[]> => {
    return axios
      .get<{ show: Show }[]>("https://api.tvmaze.com/search/shows?q=" + keyword)
      .then((response) => {
        const shows = response.data.map((item) => item.show);
        return shows;
      })
      .catch((error) => {
        return [];
      });
  };
  
export const fetchShowDetailsApi = async (showId: string): Promise<Show> => {
  try {
    const response = await axios.get<Show>(`https://api.tvmaze.com/shows/${showId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch show details: ${error}`);
  }
};
  
export const fetchShowCastApi = async (showId: string): Promise<Cast[]> => {
  try {
    const response = await axios.get<{ person: Cast }[]>(`https://api.tvmaze.com/shows/${showId}/cast`);
    const cast = response.data.map(item => item.person);
    return cast;
  } catch (error) {
    throw new Error("Failed to fetch cast details");
  }
};


