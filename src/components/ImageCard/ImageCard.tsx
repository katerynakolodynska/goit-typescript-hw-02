import s from "./ImageCard.module.css";

interface ImgCardProps {
  img: string;
  alt: string;
}

const ImageCard = ({ img, alt }: ImgCardProps) => {
  return (
    <div>
      <img className={s.card} src={img} alt={alt} />
    </div>
  );
};

export default ImageCard;
