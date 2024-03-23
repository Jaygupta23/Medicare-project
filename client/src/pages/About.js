import React from "react";
import Layout from "../component/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommerce app"}>
      <div style={{ marginTop: "5rem" }}>
        <div className="row about">
          <div className="col-md-6">
            <img
              src="/images/about.jpeg"
              alt="about"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-4">
            <h2 className="bg-dark p-2 mb-4 text-white text-center">
              ABOUT US
            </h2>
            <em className="text-justify fs-6 ">
              A Medicare pharmacy eCommerce website is an online platform
              specifically designed to cater to the needs of Medicare
              beneficiaries by offering a comprehensive range of prescription
              drugs, over-the-counter medications, medical supplies, and
              healthcare products.
            </em>
            <h3 className="mt-4">Key Features:</h3>
            <ol className="text-justify">
              <li>
                <strong>Prescription Fulfillment: </strong> We offer a seamless
                prescription fulfillment process where users can upload their
                prescriptions securely or provide prescription details for
                verification. Our licensed pharmacists ensure accuracy and
                timely delivery of prescription medications.
              </li>
              <li>
                <strong>Medication Management: </strong> Users can create
                personalized profiles to manage their medications, view
                prescription history, set reminders for refills, and track
                medication adherence for better health management.
              </li>
              <li>
                <strong>Wide Product Range: </strong> Our eCommerce platform
                features an extensive inventory of prescription drugs,
                over-the-counter medications, vitamins, supplements, and medical
                supplies, catering to diverse healthcare needs.
              </li>
              <li>
                <strong>Secure Transactions: </strong> Our website ensures
                secure transactions and compliance with HIPAA regulations to
                safeguard users' personal and medical information. We utilize
                encryption technologies and secure payment gateways to protect
                sensitive data.
              </li>
              
            </ol>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
