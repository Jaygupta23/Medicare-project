import React from "react";
import Layout from "../component/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div style={{ marginTop: "5rem" }}>
        <div className="row contactus">
          <div className="col-md-5">
            <img
              src="/images/contactus.jpeg"
              alt="contactus"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-4 offset-1">
            <h2 className="bg-dark p-2 mb-5 text-white text-center">
              ABOUT US
            </h2>
            <ul className="fs-4">
            <li className="my-2">Data Security</li>
            <li className="my-2">Your Rights</li>
            <li className="my-2">Contact Us</li>
            <li className="my-2">Information We Collect</li>
            <li className="my-2">Third-Party Disclosure</li>
            <li className="my-2">How We Use Your Information</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
