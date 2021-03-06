import React from "react"
import "twin.macro"
import Header from "./layout/header"
import Nav from "./layout/nav"
import Footer from "./layout/footer"

const LayoutWide = ({ children }) => {
  return (
    <div>
      <Header />
      <Nav />
      <div tw="container mx-auto flex flex-wrap py-6">
        <section tw="w-full flex flex-col px-3">{children}</section>
      </div>
      <Footer />
    </div>
  )
}
export default LayoutWide
