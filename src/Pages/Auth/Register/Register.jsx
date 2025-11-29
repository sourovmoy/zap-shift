import React from "react";
import ButtonPri from "../../../Components/Button/ButtonPri";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import { useAuth } from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import Loader from "../../../Components/Loader/Loader";
import useAxios from "../../../Hooks/useAxios";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axios = useAxios();
  const {
    createUserWithEmailAndPasswordFunc,
    updateProfileFunc,
    setUser,
    loader,
  } = useAuth();
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const name = data.name;
    createUserWithEmailAndPasswordFunc(data.email, data.password)
      .then((result) => {
        const image = data.photo[0];
        const fromData = new FormData();
        fromData.append("image", image);
        const uri = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGEBB_API
        }`;
        axios.post(uri, fromData).then((res) => {
          const photoURL = res.data.data.display_url;
          const userData = {
            displayName: name,
            photoURL: photoURL,
            email: data.email,
          };
          axios.post("/user", userData).then(() => {});
          updateProfileFunc(name, photoURL).then(() => {
            toast.success("Successfully create an account"),
              setUser({
                ...result.user,
                displayName: name,
                photoURL: photoURL,
              }),
              navigate(location.state || "/");
          });
        });
      })
      .catch((err) => {
        if (err) {
          toast.error(err.message);
        }
      });
  };
  if (loader) {
    return <Loader />;
  }
  return (
    <div>
      <h1 className="heading-primary mb-10">Create with ZapShift</h1>

      <div className="card w-full max-w-sm shrink-0 shadow-2xl sm:ml-20">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              <label className="label">Your Name</label>
              <input
                type="text"
                className="input"
                placeholder="Your Name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-600">{errors.name.message}</p>
              )}

              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}

              <label className="label">Photo</label>
              <input
                type="file"
                className="file-input"
                {...register("photo", { required: "Photo is required" })}
              />
              {errors.photo && (
                <p className="text-red-600">{errors.photo.message}</p>
              )}

              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message:
                      "Password must contain 1 uppercase, 1 lowercase, and 6+ characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}

              <ButtonPri label="Register" type="submit" />
            </fieldset>

            <Link state={location.state} to="/login">
              Already have an account?{" "}
              <span className="text-primary">Login</span>
            </Link>
          </form>
          <p className="border-b-2 my-5"></p>
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
