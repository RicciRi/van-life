import React from "react"
import { Link, useSearchParams } from "react-router-dom"

export default function Vans() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [vans, setVans] = React.useState([])

    React.useEffect(() => {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => setVans(data.vans))
    }, [])

    const typeFilter = searchParams.get("type")
    const filteredVans = typeFilter
        ? vans.filter(van => van.type === typeFilter)
        : vans

    const vanElements = filteredVans.map(van => (
        <div key={van.id} className="van-tile">
            <Link to={`/vans/${van.id}`}>
                <img src={van.imageUrl} />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ))

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list-filter-buttons">
                <button className="van-type simple" onClick={() => setSearchParams({type: "simple"})}>simple</button>
                <button className="van-type luxury" onClick={() => setSearchParams({type: "luxury"})}>luxury</button>      
                <button className="van-type rugged" onClick={() => setSearchParams({type: "rugged"})}>rugged</button>
                <button className="van-type clear-filters" onClick={() => setSearchParams({})}>Clear</button>
            </div>
            <div className="van-list">
                {vanElements}
            </div>
        </div>
    )
}