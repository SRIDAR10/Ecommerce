import React from "react";
import { Carousel, Flex, Typography } from "antd";

const { Title,Text } = Typography;

const contentStyle = {
  marginTop: "20px",
  height: "300px",
  width: "100%",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "white",
  paddingBottom: "1em",
};

const Home = () => {
  return (
    <div className="home-page">
      <img src="https://unitechpipes.com/wp-content/uploads/2020/09/6.jpg?id=4069" />
      <div  className="padding-3em">
      <Title style={{ marginTop: "20px",textAlign: "center" }} rootClassName="title" underline>NS POLYMERS </Title>
      <Title style={{ marginTop: "20px" }} rootClassName="title" underline>About Our Company</Title>
      <Flex vertical>
      <Text className="text">
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
        VILLAGE, CHETTINAYAKKAN PATTI POST CHETTINAYAKKAN PATTI - KALLIPATTI ROAD
        Dindigul , Tamil Nadu.</Text>
        <Text className="text mt-10">
         Water is a necessity for every living organism to
        survive and flourish. Water being the most precious resource its
        excessive use has led to its dire scarcity too. We at UNITECH PVC Pipes
        have been at the forefront of researching and developing various piping
        systems for diverse applications. The vast country that India is
        geographically, and demographically with a massive population it becomes
        a mammoth task to provide access to safe drinking water. The frequency
        of drought spells has increased leading to water scarcity which has led
        to a huge demand for water and piping systems for conveyance and
        management. We take pride in solving the water problem being renowned
        and considered as the best manufacturer of PVC pipes in India for the
        most effective piping systems for varied applications. Our company’s
        objective is to meet the ever-growing demand of our clientele for waste
        management, water supplies to industrial, residential, and agricultural
        segments by developing and delivering a high-quality range of piping
        systems. We understand the needs of our customers like no one else, and
        this has made us strive for excellence in every project we undertake,
        getting us recognition in India as well as around the world. All our
        efforts have made Ns Polymers pipes win a great many awards and
        accolades. Ns Polymers pipes are your one-stop shop for all piping
        products. Our diverse and huge range of pipes and fittings are
        manufactured according to International standards. We have always
        endeavored to comply with the highest quality standards in the industry.
        Our constant urge to innovate and create cost-effective solutions that
        focus on finding a solution to the core problem of water and waste
        management has made us the top PVC pipes company in India. Ns Polymers
        pipes have a factory unit with huge infrastructure in Barnala with a
        state of an art manufacturing entity. We are a proud team of engineers,
        technical stewards, and sheer determined employees who endeavor to make
        our company rank amongst the top 10 PVC companies in India.
        </Text>
        </Flex>
        </div>
      <Flex  align="center" justify="center" gap={20} className="padding-3em">
        <img src="https://unitechpipes.com/wp-content/uploads/2020/10/1488-2048x1365.jpg" width={600} height={600}/>
        <Flex vertical>
          <Title rootClassName="title" underline>Mission</Title>
          <Text className="text">
            Maximize value in terms of client satisfaction by creating a high
            performance organization with innovation and leadership. To strive
            for excellence by maintaining and upgrading the standards in Quality
            and Safety endeavors.
          </Text>
        </Flex>
      </Flex>
      <Flex align="center" justify="center" gap={20} className="padding-3em">
      <Flex vertical>
          <Title className="title" underline>Vision</Title>
          <Text rootClassName="text">
          We aim to be sincerely global and be the trendsetters in the industry by setting high values and morals. We see ourselves and our fellow men leading the path of success. We endeavor to create an open environment which promotes progressive learning and innovation.
          </Text>
        </Flex>
        <img src="https://unitechpipes.com/wp-content/uploads/2020/10/1586-2048x1367.jpg" width={600} height={600}/>
      </Flex>
    </div>
  );
};

export default Home;
