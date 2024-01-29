import React from 'react';
import { Link } from 'react-router-dom';
import { getHostVans, deleteVansFromHost } from '../../api';

export default function HostVans() {
    const [vans, setVans] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [userData, setUserData] = React.useState(
        localStorage.getItem('user')
    );

    React.useEffect(() => {
        async function loadVans() {
            setLoading(true);
            try {
                const data = await getHostVans();
                setVans(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        loadVans();
    }, [userData]);

    async function stopHosting(e, id) {
        e.preventDefault();
        await deleteVansFromHost(id);
        setUserData(localStorage.getItem('user'));
    }

    const hostVansEls = vans.map((van) => (
        <Link to={van.id} key={van.id} className="host-van-link-wrapper">
            <div className="host-van-single" key={van.id}>
                <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}/day</p>
                </div>
                <button
                    onClick={(e) => stopHosting(e, van.id)}
                    className="delete-host-van"
                >
                    Stop hosting
                </button>
            </div>
        </Link>
    ));

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        n;
        return <h1>There was an error: {error.message}</h1>;
    }

    return (
        <section>
            {vans.length === 0 ? (
                <>
                    <h2>
                        Your host-list is empty but you can add some{' '}
                        <Link to="/vans" className="vans-link">
                            HERE
                        </Link>
                    </h2>
                </>
            ) : (
                <>
                    <h1 className="host-vans-title">Your listed vans</h1>
                    <div className="host-vans-list">
                        <section>{hostVansEls}</section>
                    </div>
                </>
            )}
        </section>
    );
}
