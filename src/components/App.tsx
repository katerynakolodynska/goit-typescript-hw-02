import Modal from "react-modal";
import { useEffect, useState, useRef, MouseEvent } from "react";
import SearchBar from "./SearchBar/SearchBar";
import { Image, search } from "./pixabay-api";
import Loader from "./Loader/Loader";
import ImageGallery from "./ImageGallery/ImageGallery";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import ImageModal from "./ImageModal/ImageModal";

function App() {
  const [query, setQuery] = useState<string>(() => {
    const savedQuery = localStorage.getItem("query");
    return savedQuery ? JSON.parse(savedQuery) : "";
  });
  const [page, setPage] = useState<number>(1);
  const [response, setResponse] = useState<Image[]>([]);

  const [hasMoreResults, setHasMoreResults] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const takeQuery = (formQuery: string): void => {
    setQuery(formQuery);
    setPage(1);
    setResponse([]);
    setError("");
  };

  useEffect(() => {
    const fetchImages = async () => {
      if (!query) return;
      try {
        setLoading(true);
        const response = await search(query, page);
        setResponse((prevResponse) =>
          page === 1 ? response.results : [...prevResponse, ...response.results]
        );
        if (page !== 1) {
          setTimeout(() => {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            });
          }, 100);
        }
        const totalPages = Math.ceil(response.total_pages);
        setHasMoreResults(page < totalPages);
      } catch (err) {
        setError((err as Error).message || "Error occurred");
      } finally {
        setLoading(false);
        localStorage.setItem("query", JSON.stringify(query));
      }
    };
    fetchImages();
  }, [query, page]);

  const handleLoadMore = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const currentImgRef = useRef<string>("");
  const currentAltRef = useRef<string>("");

  const takeImg = (currentImg: string, alt: string): void => {
    currentImgRef.current = currentImg;
    currentAltRef.current = alt;
    setIsOpen(true);
  };

  const closeModal = (e: MouseEvent<HTMLButtonElement>): void => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  return (
    <>
      <SearchBar takeQuery={takeQuery} />

      {response.length > 0 && !error ? (
        <ImageGallery arrResult={response} takeImg={takeImg} />
      ) : (
        <ErrorMessage message={error} />
      )}
      {loading && <Loader />}
      {hasMoreResults && <LoadMoreBtn onLoadMore={handleLoadMore} />}
      <ImageModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        currentImg={currentImgRef.current}
        currentAlt={currentAltRef.current}
      />
    </>
  );
}

export default App;
