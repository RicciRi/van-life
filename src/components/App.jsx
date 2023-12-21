import React from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import About from "./About"
import Home from "./Home"
import Footer from "./Footer"

export default function App() {
    return (
        <>
        <BrowserRouter>
            <header>
                <Link className="site-logo" to="/">#VanLife</Link>
                <nav>
                    <Link to="/about">About</Link>
                </nav>
            </header>
            <Routes>
                <Route path={"/about"} element={<About />} />
                <Route path={"/"} element={<Home />} />
            </Routes>

            <Footer/>
        </BrowserRouter>
        </>

    )
}


