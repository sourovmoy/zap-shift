import React from "react";
import { useForm, useWatch } from "react-hook-form";
import ButtonPri from "../../Components/Button/ButtonPri";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import { useAuth } from "../../Hooks/useAuth";

const SendParcel = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const data = useLoaderData();
  const regionDuplicate = data.map((r) => r.region);
  const regions = [...new Set(regionDuplicate)];

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });
  const parcelType = useWatch({ control, name: "parcelType" });

  const districtsByRegion = (region) => {
    const districtRegion = data.filter((c) => c.region === region);
    const district = districtRegion.map((d) => d.district);
    return district;
  };
  // deliveryInstruction: "Et ex id eum sint ex";
  // parcelName: "Scarlett Bray";
  // parcelType: "non-document";
  // parcelWeight: "72";
  // pickupInstruction: "Rerum doloremque fug";
  // receiverAddress: "Quis blanditiis in e";
  // receiverDistrict: "Munshiganj";
  // receiverName: "Phelan Hamilton";
  // receiverPhone: "+1 (537) 593-7779";
  // receiverRegion: "Dhaka";
  // senderAddress: "Esse aute est sit ";
  // senderDistrict: "Mymensingh";
  // senderName: "Kyle Levine";
  // senderPhone: "+1 (767) 114-3156";
  // senderRegion: "Mymensingh";

  const onSubmit = (data) => {
    const weight = Number(data.parcelWeight);
    const sameDistrict = data.receiverDistrict === data.senderDistrict;
    const type = data.parcelType;
    let cost = 0;
    if (type === "document") {
      cost = sameDistrict ? 60 : 80;
    } else {
      if (weight <= 3) {
        cost = sameDistrict ? 110 : 150;
      } else {
        const extraWeight = weight - 3;
        const extraCharge = extraWeight * 40;
        const districtCharge = sameDistrict ? 110 : 150;
        if (sameDistrict) {
          cost = districtCharge + extraCharge;
        } else {
          cost = districtCharge + extraCharge + 40;
        }
      }
    }
    data.value = cost;
    Swal.fire({
      title: "Agree with our condition?",
      text: `Your charge is ${cost}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Agree",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("/parcel", data)
          .then((res) => {
            console.log(res.data);

            if (res.data.results.acknowledged) {
              Swal.fire({
                title: "Parcel is processing",
                text: "You will be notify soon.",
                icon: "success",
              });
            }
          })
          .catch((err) => console.log(err.message));
      }
    });
  };
  return (
    <div>
      <div className="p-8 bg-white shadow rounded-2xl mt-10 sm:mt-20">
        <h1 className="heading-primary mb-2">Send A Parcel</h1>
        <p className="text-lg font-semibold mb-6">Enter your parcel details</p>

        {/* Document / Not Document */}
        <div className="flex items-center gap-6 mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="document"
              {...register("parcelType", {
                required: "Please select parcel type",
              })}
            />
            <span>Document</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="non-document"
              {...register("parcelType", {
                required: "Please select parcel type",
              })}
            />
            <span>Not Document</span>
          </label>
        </div>
        {errors.parcelType && (
          <p className="text-red-500 text-sm mb-4">
            {errors.parcelType.message}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Parcel Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                placeholder="Parcel Name"
                className="border p-3 rounded w-full"
                {...register("parcelName", {
                  required: "Parcel name is required",
                })}
              />
              {errors.parcelName && (
                <p className="text-red-500 text-sm">
                  {errors.parcelName.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="number"
                placeholder="Parcel Weight (KG)"
                className="border p-3 rounded w-full"
                {...register("parcelWeight", {
                  required: "Parcel weight is required",
                  validate: (value) => {
                    if (parcelType === "document" && value > 2) {
                      return "Documents cannot weigh more than 2kg";
                    }
                    return true;
                  },
                })}
              />
              {errors.parcelWeight && (
                <p className="text-red-500 text-sm">
                  {errors.parcelWeight.message}
                </p>
              )}
            </div>
          </div>

          {/* Sender / Receiver */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sender */}
            <div>
              <h2 className="font-semibold text-xl mb-4">Sender Details</h2>

              <div>
                <input
                  type="text"
                  readOnly
                  defaultValue={user?.displayName}
                  placeholder="Sender Name"
                  className="border p-3 rounded w-full mb-2"
                  {...register("senderName", {
                    required: "Sender name is required",
                  })}
                />
                {errors.senderName && (
                  <p className="text-red-500 text-sm">
                    {errors.senderName.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Address"
                  className="border p-3 rounded w-full mb-2"
                  {...register("senderAddress", {
                    required: "Sender address is required",
                  })}
                />
                {errors.senderAddress && (
                  <p className="text-red-500 text-sm">
                    {errors.senderAddress.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  readOnly
                  defaultValue={user?.email}
                  type="email"
                  placeholder="Email Address"
                  className="border p-3 rounded w-full mb-2"
                  {...register("senderEmail")}
                />
                {errors.senderAddress && (
                  <p className="text-red-500 text-sm">
                    {errors.senderAddress.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Sender Phone No"
                  className="border p-3 rounded w-full mb-2"
                  {...register("senderPhone", {
                    required: "Sender phone number is required",
                  })}
                />
                {errors.senderPhone && (
                  <p className="text-red-500 text-sm">
                    {errors.senderPhone.message}
                  </p>
                )}
              </div>
              {/* sender region */}
              <div>
                <select
                  className="border p-3 rounded w-full mb-2"
                  {...register("senderRegion", {
                    required: "Sender region is required",
                  })}
                >
                  <option value="Select your Region">Select your Region</option>
                  {regions.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {errors.senderDistrict && (
                  <p className="text-red-500 text-sm">
                    {errors.senderDistrict.message}
                  </p>
                )}
              </div>
              {/* Sender district */}
              <div>
                <select
                  className="border p-3 rounded w-full mb-2"
                  {...register("senderDistrict", {
                    required: "Sender district is required",
                  })}
                >
                  <option value="">Select your District</option>
                  {districtsByRegion(senderRegion).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {errors.senderDistrict && (
                  <p className="text-red-500 text-sm">
                    {errors.senderDistrict.message}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  placeholder="Pickup Instruction"
                  className="border p-3 rounded w-full"
                  rows={3}
                  {...register("pickupInstruction", {
                    required: "Pickup instruction is required",
                  })}
                ></textarea>
                {errors.pickupInstruction && (
                  <p className="text-red-500 text-sm">
                    {errors.pickupInstruction.message}
                  </p>
                )}
              </div>
            </div>

            {/* Receiver */}
            <div>
              <h2 className="font-semibold text-xl mb-4">Receiver Details</h2>

              <div>
                <input
                  type="text"
                  placeholder="Receiver Name"
                  className="border p-3 rounded w-full mb-2"
                  {...register("receiverName", {
                    required: "Receiver name is required",
                  })}
                />
                {errors.receiverName && (
                  <p className="text-red-500 text-sm">
                    {errors.receiverName.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Receiver Address"
                  className="border p-3 rounded w-full mb-2"
                  {...register("receiverAddress", {
                    required: "Receiver address is required",
                  })}
                />
                {errors.receiverAddress && (
                  <p className="text-red-500 text-sm">
                    {errors.receiverAddress.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Receiver Email Address"
                  className="border p-3 rounded w-full mb-2"
                  {...register("receiverEmail", {
                    required: "Receiver email is required",
                  })}
                />
                {errors.senderAddress && (
                  <p className="text-red-500 text-sm">
                    {errors.senderAddress.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Receiver Contact No"
                  className="border p-3 rounded w-full mb-2"
                  {...register("receiverPhone", {
                    required: "Receiver phone is required",
                  })}
                />
                {errors.receiverPhone && (
                  <p className="text-red-500 text-sm">
                    {errors.receiverPhone.message}
                  </p>
                )}
              </div>
              {/* receiver region */}
              <div>
                <select
                  className="border p-3 rounded w-full mb-2"
                  {...register("receiverRegion", {
                    required: "Receiver region is required",
                  })}
                >
                  <option value="Select your Region">Select your Region</option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {errors.receiverDistrict && (
                  <p className="text-red-500 text-sm">
                    {errors.receiverDistrict.message}
                  </p>
                )}
              </div>
              {/* receiver district */}
              <div>
                <select
                  className="border p-3 rounded w-full mb-2"
                  {...register("receiverDistrict", {
                    required: "Receiver district is required",
                  })}
                >
                  <option value="Select your District">
                    Select your District
                  </option>
                  {districtsByRegion(receiverRegion).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {errors.receiverDistrict && (
                  <p className="text-red-500 text-sm">
                    {errors.receiverDistrict.message}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  placeholder="Delivery Instruction"
                  className="border p-3 rounded w-full"
                  rows={3}
                  {...register("deliveryInstruction", {
                    required: "Delivery instruction is required",
                  })}
                ></textarea>
                {errors.deliveryInstruction && (
                  <p className="text-red-500 text-sm">
                    {errors.deliveryInstruction.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <p className="text-gray-600 text-sm">* Pickup Time 4pm-7pm Approx.</p>

          <ButtonPri label="Proceed to Confirm Booking" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
