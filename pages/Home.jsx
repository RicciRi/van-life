import React from "react"
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className="home-container">
            <h1>You’ve got plans?
             We’ve got vans!</h1>
            <p>Add adventure to your life by joining #vanlife. Rent the van that will make your trip unforgettable.</p>
            <Link to="vans">Find your van</Link>
        </div>
    )
};