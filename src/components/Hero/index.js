import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { Box } from "@chakra-ui/react";
const imgList = [
  "/assets/images/hero/1.jpg",
  "/assets/images/hero/2.jpg",
  "/assets/images/hero/3.jpg",
  "/assets/images/hero/5.png",
];
const Hero = () => {
  return (
    <Box minH={450} w={"100%"}>
      <Carousel autoPlay infiniteLoop showArrows={false} showThumbs={false}>
        {imgList.map((item, idx) => {
          return (
            <Box key={item} maxH={450}>
              <Image
                height={400}
                width={600}
                alt={item}
                src={item}
                style={{ objectFit: "fit" }}
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
