import React from 'react';

export const LocationContext = React.createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = React.useState(null);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
