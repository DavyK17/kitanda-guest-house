/* IMPORTS */
import Carousel from "react-bootstrap/Carousel";

import image1 from "../../assets/img/slideshow/slide-0.webp";
import image2 from "../../assets/img/slideshow/slide-1.webp";
import image3 from "../../assets/img/slideshow/slide-2.webp";
import image4 from "../../assets/img/slideshow/slide-3.webp";
import image5 from "../../assets/img/slideshow/slide-4.webp";

/* COMPONENT */
const Slideshow = () => {
    return (
        <div data-testid="home-carousel">
            <Carousel>
                <Carousel.Item>
                    <img src={image1} alt="Entrance to guest house" style={{ bottom: "75%" }} />
                </Carousel.Item>
                <Carousel.Item>
                    <img src={image2} alt="Guest house garden" style={{ bottom: "75%" }} />
                </Carousel.Item>
                <Carousel.Item>
                    <img src={image3} alt="Guest house lobby" style={{ bottom: "60%" }} />
                </Carousel.Item>
                <Carousel.Item>
                    <img src={image4} alt="Guest house corridor" style={{ bottom: "75%" }} />
                </Carousel.Item>
                <Carousel.Item>
                    <img src={image5} alt="Bedroom" style={{ bottom: "30%" }} />
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

/* EXPORT */
export default Slideshow;