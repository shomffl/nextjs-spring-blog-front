import React from "react";

export const Layout = ({ children }: any) => {
  return (
    <div className="min-h-screen bg-purple-50">
      <header className="p-6 w-full bg-purple-800 fixed top-0 text-4xl font-bold text-gray-200">
        TEST APP
      </header>
      <main className="pt-24 pb-20 ">{children}</main>
      <footer className="p-5 w-full bg-gray-800 fixed bottom-0 text-center text-xs text-white">
        ©️2023 shomffl
      </footer>
    </div>
  );
};
