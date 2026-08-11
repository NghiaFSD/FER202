import CardDescription from "./CardDescription";
import CardImage from "./CardImage";
import CardTitle from "./CardTitle";

function SimpleCard({ item }) {
  return (
    <div className="simple-card">
      <CardImage imageUrl={item.imageUrl} />
      <div className="simple-card-content">
        <CardTitle text={item.title} />
        <CardDescription text={item.description} />
      </div>
    </div>
  );
}

export default SimpleCard;
