import React from "react";
import Container from "../Components/Container/Container";
import Logo from "../Components/Logo/Logo";
import authImage from "../assets/authImage.png";
import { Outlet } from "react-router";

const AuthLayOut = () => {
  return (
    <div className="min-h-screen">
      <Container>
        <header className="mt-3 sm:mt-8">
          <Logo />
        </header>
        <main className="flex mt-20 gap-5 flex-col-reverse sm:flex-row justify-center items-center">
          <div className="flex-1">
            <Outlet />
          </div>
          <aside className="flex-1">
            <img src={authImage} alt="" />
          </aside>
        </main>
      </Container>
    </div>
  );
};

export default AuthLayOut;
