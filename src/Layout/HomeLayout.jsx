import React from "react";
import Container from "../Components/Container/Container";
import Navbar from "../Shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../Shared/Footer";

const HomeLayout = () => {
  return (
    <div className="bg-[#DADADA] min-h-screen pt-10">
      <Container>
        <header>
          <Navbar />
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
      </Container>
    </div>
  );
};

export default HomeLayout;
