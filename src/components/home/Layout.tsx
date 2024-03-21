import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

const Layout = (props: {
    children: React.ReactNode
}) => {
  return (
    <>
        <Header/>


        <Outlet />


        <Footer />
    </>
  )
}

export default Layout