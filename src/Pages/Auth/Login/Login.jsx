import React from "react";
import { useForm } from "react-hook-form";
import ButtonPri from "../../../Components/Button/ButtonPri";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import { useAuth } from "../../../Hooks/useAuth";
import Loader from "../../../Components/Loader/Loader";
import toast from "react-hot-toast";

const Login = () => {
  const { signInWithEmailAndPasswordFunc, setLoader, loader } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    // watch
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await signInWithEmailAndPasswordFunc(
        data.email,
        data.password
      );
      navigate(location.state || "/");
      setLoader(false);
      return res;
    } catch (error) {
      setLoader(false);
      toast.error(error.message);
    }
  };
  if (loader) {
    return <Loader />;
  }
  return (
    <div>
      <h1 className="heading-primary mb-10">Login with ZapShift</h1>

      <div className="card w-full max-w-sm shrink-0 shadow-2xl sm:ml-20">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message:
                      "Password should be one uppercase, one lowercase and length 6",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <ButtonPri type="submit" label={"Login"} />
            </fieldset>
            <Link to={"/register"}>
              Already have an account?{" "}
              <span className="text-primary hover:text-lime-500">Register</span>
            </Link>
          </form>
          <p className="border-b-2 my-5"></p>
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
