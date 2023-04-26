/* IMPORTS */
import Grid from "./Grid";

import image1 from "../../assets/img/gallery/image1.JPG";
import image2 from "../../assets/img/gallery/image2.JPG";
import image3 from "../../assets/img/gallery/image3.JPG";
import image4 from "../../assets/img/gallery/image4.JPG";
import image5 from "../../assets/img/gallery/image5.JPG";
import image6 from "../../assets/img/gallery/image6.JPG";
import image7 from "../../assets/img/gallery/image7.JPG";
import image8 from "../../assets/img/gallery/image8.JPG";
import image9 from "../../assets/img/gallery/image9.JPG";
import image10 from "../../assets/img/gallery/image10.JPG";
import image11 from "../../assets/img/gallery/image11.JPG";
import image12 from "../../assets/img/gallery/image12.JPG";
import image13 from "../../assets/img/gallery/image13.JPG";
import image14 from "../../assets/img/gallery/image14.jpg";
import image15 from "../../assets/img/gallery/image15.jpg";

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