import Carousel from "react-bootstrap/Carousel";

import image1 from "../../assets/img/gallery/IMG_20201210_095219.jpg";
import image2 from "../../assets/img/gallery/_MG_0145.JPG";
import image3 from "../../assets/img/gallery/_MG_0200.JPG";
import image4 from "../../assets/img/gallery/_MG_0010.JPG";
import image5 from "../../assets/img/gallery/_MG_0056.JPG";

const Slideshow = () => {
    return (
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
    )
}

export default Slideshow;