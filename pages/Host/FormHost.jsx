import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVan, addVansToUserHost } from '../../api';

export default function FormHost() {
    const [cardNumber, setCardNumber] = React.useState('');
    const [vanId, setVanId] = React.useState(localStorage.getItem('hostVanId'));
    const [van, setVan] = React.useState(null);
    const [hostDays, setHostDays] = React.useState(1);
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                if (vanId) {
                    const vanData = await getVan(vanId.toString());
                    setVan(vanData);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [vanId]);

    function limitInputLength(e) {
        if (e.target.value.length > 3) {
            e.target.value = e.target.value.slice(0, 3);
        }
    }
    const handleCardNumberChange = (e) => {
        let input = e.target.value;
        // Remove all non-numeric characters
        input = input.replace(/\D/g, '');
        // Add spaces every 4 digits
        input = input.replace(/(\d{4})/g, '$1 ');
        // Removing spaces at the end of a line
        input = input.trim();
        setCardNumber(input);
    };

    function handleSubmit(e) {
        e.preventDefault();

        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        const totalPrice = (hostDays * van.price).toString();

        addVansToUserHost(vanId.toString(), totalPrice, formattedDate);
        navigate('/vans', { replace: true });
    }

    function handleChangeDays(e) {
        setHostDays(e.target.value);
    }

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            {van && (
                <>
                    <div className="host-van-single" key={van.id}>
                        <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                        <div className="host-van-info">
                            <h3>{van.name}</h3>
                            <p>${van.price}/day</p>
                        </div>
                    </div>
                    <div className="choose-days-section">
                        <p>Choose the number of days for car rental</p>
                        <div>
                            <select
                                type="number"
                                name="days"
                                id="numberSelector"
                                value={hostDays}
                                maxLength={2}
                                onChange={handleChangeDays}
                            >
                                {[...Array(30).keys()].map((number) => (
                                    <option key={number + 1} value={number + 1}>
                                        {number + 1}
                                    </option>
                                ))}
                            </select>
                            <h2>Price: {hostDays * van.price}$</h2>
                        </div>
                    </div>
                </>
            )}
            <div className="host-form-container">
                <h1>Rent {van && van.name}</h1>
                <form onSubmit={handleSubmit} className="host-form">
                    <div>
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            required
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder=""
                        />
                    </div>
                    <div>
                        <label htmlFor="secondName">Second Name:</label>
                        <input
                            required
                            type="text"
                            name="secondName"
                            id="secondName"
                        />
                    </div>
                    <div>
                        <label htmlFor="cardNumber">Card number:</label>
                        <input
                            required
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            maxLength={19}
                            minLength={19}
                        />
                    </div>
                    <div>
                        <label htmlFor="cvv">CVV code:</label>
                        <input
                            required
                            type="number"
                            name="cvv"
                            id="cvv"
                            onInput={limitInputLength}
                            minLength={3}
                            maxLength={3}
                        />
                    </div>

                    <button>Buy</button>
                </form>
            </div>
        </>
    );
}
