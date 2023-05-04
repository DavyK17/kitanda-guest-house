/* IMPORTS */
import Grid from "./Grid";

import image1 from "../../assets/img/gallery/image1.webp";
import image2 from "../../assets/img/gallery/image2.webp";
import image3 from "../../assets/img/gallery/image3.webp";
import image4 from "../../assets/img/gallery/image4.webp";
import image5 from "../../assets/img/gallery/image5.webp";
import image6 from "../../assets/img/gallery/image6.webp";
import image7 from "../../assets/img/gallery/image7.webp";
import image8 from "../../assets/img/gallery/image8.webp";
import image9 from "../../assets/img/gallery/image9.webp";
import image10 from "../../assets/img/gallery/image10.webp";
import image11 from "../../assets/img/gallery/image11.webp";
import image12 from "../../assets/img/gallery/image12.webp";
import image13 from "../../assets/img/gallery/image13.webp";
import image14 from "../../assets/img/gallery/image14.webp";
import image15 from "../../assets/img/gallery/image15.webp";

/* COMPONENT */
const Gallery = () => {
    let images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15];

    return (
        <>
            <section id="gallery-top">
                <div className="background black">
                    <h1 className="bold uppercase">Gallery</h1>
                    <p>Browse through images of our serene guest house to get a better feel for all our facilities and amenities.</p>
                </div>
            </section>
            <Grid images={images} />
        </>
    )
}

/* EXPORT */
export default Gallery;