import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Add from './components/add';
import Header from './components/header';
import Carrousal from './components/carrousal';
import Productdetails from './components/productdetails';
import Model from './components/model';
import { ConnectWallet } from "@thirdweb-dev/react";
import UpdateUserDataButton from './components/checkin';
import Chatbot from './components/chatbot';





const Home = () => {
  return (

    <>
 {/* <model-viewer alt="Neil Armstrong's Spacesuit from the Smithsonian Digitization Programs Office and National Air and Space Museum" src="/mymodel.glb" ar   shadow-intensity="1" camera-controls touch-action="pan-y"></model-viewer> */}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/show" element={<Carrousal />} />
          <Route path="/ds/:productId" element={<Productdetails />} />
          <Route path="/model" element={<Model />} />
          <Route path="/checkin" element={<UpdateUserDataButton />} />
          <Route path="/chatbot" element={<Chatbot />} />



        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Home;
