import Auth from "./Auth";

const Account = props => {
    const { user } = props;

    return user ? null : <Auth />;
}

export default Account;