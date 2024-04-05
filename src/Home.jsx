import React from "react";
import { Carousel } from "antd";

const contentStyle = {
  marginTop: "20px",
  height: "300px",
  width: "100%",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "white",
  paddingBottom:"1em"
};

const Home = () => {
  return (
    <div>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>
            <img
              className="caro-img"
              src="https://5.imimg.com/data5/IG/NQ/MY-29577122/carbonfibertubes1_1533539506-1000x1000.jpg"
              alt="Supreme CPVC Pipe"
            />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
          <img
              className="caro-img"
              src="https://5.imimg.com/data5/SELLER/Default/2023/7/326715895/GG/MT/KK/97135163/ppr-c-pipe-250x250.jpg"
             
              alt="Supreme CPVC Pipe"
            />
            
               </h3>
        </div>
     
        <div>
          <h3 style={contentStyle}>
          <img
              className="caro-img"
              src="https://5.imimg.com/data5/SELLER/Default/2023/6/319782870/WC/LA/WG/190423826/supreme-pvc-casing-pipe-2--500x500.jpg"
             
              alt="Supreme CPVC Pipe"
            />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
          <img
              className="caro-img"
              src="https://5.imimg.com/data5/SELLER/Default/2022/9/PB/KN/AA/6095921/prince-upvc-pipes-500x500.jpg"
             
              alt="Supreme CPVC Pipe"
            />
          </h3>
        </div>
      </Carousel>
      <h1 style={{textAlign:"center"}}>About Us</h1>
      <p className="about-txt">
        Ns Polymers Private Limited is an unlisted private company incorporated
        on 19 March, 2023. It is classified as a private limited company and is
        located in , Tamil Nadu. It's authorized share capital is INR 15.00 lac
        and the total paid-up capital is INR 10.00 lac. The current status of Ns
        Polymers Private Limited is - Active. Details of the last annual general
        meeting of Ns Polymers Private Limited are not available. The company is
        yet to submit its first full-year financial statements to the registrar.
        Ns Polymers Private Limited has two directors - Muthusami Arasappan and
        Karuppiah Dhanabal. The Corporate Identification Number (CIN) of Ns
        Polymers Private Limited is U22191TZ2023PTC027938. The registered office
        of Ns Polymers Private Limited is at SELVARANI CAMPUS, ALAKKUVARPATTI
        VILLAGE, CHETTINAYAKKAN PATTI POSTCHETTINAYAKKAN PATTI - KALLIPATTI ROAD
        Dindigul , Tamil Nadu.
      </p>
    </div>
  );
};

export default Home;
