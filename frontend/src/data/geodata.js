export const cityCoordinates = {
  "Bangalore": { lat: 12.9716, lng: 77.5946 },
  "Hyderabad": { lat: 17.3850, lng: 78.4867 },
  "Mumbai": { lat: 19.0760, lng: 72.8777 },
  "New Delhi": { lat: 28.6139, lng: 77.2090 },
  "Pune": { lat: 18.5204, lng: 73.8567 },
  "Cambridge": { lat: 42.3736, lng: -71.1097 },
  "San Jose": { lat: 37.3382, lng: -121.8863 },
  "Chennai": { lat: 13.0827, lng: 80.2707 },
  "Lucknow": { lat: 26.8467, lng: 80.9462 },
  "San Francisco": { lat: 37.7749, lng: -122.4194 },
  "New York": { lat: 40.7128, lng: -74.0060 },
  "London": { lat: 51.5074, lng: -0.1278 },
  "Singapore": { lat: 1.3521, lng: 103.8198 },
  "Dubai": { lat: 25.2048, lng: 55.2708 },
  "Seattle": { lat: 47.6062, lng: -122.3321 },
  "Austin": { lat: 30.2672, lng: -97.7431 },
  "Berlin": { lat: 52.5200, lng: 13.4050 },
  "Sydney": { lat: -33.8688, lng: 151.2093 },
  "Tokyo": { lat: 35.6762, lng: 139.6503 },
  "Toronto": { lat: 43.6532, lng: -79.3832 },
};

export const getCoordinates = (city) => {
  return cityCoordinates[city] || { lat: 0, lng: 0 };
};
