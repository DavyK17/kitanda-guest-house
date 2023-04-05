import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

const Grid = props => {
    return (
        <section id="gallery" className="pswp-gallery">
            <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]} mode="lg-fade" download={false}>
                {
                    props.images.map((image, i) => (
                        <a
                            key={`image-${i}`}
                            href={image}
                            data-src={image}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src={image} alt="" />
                        </a>
                    ))
                }
            </LightGallery>
        </section>
    )
}

export default Grid;