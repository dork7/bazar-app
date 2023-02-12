import { getUser } from "@/utils/api.utils";
import React from "react";

const CheckOut = (props) => {
  const { userData } = props;
  return <div>Chekcoiut {JSON.stringify(userData)}</div>;
};

export async function getServerSideProps(context) {
  const { params, req, res } = context;
  const userId = req.cookies.userId;
  const userData = await getUser(userId);
  if (!userData) {
    return {
      props: {
        error: "User not found",
      },
    };
  }
  return {
    props: {
      userData,
    },
  };
}

export default CheckOut;
