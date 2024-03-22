import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'

const Layout = ({ children, title, description, keywords, author }) => {


    return (
        <div>
            <Helmet>
                <meta charSet='utf-8' />
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
                <meta name='author' content={author} />
                <title>{title}</title>
            </Helmet>
            <Header style={{ width: "100%"}} />
            <main style={{ minHeight: "70vh" }}> {children} </main>
            <Footer style={{ width: "100%"}} />
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
