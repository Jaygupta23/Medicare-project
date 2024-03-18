import React from 'react'
import Layout from '../component/Layout/Layout'

const About = () => {
    return (
        <Layout title={"About us - Ecommerce app"} >
            <div style={{ "margin-top": "5rem" }} >
                <div className="row about" >
                    <div className="col-md-6">
                        <img src="/images/about.jpeg" alt="about" style={{ width: "100%" }} />
                    </div>
                    <div className="col-md-4">
                        <p className="text-justify mt-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut numquam cupiditate iusto nulla quae, nostrum esse inventore facilis qui blanditiis quaerat. Placeat quae fugit iusto eaque libero iste vel voluptatem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum in dignissimos officiis asperiores repellendus quis similique dolores placeat tempora ducimus repudiandae deserunt necessitatibus labore, ex aperiam laborum voluptatibus laboriosam eum.</p>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default About
