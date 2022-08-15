import React from "react";
//ICONS
import { FaLinkedin, FaTwitterSquare, FaFacebookSquare, FaInstagramSquare} from "react-icons/fa";

const FooterComponent = (props) => {
  return (
    <div className="container-fluid w-100 shadow-lg">
      <div className="container">
        <div className="row pt-5 pb-2">
          <div className="col-12 col-md-3">
            <span className="fw-bold fs-4">E-SHOP</span>
            <span className="lead ms-1 fs-4">| Furniture</span>
          </div>
          <div className="col-12 col-md-3">
            <span className="d-block fw-bold">Products</span>
            <span className="d-block">Living Room</span>
            <span className="d-block">Bedroom</span>
            <span className="d-block">Kitchen</span>
          </div>
          <div className="col-12 col-md-3">
            <span className="d-block fw-bold">Company</span>
            <span className="d-block">About Us</span>
            <span className="d-block">Career</span>
          </div>
          <div className="col-12 col-md-3">
            <span className="d-block fw-bold w-100">Follow us</span>
            <span className="d-flex">
              <FaFacebookSquare size={28} style={{ paddingRight: "5px" }} />
              <FaInstagramSquare size={28} style={{ paddingRight: "5px" }} />
              <FaTwitterSquare size={28} style={{ paddingRight: "5px" }} />
              <FaLinkedin size={28} style={{ paddingRight: "5px" }} />
            </span>
          </div>
        </div>
        <div className="container text-center pb-5">
          <span style={{color : '#ccc'}}>© 2022 ESHOPEngineer. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
