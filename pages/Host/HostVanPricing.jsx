import React from "react"
import { useOutletContext } from "react-router-dom"

export default function HostVanPricing() {
    const { currentVan } = useOutletContext()
    return (
        <>
            <h3 className="host-van-price">${currentVan.price}<span>/day</span></h3>
            <h3 className="host-van-price">${currentVan.price * 7 - 70}<span>/week</span></h3>
            <h3 className="host-van-price">${currentVan.price * 30 - 600}<span>/month</span></h3>
        </>

    )
}