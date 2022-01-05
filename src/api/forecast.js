import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';

const forecastApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_URL,
  }),
  endpoints: (builder) => ({
    getForecast: builder.query({
      query: (cityName) => ({
        url: `/forecast`,
        params: {
          q: cityName,
          appid: config.API_KEY,
        },
      }),
    }),
  }),
});

export const { useGetForecastQuery } = forecastApi;

export default forecastApi;
