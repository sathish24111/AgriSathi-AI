export interface GeoLocationResult {
  district: string;
  state: string;
  lat: number;
  lng: number;
}

export const autoDetectLocation = async (): Promise<GeoLocationResult> => {
  // Fast IP Geolocation API for instant browser location detection
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (response.ok) {
      const data = await response.json();
      if (data.city || data.region) {
        return {
          district: data.city || 'Nashik',
          state: data.region || 'Maharashtra',
          lat: data.latitude || 20.0059,
          lng: data.longitude || 73.7898
        };
      }
    }
  } catch (e) {
    console.warn('IP Geolocation fetch fallback');
  }

  // HTML5 Navigator Geolocation Fallback
  return new Promise((resolve) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            district: 'Nashik (GPS Locked)',
            state: 'Maharashtra',
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        (_err) => {
          resolve({
            district: 'Nashik',
            state: 'Maharashtra',
            lat: 20.0059,
            lng: 73.7898
          });
        },
        { timeout: 4000 }
      );
    } else {
      resolve({
        district: 'Nashik',
        state: 'Maharashtra',
        lat: 20.0059,
        lng: 73.7898
      });
    }
  });
};
