import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./ImageModal/ImageModal";

const API_URL = "https://api.unsplash.com/search/photos";
const API_KEY = "_rKyQLUGDzl7tzcQK7WcJDurkMLwQ4PnrwJDlA65Dqk";

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_URL}?query=${query}&page=${page}&per_page=12&client_id=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Something went wrong, try again later.");
        }

        const data = await response.json();
        setImages((prevImages) =>
          page === 1 ? data.results : [...prevImages, ...data.results]
        );
        setHasMore(data.results.length > 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    if (newQuery === query) return;

    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setError(null);
    setHasMore(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" />

      {error && <ErrorMessage message={error} />}

      <ImageGallery images={images} onImageClick={handleImageClick} />

      {isLoading && <Loader />}

      {hasMore && !isLoading && <LoadMoreBtn onClick={handleLoadMore} />}

      <ImageModal
        isOpen={!!selectedImage}
        onRequestClose={handleCloseModal}
        image={selectedImage}
      />
    </div>
  );
};

export default App;
