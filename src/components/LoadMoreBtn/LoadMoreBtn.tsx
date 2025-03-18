import s from "./LoadMoreBtn.module.css";

interface LoadMoreProps {
  onLoadMore: () => void;
}

const LoadMoreBtn = ({ onLoadMore }: LoadMoreProps) => {
  return (
    <button className={s.btn} onClick={() => onLoadMore()}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
