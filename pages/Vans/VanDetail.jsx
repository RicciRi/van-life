import React from "react"
import { Link, useParams, useLocation, useNavigate } from "react-router-dom"
import { getVan, addVansToUserHost } from "../../api"

export default function VanDetail() {
    const [van, setVan] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const [errorMessage, setErrorMessage] = React.useState(false)
    const [doneMessage, setDoneMessage] = React.useState(false)
    const { id } = useParams()
    const location = useLocation()
    const userInAcount = localStorage.getItem("user")
    const navigate = useNavigate()



    React.useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVan(id)
                setVan(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadVans()
    }, [id])
    
    if (loading) {
        return <h1>Loading...</h1>
    }
    
    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }

    const search = location.state?.search || "";
    const type = location.state?.type || "all";

    async function rentVan() {    
        localStorage.removeItem("hostVanId");
        if(!userInAcount) {
            setErrorMessage(true)
        } else {
            setDoneMessage(true)
            localStorage.setItem("hostVanId", `${id}`)
            navigate("/host/form?")

        }
        
    }
    
    return (
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {type} vans</span></Link>
            
            {van && (
                <div className="van-detail">
                    <img src={van.imageUrl} />
                    <i className={`van-type ${van.type} selected`}>
                        {van.type}
                    </i>
                    <h2>{van.name}</h2>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>

                    {errorMessage && <p className="login-error" >You must login first</p>}
                    {doneMessage && <p className="login-done" >Done! Van added to your VanList!  </p>}
                    <button 
                    
                    onClick={() => rentVan()}
                    className="link-button">Rent this van</button>
                </div>
            )}
        </div>
    )
}