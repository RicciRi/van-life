import React from 'react';

export default function Income() {
    const [user, setUser] = React.useState(
        JSON.parse(localStorage.getItem('user'))
    );
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [transactionElement, setTransactionElement] = React.useState(false);
    const [countTransaction, setCountTransaction] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
        setLoading(true);
        let sum = 0;
        let count = 0;
        try {
            setTimeout(() => {
                const transactionElements = user.transaction.map((el) => {
                    const priceNumber = parseInt(el.cash, 10);
                    const date = el.days;
                    sum = sum + priceNumber;
                    count++;
                    return (
                        <div className="transaction" key={priceNumber}>
                            <h3>${priceNumber}</h3>
                            <p>{date}</p>
                        </div>
                    );
                });
                setTotalPrice(sum);
                setCountTransaction(count);
                setTransactionElement(transactionElements);
            }, 200);
        } catch (error) {
            console.log('Error: ', error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    }, [user]);

    if (loading) {
        return (
            <div className="income">
                <h1>Loading...</h1>
            </div>
        );
    }
    return (
        <div className="income">
            <h1>Welcome!</h1>
            <h1>${totalPrice}</h1>
            <div className="history-section">
                {countTransaction < 1 ? (
                    <h2>You don't have transactions.</h2>
                ) : (
                    <>
                        <h4>Your transactions ({countTransaction})</h4>
                        <p>last 30 days</p>
                    </>
                )}
            </div>
            {transactionElement}
        </div>
    );
}
