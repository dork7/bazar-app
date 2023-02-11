import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { Box } from "@chakra-ui/react";
const imgList = [
  "/assets/images/heroImg1.jpg",
  "/assets/images/heroImg2.jpg",
  "/assets/images/heroImg3.jpg",
  "/assets/images/heroImg4.jpg",
  "/assets/images/heroImg5.jpg",
];
const Hero = () => {
  return (
    <Box minH={450} w={"70%"}>
      <Carousel autoPlay infiniteLoop showArrows={false} showThumbs={false}>
        {imgList.map((item, idx) => {
          return (
            <Box key={item} maxH={450}>
              <Image
                height={400}
                width={600}
                alt={item}
                src={item}
                style={{ objectFit: "cover" }}
                // showThumbs={false}
              />
            </Box>
          );
        })}
      </Carousel>
    </Box>
  );
};

export default Hero;
