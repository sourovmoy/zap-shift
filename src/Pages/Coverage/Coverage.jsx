import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";

const Coverage = () => {
  const searchRef = useRef(null);
  const positions = useLoaderData();
  const BangladeshPosition = [23.685, 90.3563];
  const handelSearch = (e) => {
    e.preventDefault();
    const location = e.target.search.value;
    const district = positions.find((position) =>
      position.district.toLowerCase().includes(location.toLowerCase())
    );

    if (district === undefined) {
      toast.error("Not available");
    }

    if (district) {
      const cords = [district.latitude, district.longitude];
      searchRef.current.flyTo(cords, 14);
    }
    e.target.reset();
  };
  return (
    <div>
      <h1 className="heading-primary mt-5 sm:mt-10">
        We are available in 64 districts
      </h1>
      <div className="flex justify-center sm:justify-start py-3">
        <form onSubmit={handelSearch}>
          <input
            name="search"
            type="text"
            placeholder="search For Issues..."
            className="input rounded-l-full border-r-none w-auto sm:w-[40vw] mb-3 sm:mb-3"
          />
          <button className="submit btn btn-md absolute b-5 rounded-r-full border-r-none text-white bg-[#caeb66] border-0">
            <FaSearch />
          </button>
        </form>
      </div>
      <div className="h-130 mt-5 sm:mt-10">
        <p className="text-xl sm:text-2xl text-center sm:text-left font-semibold text-[#03373d] mb-5">
          We deliver almost all over Bangladesh
        </p>
        <MapContainer
          center={BangladeshPosition}
          zoom={7}
          scrollWheelZoom={false}
          className="h-130 rounded-3xl"
          ref={searchRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {positions.map((position, index) => (
            <Marker
              key={index}
              position={[position.latitude, position.longitude]}
            >
              <Popup>
                Region : {position.region} <br /> Easily customizable. <br />
                District : {position.district} <br /> City : {position.city}
                <br /> Area : {position.covered_area}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        ,
      </div>
    </div>
  );
};

export default Coverage;
