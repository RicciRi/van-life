import React from "react"


export default function Vans() {
    const [vans, setVans] = React.useState([])
    React.useState(() => {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => setVans(data.vans))
    })

    const vanElement = vans.map((van) => (
        <section key={van.id} className="section-items">
            <img className="car-image" src={van.imageUrl} alt="Car" />
            <div className="van-info">
                <h3>{van.name}</h3>
                <p>${van.price}<span>/day</span></p>
            </div>
            <i className={`van-type ${van.type} selected`}>{van.type}</i>
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