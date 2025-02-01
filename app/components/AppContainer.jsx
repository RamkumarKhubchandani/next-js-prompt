"use client";
import Header from "./Header";
import MainPage from "./MainPage";

const AppContainer = ({
  setOpen
}) => {
  return (
    <>
      <Header setOpen={setOpen} />
      <MainPage />
    </>
  );
};

export default AppContainer;
