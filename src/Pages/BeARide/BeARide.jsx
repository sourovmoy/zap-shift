import React from "react";
import { useForm, useWatch } from "react-hook-form";
import img from "../../assets/agent-pending.png";
import ButtonPri from "../../Components/Button/ButtonPri";
import { useLoaderData } from "react-router";
import { useAuth } from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";

const BeARide = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios.post("/rider", data).then((res) => {
      console.log(res.data);

      if (res.data.results.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            "Your application has been submitted . Please wait for approval",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  const data = useLoaderData();
  const regionsDuplicate = data.map((region) => region.region);
  const regions = [...new Set(regionsDuplicate)];
  const selectedRegions = useWatch({ control, name: "region" });
  const districtByRegion = (region) => {
    const districts = data
      .filter((i) => i.region === region)
      .map((d) => d.district);
    return districts;
  };

  return (
    <div>
      <div className="w-full px-4 py-10 flex flex-col-reverse lg:flex-row items-center gap-10 bg-white rounded-3xl mt-10">
        {/* Left Side Form */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl font-bold text-green-700 mb-2">Be a Rider</h1>
          <p className="text-gray-600 mb-8 max-w-md">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-xl shadow"
          >
            {/* Name */}
            <div className="flex flex-col">
              <label className="font-medium">Your Name</label>
              <input
                {...register("name", { required: true })}
                readOnly
                defaultValue={user.displayName}
                className="border p-2 rounded-md"
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mb-4">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* License */}
            <div className="flex flex-col">
              <label className="font-medium">Driving License Number</label>
              <input
                {...register("license", {
                  required: "You must enter your driving license number",
                })}
                className="border p-2 rounded-md"
                placeholder="Driving License Number"
              />
              {errors.license && (
                <p className="text-red-500 text-sm mb-4">
                  {errors.license.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="font-medium">Your Email</label>
              <input
                {...register("email")}
                readOnly
                defaultValue={user.email}
                className="border p-2 rounded-md"
                placeholder="Your Email"
              />
            </div>

            {/* District */}
            <div className="flex flex-col">
              <label className="font-medium">Your District</label>
              <select
                {...register("district", {
                  required: "You must enter your district",
                })}
                className="border p-2 rounded-md"
              >
                <option value="">Select your District</option>
                {districtByRegion(selectedRegions)?.map((district, index) => {
                  return (
                    <option key={index} value={district}>
                      {district}
                    </option>
                  );
                })}
              </select>
              {errors.district && (
                <p className="text-red-500 text-sm mb-4">
                  {errors.district.message}
                </p>
              )}
            </div>
            {/* Region */}
            <div className="flex flex-col">
              <label className="font-medium">Your Region</label>
              <select
                {...register("region", {
                  required: "You must enter your region",
                })}
                className="border p-2 rounded-md"
              >
                {errors.region && (
                  <p className="text-red-500 text-sm mb-4">
                    {errors.region.message}
                  </p>
                )}
                <option value="">Select your Region</option>
                {regions.map((region, index) => {
                  return (
                    <option key={index} value={region}>
                      {region}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* NID */}
            <div className="flex flex-col">
              <label className="font-medium">NID Number</label>
              <input
                {...register("nid", {
                  required: "You must enter your NID number",
                })}
                className="border p-2 rounded-md"
                placeholder="NID Number"
              />
              {errors.nid && (
                <p className="text-red-500 text-sm mb-4">
                  {errors.nid.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label className="font-medium">Phone Number</label>
              <input
                {...register("phone", {
                  required: "You must enter your phone number",
                })}
                className="border p-2 rounded-md"
                placeholder="Phone Number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mb-4">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Bike Model */}
            <div className="flex flex-col">
              <label className="font-medium">Bike Brand Model and Year</label>
              <input
                {...register("bikeModel", {
                  required: "You must enter your bike Model and Year",
                })}
                className="border p-2 rounded-md"
                placeholder="Bike Model and Year"
              />
              {errors.bikeModel && (
                <p className="text-red-500 text-sm mb-4">
                  {errors.bikeModel.message}
                </p>
              )}
            </div>

            {/* Bike Registration */}
            <div className="flex flex-col">
              <label className="font-medium">Bike Registration Number</label>
              <input
                {...register("bikeReg", {
                  required: "You must enter your bike registration number",
                })}
                className="border p-2 rounded-md"
                placeholder="Registration Number"
              />
              {errors.bikeReg && (
                <p className="text-red-500 text-sm mb-4">
                  {errors.bikeReg.message}
                </p>
              )}
            </div>

            {/* About */}
            <div className="flex flex-col md:col-span-2">
              <label className="font-medium">Tell Us About Yourself</label>
              <textarea
                {...register("about")}
                className="border p-2 rounded-md h-24"
                placeholder="Tell Us About Yourself"
              ></textarea>
              {errors.about && (
                <p className="text-red-500 text-sm mb-4">
                  {errors.about.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <ButtonPri
                type="submit"
                label="Submit Application"
                className="w-full"
              />
            </div>
          </form>
        </div>

        {/* Right Side Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img src={img} alt="Rider Illustration" className="w-80 lg:w-96" />
        </div>
      </div>
    </div>
  );
};

export default BeARide;
