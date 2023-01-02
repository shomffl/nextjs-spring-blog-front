import React from "react";

export const Layout = ({ children }: any) => {
  return (
    <div>
      <header>header</header>
      {children}
      <footer>footer</footer>
    </div>
  );
};
