import React, { use } from "react";
import img from "../../assets/service.png";

const OurServices = ({ promiseData }) => {
  const services = use(promiseData);
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center font-sans">
        {/* Main Dark Container */}
        <div className="bg-[#013237] rounded-[2.5rem] p-6 md:p-12 max-w-7xl w-full shadow-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Services
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed">
              Enjoy fast, reliable parcel delivery with real-time tracking and
              zero hassle. From personal packages to business shipments — we
              deliver on time, every time.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className={`card shadow-lg transition-transform duration-300 hover:-translate-y-1 border-none  hover:bg-[#caeb66]  rounded-3xl
                ${service.highlight ? "bg-[#CFE862]" : "bg-white"}
              `}
              >
                <div className="card-body items-center text-center p-8">
                  <div
                    className={`rounded-full p-4 mb-2 
                  ${service.highlight ? "bg-white/40" : "bg-blue-50"}
                `}
                  >
                    <img src={img} alt="" />
                  </div>

                  <h3 className="card-title text-lg font-bold text-teal-900 mb-2 min-h-[3.5rem] flex items-center justify-center">
                    {service.title}
                  </h3>

                  <p
                    className={`text-sm leading-relaxed
                  ${service.highlight ? "text-teal-900" : "text-gray-500"}
                `}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
