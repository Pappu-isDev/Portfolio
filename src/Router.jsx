"use client";

import {  BrowserRouter, Route, Routes } from "react-router-dom";
import Page from "./components/page";


export default function ReactRouterApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page/>} />
      </Routes>
    </BrowserRouter>
   
  );
}
