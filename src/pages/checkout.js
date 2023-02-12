import React from "react";

const CheckOut = () => {
  return <div>Chekcoiut</div>;
};

export async function getServerSideProps(context) {
  const { params, req, res } = context;
  console.log(`req.`, req.cookies);
  return {
    props: {
      username: "Max",
    },
  };
}

export default CheckOut;
