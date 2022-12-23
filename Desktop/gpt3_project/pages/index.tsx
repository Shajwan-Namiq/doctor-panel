 
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
 import {Footer , Blog , Possibility , Features , WhatGPT3 , Header } from '../containers';
 import {CTA , Brand , Navbar} from '../components';




export default function Home() {
  return (
    <div>
      <div className="gradient_bg">
        <Navbar />
      </div>
      <Header />
      <Brand />
      <WhatGPT3 />
      <Features />
      <Possibility />
      <CTA />
      <Blog />
      <Footer />
    </div>
  );
}
