import React from 'react';
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

const Checkout = ({openCheckOutPage, toggleCheckoutDrawer}) => {
  return (
    <Drawer
    open={openCheckOutPage}
    onClose={toggleCheckoutDrawer}
    direction="right"
    className="drawer"
    size="1000px"
  >
    Checkout
  </Drawer>
  );
};

export default Checkout;