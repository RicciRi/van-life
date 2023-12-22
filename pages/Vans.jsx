import React from "react"
import { Link } from "react-router-dom"


export default function Vans() {
    const [vans, setVans] = React.useState([])

    React.useState(() => {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => setVans(data.vans))
    }, [])

    const vanElement = vans.map((van) => (
        <section key={van.id} className="section-items">
            <Link to={`/vans/${van.id}`}>
                <img className="car-image" src={van.imageUrl} alt="Car" />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </section>
    ))

    return (
        <div className="vans">
            <h2>Explore our van options</h2>
            <div className="container-items">
                {vanElement}
            </div>
        </div>
    )
}