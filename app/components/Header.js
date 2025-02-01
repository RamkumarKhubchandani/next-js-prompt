"use client";
import React from "react";

function Header({
    setOpen
}) {
  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-blend-color-burn bg-teal-500 bg-cover bg-contain w-full h-[80vh]">
      <div className="text-7xl text-cyan-50 mt-40 opacity-0 animate-fade-in-up duration-500 delay-[1000ms]">
        Any one can do the code
      </div>
      <div className="text-3xl text-cyan-50 mt-5 opacity-0 animate-fade-in-up duration-500 delay-[2000ms]">
        Code is not the magic, code is art
      </div>
      <div className="text-3xl text-cyan-50 mt-5 opacity-0 animate-fade-in-up duration-500 delay-[3000ms]">
        Do you want to become a independent Front end coder?
      </div>
      <button aria-label="Connect one-on-one for free" onClick={() => setOpen(true)} className="bg-cyan-50 text-teal-500 px-5 py-2 rounded-lg text-4xl mt-20 opacity-0 animate-fade-in-up duration-500 delay-[4000ms]">
        Connect 1-on-1 for Free
      </button>
    </div>
    </div>
  );
}

export default Header;
