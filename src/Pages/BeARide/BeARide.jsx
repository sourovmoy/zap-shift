import React from "react";
import { useForm } from "react-hook-form";
import img from "../../assets/agent-pending.png";
import ButtonPri from "../../Components/Button/ButtonPri";

const BeARide = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <div className="w-full flex items-center justify-center mt-10 sm:mt-20">
        {/* Main Card Container */}
        <div className="bg-white w-full rounded-[30px] shadow-lg p-8 md:p-12">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#003B46] mb-3">
              Be a Rider
            </h1>
            <p className="text-gray-500 text-sm md:text-base max-w-2xl">
              Enjoy fast, reliable parcel delivery with real-time tracking and
              zero hassle. From personal packages to business shipments — we
              deliver on time, every time.
            </p>
          </div>

          {/* Content Wrapper (Form + Image) */}
          <div className="flex flex-col-reverse md:flex-row items-stretch gap-8">
            {/* LEFT SIDE: Form */}
            <div className="w-full md:w-3/5">
              <h2 className="text-xl font-bold text-[#003B46] mb-6">
                Tell us about yourself
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Row 1: Name & Age */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Your Name */}
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-gray-700 mb-1 ml-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all placeholder-gray-300"
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <span className="text-red-500 text-xs mt-1 ml-1">
                        Name is required
                      </span>
                    )}
                  </div>

                  {/* Your Age */}
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-gray-700 mb-1 ml-1">
                      Your Age
                    </label>
                    <input
                      type="number"
                      placeholder="Your Age"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all placeholder-gray-300"
                      {...register("age", { required: true })}
                    />
                  </div>
                </div>

                {/* Row 2: Email & District */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Your Email */}
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-gray-700 mb-1 ml-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all placeholder-gray-300"
                      {...register("email", { required: true })}
                    />
                  </div>

                  {/* Your District */}
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-gray-700 mb-1 ml-1">
                      Your District
                    </label>
                    <select
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all appearance-none"
                      {...register("district", { required: true })}
                    >
                      <option value="">Select your District</option>
                      <option value="bagerhat">Bagerhat</option>
                      <option value="bandarban">Bandarban</option>
                      <option value="barguna">Barguna</option>
                      <option value="barishal">Barishal</option>
                      <option value="bhola">Bhola</option>
                      <option value="bogra">Bogra</option>
                      <option value="brahmanbaria">Brahmanbaria</option>
                      <option value="chandpur">Chandpur</option>
                      <option value="chattogram">Chattogram</option>
                      <option value="chuadanga">Chuadanga</option>
                      <option value="comilla">Comilla</option>
                      <option value="cox'sbazar">Cox's Bazar</option>
                      <option value="dhaka">Dhaka</option>
                      <option value="dinajpur">Dinajpur</option>
                      <option value="faridpur">Faridpur</option>
                      <option value="feni">Feni</option>
                      <option value="gaibandha">Gaibandha</option>
                      <option value="gazipur">Gazipur</option>
                      <option value="gopalganj">Gopalganj</option>
                      <option value="habiganj">Habiganj</option>
                      <option value="jamalpur">Jamalpur</option>
                      <option value="jashore">Jashore</option>
                      <option value="jhalokathi">Jhalokathi</option>
                      <option value="jhenaidah">Jhenaidah</option>
                      <option value="joypurhat">Joypurhat</option>
                      <option value="khagrachhari">Khagrachhari</option>
                      <option value="khulna">Khulna</option>
                      <option value="kishoreganj">Kishoreganj</option>
                      <option value="kuakata">Kuakata</option>
                      <option value="lakshmipur">Lakshmipur</option>
                      <option value="lalmonirhat">Lalmonirhat</option>
                      <option value="madaripur">Madaripur</option>
                      <option value="magura">Magura</option>
                      <option value="manikganj">Manikganj</option>
                      <option value="meherpur">Meherpur</option>
                      <option value="moulvibazar">Moulvibazar</option>
                      <option value="munshiganj">Munshiganj</option>
                      <option value="mymensingh">Mymensingh</option>
                      <option value="naogaon">Naogaon</option>
                      <option value="narail">Narail</option>
                      <option value="narayanganj">Narayanganj</option>
                      <option value="narsingdi">Narsingdi</option>
                      <option value="natore">Natore</option>
                      <option value="netrokona">Netrokona</option>
                      <option value="nilphamari">Nilphamari</option>
                      <option value="noakhali">Noakhali</option>
                      <option value="pabna">Pabna</option>
                      <option value="panchagarh">Panchagarh</option>
                      <option value="patuakhali">Patuakhali</option>
                      <option value="pirojpur">Pirojpur</option>
                      <option value="rajbari">Rajbari</option>
                      <option value="rajshahi">Rajshahi</option>
                      <option value="rangamati">Rangamati</option>
                      <option value="rangpur">Rangpur</option>
                      <option value="shariatpur">Shariatpur</option>
                      <option value="sherpur">Sherpur</option>
                      <option value="sirajganj">Sirajganj</option>
                      <option value="sunamganj">Sunamganj</option>
                      <option value="sylhet">Sylhet</option>
                      <option value="tangail">Tangail</option>
                      <option value="thakurgaon">Thakurgaon</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: NID & Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* NID No */}
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-gray-700 mb-1 ml-1">
                      NID No
                    </label>
                    <input
                      type="text"
                      placeholder="NID"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all placeholder-gray-300"
                      {...register("nid", { required: true })}
                    />
                  </div>

                  {/* Contact */}
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-gray-700 mb-1 ml-1">
                      Contact
                    </label>
                    <input
                      type="tel"
                      placeholder="Contact"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all placeholder-gray-300"
                      {...register("contact", { required: true })}
                    />
                  </div>
                </div>

                {/* Row 4: Area Zone */}
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-gray-700 mb-1 ml-1">
                    Which area-zone you want to work?
                  </label>
                  <select
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    {...register("area", { required: true })}
                  >
                    <option value="">Select your zone</option>
                    <option value="zone-a">Zone A</option>
                    <option value="zone-b">Zone B</option>
                  </select>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <ButtonPri label="Submit" type="submit" className="w-full" />
                </div>
              </form>
            </div>

            {/* RIGHT SIDE: Image Illustration */}
            <div className="w-full md:w-2/5 flex items-end justify-center md:justify-end relative mt-8 md:mt-0">
              {/* Replace 'your-image-path.png' with the actual path to your rider image.
               I've added styling to make sure it sits at the bottom like the screenshot.
            */}
              <div className="relative w-full h-64 md:h-full min-h-[300px]">
                <img
                  src={img}
                  alt="Delivery Rider"
                  className="absolute bottom-0 right-0 w-full h-full object-contain object-bottom"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeARide;
