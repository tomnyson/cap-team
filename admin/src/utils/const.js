import axios from "axios";

export const OPENCAGE_API_KEY   = import.meta.VITE_OPENCAGE_API_KEY || '8daa159cd5454af78b1489aa6992785a'

export const getCoordinates = async (address) => {
    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
        params: {
          q: address,
          key: OPENCAGE_API_KEY 
        }
      });
  
      if (response.data.results.length > 0) {
        const location = response.data.results[0].geometry;
        return `${location.lat}, ${location.lng}`
      } else {
        return null
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      return null;
    }
  }