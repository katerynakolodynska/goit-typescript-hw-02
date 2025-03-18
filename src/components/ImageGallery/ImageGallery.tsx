import s from "./ImageGallery.module.css";

import ImageCard from "../ImageCard/ImageCard";
import { Image } from "../pixabay-api";

interface ImageGalleryProps {
  arrResult: Image[];
  takeImg: (currentImg: string, alt: string) => void;
}

const ImageGallery = ({ arrResult, takeImg }: ImageGalleryProps) => {
  return (
    <ul className={s.list}>
      {arrResult.map(({ id, urls, alt_description }) => (
        <li
          className={s.item}
          key={id}
          onClick={() => takeImg(urls.regular, alt_description)}
        >
          <ImageCard img={urls.small} alt={alt_description} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
