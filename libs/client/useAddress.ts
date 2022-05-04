import { useEffect, useState } from "react";

export type Address = string | null;

const useAddress = () => {
  const [address, setAddress] = useState<Address>(null);

  const onSuccess = async (position: GeolocationPosition) => {
    const {
      coords: { latitude, longitude },
    } = position;

    const data = await (await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDr9AOwpDeu_iJDXbvTiPvnoiBCSG3Tmks`)).json();
    if (data) {
      setAddress(data.results[0]?.formatted_address);
    }
  };

  const onError = (error: GeolocationPositionError) => {
    console.log("useCoords onError", error);
    setAddress(null);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: false });
  }, []);

  return address;
};

export default useAddress;
