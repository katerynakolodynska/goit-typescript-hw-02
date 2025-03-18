import ClipLoader from "react-spinners/ClipLoader";
import { FC } from "react";

const Loader: FC = () => {
  return (
    <div>
      <ClipLoader color="#36d7b7" size={50} />
    </div>
  );
};

export default Loader;
