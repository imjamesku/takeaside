import React from "react";
import SignIn from "../src/components/SignIn/SignIn";
import Layout from "../src/components/Layout/Layout";

interface Props {}

const signin = (props: Props) => {
  return (
    <div>
      <Layout title="Log in | imbiased">
        <SignIn />
      </Layout>
    </div>
  );
};

export default signin;
