import { Carousel } from "react-bootstrap";
import pizza1 from "../assets/images/pizza1.jpg";
import pizza2 from "../assets/images/pizza2.jpg";
import pizza3 from "../assets/images/pizza3.jpg";
import pizza4 from "../assets/images/pizza4.jpg";
import pizza5 from "../assets/images/pizza5.jpg";

const slides = [pizza1, pizza2, pizza3, pizza4, pizza5];

function CarouselComponent() {
  return (
    <section id="home" aria-label="Featured pizzas">
      <Carousel className="pizza-carousel">
        {slides.map((slide, index) => (
          <Carousel.Item key={slide}>
            <img
              className="d-block w-100 carousel-image"
              src={slide}
              alt={`Pizza House slide ${index + 1}`}
            />
            <Carousel.Caption>
              <h1>Neapolitan Pizza</h1>
              <p>
                If you are looking for a traditional Italian pizza, the
                Neapolitan is the best option.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
}

export default CarouselComponent;
