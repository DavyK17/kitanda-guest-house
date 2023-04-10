import Auth from "./Auth";
import Details from "./Details";

const Account = props => {
    const { user } = props;

    return user ? <Details user={user} /> : <Auth />;
}

export default Account;