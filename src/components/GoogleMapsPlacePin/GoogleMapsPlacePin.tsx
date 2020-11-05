import React from "react";
import styled from "styled-components";
import { mapsApiKey } from "../../consts";

const MapPin = styled.iframe.attrs((props) => ({
  frameBorder: "0",
  style: { border: 0 },
  ...props,
}))`
  width: 100%;
  height: 50vh;
`;

interface GoogleMapsPlacePinProps {
  placeDesription: Array<string>;
}

function GoogleMapsPlacePin({ placeDesription }: GoogleMapsPlacePinProps) {
  const query = placeDesription
    .map((entry) => entry.replace(" ", "+"))
    .join(",");
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}&q=${query}`;
  return <MapPin src={mapSrc} />;
}

export default GoogleMapsPlacePin;
