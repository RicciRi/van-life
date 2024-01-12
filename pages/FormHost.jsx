import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getVan, addVansToUserHost } from "../api";

export default function FormHost() {
    const [cardNumber, setCardNumber] = React.useState("");
    const vanId = JSON.parse(localStorage.getItem("hostVanId"))
    const [van, setVan] = React.useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        async function fetchData() {
            try {
                if (vanId) {
                    const vanData = await getVan(vanId.toString());
                    setVan(vanData);
                }
            } catch (error) {
                console.log(error)
            } 

        };

        fetchData();
    }, [vanId]);

    function limitInputLength(e) {
        if (e.target.value.length > 3) {
            e.target.value = e.target.value.slice(0, 3);
        }
    }
    const handleCardNumberChange = (e) => {
        let input = e.target.value;

        // Удаляем все нецифровые символы
        input = input.replace(/\D/g, "");

        // Добавляем пробелы каждые 4 цифры
        input = input.replace(/(\d{4})/g, "$1 ");

        // Удаляем пробелы в конце строки
        input = input.trim();

        // Обновляем состояние
        setCardNumber(input);
    };

    function handleSubmit(e) {
        e.preventDefault()
        addVansToUserHost(vanId.toString())
        navigate("/vans", { replace: true })
    }

    return (
        <div  className="host-form-container">
            <h1>Form for host</h1>

            <form onSubmit={handleSubmit} className="host-form">
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        required
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="" />
                </div>
                <div>
                    <label htmlFor="secondName">Second Name:</label>
                    <input
                        required
                        type="text"
                        name="secondName"
                        id="secondName" />
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
                    />
                </div>
                <div>
                    <label htmlFor="cvv">CVV code:</label>
                    <input
                        required
                        type="number"
                        name="cvv"
                        id="cvv"
                        minLength={3}
                        onInput={limitInputLength}
                    />
                </div>

                <button>Buy</button>
            </form>
        </div>
    );
}
