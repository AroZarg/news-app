import axios from 'axios';
import Toast from 'react-native-root-toast'

const API_KEY = 'bb927e7b-3991-4398-afe2-f3e25456cba8'; 
const BASE_URL = 'https://content.guardianapis.com';

export const fetchArticles = async (query, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
        params: {
            'api-key': API_KEY,
             q: query,
             page: page,
            'show-fields': 'thumbnail,headline,bodyText',
            'page-size':10
          },
    });
    return response.data.response.results;
  } catch (error) {
    console.log(error)
    console.error('Error fetching articles:', error);
    Toast.show( error.config.message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.TOP,
    })
    throw error;
  }
};