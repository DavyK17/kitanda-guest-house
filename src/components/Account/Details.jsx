const Details = props => {
    // Destructure props and user object
    const { user } = props;
    const { id, firstName, lastName, phone, email } = user;

    // Return user details
    return (
        <div>
            <p>{id}</p>
            <p>{firstName}</p>
            <p>{lastName}</p>
            <p>{phone}</p>
            <p>{email}</p>
        </div>
    );
}

export default Details;