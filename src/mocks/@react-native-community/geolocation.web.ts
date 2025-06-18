const Geolocation = {
  getCurrentPosition: (success, error) => {
    if (error) error({ message: 'Geolocation not available on web.' });
  },
  watchPosition: () => {},
  clearWatch: () => {},
  stopObserving: () => {},
};
export default Geolocation; 