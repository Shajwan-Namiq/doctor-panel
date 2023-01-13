import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Navbar/Sidebar";
import Layout from "./Layout";

const Admin = () => {
  const [flyer, setFlyer] = useState(false);

  return (
    <div>
      {/**navbar */}
      <Navbar flyer={flyer} setFlyer={setFlyer} />

      {/**sidebar */}
      <Sidebar flyer={flyer} setFlyer={setFlyer} />

      {/**content */}
      <Layout flyer={flyer} setFlyer={setFlyer} />
    </div>
  );
};

export default Admin;
