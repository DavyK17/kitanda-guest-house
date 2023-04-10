/* IMPORTS */
import { useState, useMemo } from "react";
import { getUser } from "../../api/Account";

/* COMPONENT */
const Details = () => {
    // Account state
    const [account, setAccount] = useState();
    const fetchAccount = async () => {
        let data = await getUser();
        if (data) setAccount(data);
    }

    useMemo(() => {
        fetchAccount();
    }, []);

    // Return user details
    return (
        <>
            <section id="auth-top">
                <div className="background black">
                    <h1 className="bold uppercase">Account</h1>
                    <p>Manage your user account.</p>
                </div>
            </section>
            <section id="auth-main">
                <div className="content align-items-start">
                    {
                        !account ? null :
                            <>
                                <p>{account.id}</p>
                                <p>{account.firstName}</p>
                                <p>{account.lastName}</p>
                                <p>{account.phone}</p>
                                <p>{account.email}</p>
                            </>
                    }
                </div>
            </section>
        </>
    );
}

/* EXPORT */
export default Details;