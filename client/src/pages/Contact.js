import React from 'react'
import Layout from '../component/Layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from 'react-icons/bi'

const Contact = () => {
    return (
        <Layout title={"Contact us"} >
        <div style={{ marginTop: "5rem" }} >
            <div className="row contactus" >
                <div className="col-md-5">
                    <img src="/images/contactus.jpeg" alt="contactus" style={{ width: "100%" }} />
                </div>
                <div className="col-md-4 offset-1">
                    <h2 className="bg-dark p-2 text-white text-center">CONTACT US</h2>
                    <p className="text-justify mt-2 mb-5 fs-4">Any query any info about product, feel free to call anytime we are 24X7 available</p>
                    <a href='mailTo:jaygupta7655@gmail.com' className='text-secondary text-decoration-none fs-4'><BiMailSend /> : jaygupta7655@gmail.com</a>
                    <br/><br/><a href='tel:6397385825'  className='text-secondary text-decoration-none  fs-4'><BiPhoneCall /> : 6397385825</a>
                    <br/><br/><a href='tel:6397385825' className='text-secondary text-decoration-none  fs-4'><BiSupport /> : 9457000322 (toll free)</a>
                </div>
            </div>
            </div>
        </Layout>
    )
}

export default Contact
