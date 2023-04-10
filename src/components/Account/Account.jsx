import Auth from "./Auth";
import Details from "./Details";

const Account = props => {
    const { user, setUser } = props;

    return user ? <Details user={user} setUser={setUser} /> : <Auth setUser={setUser} />;
}

export default Account;