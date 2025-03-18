import Modal from "react-modal";
import s from "./ImageModal.module.css";
import { FC, MouseEvent } from "react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: (e: MouseEvent<HTMLButtonElement>) => void;
  currentImg: string;
  currentAlt: string;
}

const ImageModal: FC<ImageModalProps> = ({
  isOpen,
  onClose,
  currentImg,
  currentAlt,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      padding: "0",
      margin: "0",
      width: "80%",
      height: "auto",
      maxHeight: "90vh",
      overflow: "hidden",
      borderRadius: "0",
      border: "none",
    },
  };
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <img className={s.img} src={currentImg} alt={currentAlt}></img>
      </Modal>
    </div>
  );
};

export default ImageModal;
