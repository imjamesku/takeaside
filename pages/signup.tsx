import React from "react";
import SignUp from "../src/components/SignUp/SignUp";
import Layout from "../src/components/Layout/Layout";

interface Props {}

const signup = (props: Props) => {
  return (
    <div>
      <Layout title="Create an account now! | imbiased">
        <SignUp />
      </Layout>
    </div>
  );
};

export default signup;
