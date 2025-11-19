import React from "react";
import img1 from "../../assets/bookingIcon.png";

const HowItWorks = () => {
  const features = [
    {
      id: 1,
      title: "Booking Pick & Drop",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      id: 2,
      title: "Cash On Delivery",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      id: 3,
      title: "Delivery Hub",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      id: 4,
      title: "Booking SME & Corporate",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
  ];
  return (
    <div>
      <div className="flex items-center justify-center py-12 font-sans">
        <div className="max-w-7xl w-full">
          {/* Section Header */}
          <h2 className="heading-primary pb-10 sm:pb-18">How it Works</h2>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="card shadow-sm hover:shadow-md transition-shadow duration-300 rounded-3xl bg-white border-none"
              >
                <div className="card-body p-8 items-start text-left">
                  {/* Icon */}
                  <img src={img1} alt="" />

                  {/* Title */}
                  <h3 className="card-title text-lg font-bold text-teal-900 mb-2">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {feature.description}
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

export default HowItWorks;
