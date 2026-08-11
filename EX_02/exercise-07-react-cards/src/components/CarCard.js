function CarCard({ car }) {
  return (
    <div className="col-md-4">
      <div className={`card h-100 border-${car.color} bg-${car.color} p-3`}>
        <div
          className="car-image d-flex align-items-center justify-content-center"
          role="img"
          aria-label="Car"
        >
          🚙
        </div>
        <div className="card-body text-center">
          <h5 className="card-title">{car.name}</h5>
          <p className="card-text">{car.description}</p>
        </div>
      </div>
    </div>
  );
}

export default CarCard;
