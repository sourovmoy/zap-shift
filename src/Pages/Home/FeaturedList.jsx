import React from "react";
import img1 from "../../assets/live-tracking.png";
import img2 from "../../assets/live-tracking.png";
import img3 from "../../assets/tiny-deliveryman.png";

const FeaturedList = () => {
  const FEATURES_DATA = [
    {
      id: 1,
      title: "Live Parcel Tracking",
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      // Replace with your local image path, e.g., require('./assets/tracking.png')
      image: img1,
    },
    {
      id: 2,
      title: "100% Safe Delivery",
      description:
        "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      image: img2,
    },
    {
      id: 3,
      title: "24/7 Call Center Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      image: img3,
    },
  ];
  return (
    <div>
      <div className="flex justify-center items-center mt-10 sm:mt-20">
        <div className="w-full space-y-6">
          {FEATURES_DATA.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-3xl shadow-sm flex flex-col sm:h-[30vh] md:flex-row items-center w-full"
            >
              {/* Left Side: Image Section */}
              <div className="w-full md:w-1/3 flex justify-center p-4">
                <img
                  src={feature.image}
                  className="max-h-40 md:max-h-48 object-contain opacity-90"
                  loading="lazy"
                />
              </div>

              {/* Divider: Vertical on Desktop, Horizontal on Mobile */}
              <div
                className="hidden md:block h-32 w-px border-r-2 border-dashed border-gray-300 mx-8"
                aria-hidden="true"
              ></div>
              <div
                className="block md:hidden w-full h-px border-b-2 border-dashed border-gray-300 my-6"
                aria-hidden="true"
              ></div>

              {/* Right Side: Content Section */}
              <div className="w-full md:w-2/3 text-center md:text-left md:pr-8">
                <h3 className="text-xl md:text-2xl font-bold text-teal-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedList;
