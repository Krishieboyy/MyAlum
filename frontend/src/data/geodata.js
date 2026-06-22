export const cityCoordinates = {
  "Bangalore":     { lat: 12.9716, lng: 77.5946,  country: "India" },
  "Hyderabad":     { lat: 17.3850, lng: 78.4867,  country: "India" },
  "Mumbai":        { lat: 19.0760, lng: 72.8777,  country: "India" },
  "New Delhi":     { lat: 28.6139, lng: 77.2090,  country: "India" },
  "Pune":          { lat: 18.5204, lng: 73.8567,  country: "India" },
  "Chennai":       { lat: 13.0827, lng: 80.2707,  country: "India" },
  "Lucknow":       { lat: 26.8467, lng: 80.9462,  country: "India" },
  "Cambridge":     { lat: 42.3736, lng: -71.1097, country: "USA" },
  "San Jose":      { lat: 37.3382, lng: -121.8863, country: "USA" },
  "San Francisco": { lat: 37.7749, lng: -122.4194, country: "USA" },
  "New York":      { lat: 40.7128, lng: -74.0060, country: "USA" },
  "Seattle":       { lat: 47.6062, lng: -122.3321, country: "USA" },
  "Austin":        { lat: 30.2672, lng: -97.7431, country: "USA" },
  "London":        { lat: 51.5074, lng: -0.1278,  country: "UK" },
  "Singapore":     { lat: 1.3521,  lng: 103.8198, country: "Singapore" },
  "Dubai":         { lat: 25.2048, lng: 55.2708,  country: "UAE" },
  "Berlin":        { lat: 52.5200, lng: 13.4050,  country: "Germany" },
  "Sydney":        { lat: -33.8688, lng: 151.2093, country: "Australia" },
  "Tokyo":         { lat: 35.6762, lng: 139.6503, country: "Japan" },
  "Toronto":       { lat: 43.6532, lng: -79.3832, country: "Canada" },
  "Zurich":        { lat: 47.3769, lng: 8.5417,   country: "Switzerland" },
  "Amsterdam":     { lat: 52.3676, lng: 4.9041,   country: "Netherlands" },
};

export const getCoordinates = (city) => {
  return cityCoordinates[city] || { lat: 0, lng: 0 };
};

export const getCountry = (city) => {
  return cityCoordinates[city]?.country || "India";
};
