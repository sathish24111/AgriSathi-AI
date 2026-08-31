export interface WeatherResponse {
  locationName: string;
  lat: number;
  lng: number;
  tempC: number;
  condition: string;
  humidity: number;
  rainfallRisk: string;
  windKmH: number;
  cropAdvisory: string;
  isLiveAPI: boolean;
  provider: string;
}

/**
 * Backend Weather Proxy Service
 * 
 * Securely proxies weather queries to OpenWeatherMap / IMD API using server-side
 * environment variables (WEATHER_API_KEY). Never exposes keys to browser bundles.
 */
export class WeatherService {
  public static async getWeather(lat?: number, lng?: number, district?: string): Promise<WeatherResponse> {
    const apiKey = process.env.WEATHER_API_KEY;

    if (apiKey && apiKey.trim() !== '') {
      try {
        // Attempt live API query if key exists
        const queryLat = lat || 20.0059;
        const queryLng = lng || 73.7898;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${queryLat}&lon=${queryLng}&appid=${apiKey}&units=metric`
        );
        if (response.ok) {
          const data: any = await response.json();
          return {
            locationName: `${data.name || district || 'Nashik'}, India`,
            lat: queryLat,
            lng: queryLng,
            tempC: Math.round(data.main.temp),
            condition: data.weather[0]?.main || 'Clear',
            humidity: data.main.humidity,
            rainfallRisk: data.main.humidity > 80 ? 'HIGH (Rain expected)' : 'LOW',
            windKmH: Math.round(data.wind.speed * 3.6),
            cropAdvisory: data.main.humidity > 80 
              ? 'High humidity forecast. Monitor tomato & cotton crops for fungal spore germination.'
              : 'Favorable sunny weather. Ideal window for fertilizer application.',
            isLiveAPI: true,
            provider: 'OpenWeatherMap Meteorological Service'
          };
        }
      } catch (err) {
        console.warn('Weather API connection warning, falling back to mock provider');
      }
    }

    // Explicit fallback mock service
    const resolvedDistrict = district || 'Nashik, Maharashtra';
    return {
      locationName: resolvedDistrict,
      lat: lat || 20.0059,
      lng: lng || 73.7898,
      tempC: 29,
      condition: 'Partly Cloudy',
      humidity: 74,
      rainfallRisk: 'MODERATE (35% probability)',
      windKmH: 14,
      cropAdvisory: 'Moderate atmospheric moisture detected over western Maharashtra districts. Spray protective Neem fungicide.',
      isLiveAPI: false,
      provider: 'AgriSathi Regional Weather Service (Simulated Fallback Mode)'
    };
  }
}
