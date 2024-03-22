import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'
import { useCart } from '../../context/Cart'

const Layout = ({ children, title, description, keywords, author }) => {
const {toggle} = useCart()

    return (
        <div>
            <Helmet>
                <meta charSet='utf-8' />
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
                <meta name='author' content={author} />
                <title>{title}</title>
            </Helmet>
            <Header  />
            <main className={`${toggle}?"mainContent":"" fullContent`} style={{ minHeight: "70vh", width: "100%" }}> {children} </main>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: "Ecommerce app - shop now",
    description: "Mern Stack Project",
    keywords: "mern, react, node, mongodb",
    author: "Aman Arora",
}

export default Layout
