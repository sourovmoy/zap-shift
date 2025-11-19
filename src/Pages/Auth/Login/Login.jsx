import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const Login = () => {
  return (
    <div className="card w-full max-w-sm shrink-0 shadow-2xl sm:ml-20">
      <form>
        <div className="card-body">
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input type="email" className="input" placeholder="Email" />
            <label className="label">Password</label>
            <input type="password" className="input" placeholder="Password" />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </fieldset>
        </div>
      </form>
    </div>
  );
};

export default Login;
