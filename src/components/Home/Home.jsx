import Top from "./Top";
import About from "./About";
import Amenities from "./Amenities";
import Contact from "./Contact";

const Home = () => {
    return (
        <>
            <Top />
            <About />
            <div className="google-map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7932552480142!2d36.7756095145725!3d-1.2988113990526837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1ba4ec8ef6a3%3A0x7662b0ae7a54a1bf!2sMalazi%20Bed%20%26%20Breakfast!5e0!3m2!1sen!2ske!4v1608029659814!5m2!1sen!2ske" title="Google map" width="100%" height="100%" frameBorder="0" style={{ border: 0 }} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
            </div>
            <Amenities />
            <Contact />
        </>
    )
}

export default Home;