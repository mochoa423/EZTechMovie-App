import React, { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "./CartContext";
import products from "./data";
import { fetchMovies, fetchTVShows } from "./movieData";

const Movies = () => {
  const { addToCart, cartItems, setWarning } = useContext(CartContext);
  const [movies, setMovies] = useState([]);
  const [tvShows, setTVShows] = useState([]);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const movieScrollRef = useRef(null);
  const tvScrollRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!user);

    const loadContent = async () => {
      try {
        const [movieData, tvData] = await Promise.all([
          fetchMovies(),
          fetchTVShows(),
        ]);
        setMovies(movieData);
        setTVShows(tvData);
      } catch (err) {
        setError("Failed to load streaming content.");
      }
    };

    if (user) loadContent();
  }, []);

  const scrollContainer = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleAddToCart = (product) => {
    const alreadyInCart = cartItems.some(
      (item) => item.id === product.id && item.type === product.type
    );

    if (alreadyInCart) {
      setWarning("This item is already in your cart.");
      return;
    }

    if (product.type === "subscription") {
      const hasSubscription = cartItems.some(
        (item) => item.type === "subscription"
      );
      if (hasSubscription) {
        setWarning("You can only add one subscription at a time.");
        return;
      }
    }
    addToCart(product);
  };

  const renderAddButton = (item) => {
    const isInCart = cartItems.some((i) => i.id === item.id);
    return isInCart ? (
      <button className="disabled-button" disabled>
        Already in Cart
      </button>
    ) : (
      <button
        className="add-button"
        onClick={() =>
          handleAddToCart({
            id: item.id,
            service: item.title,
            serviceInfo: "Digital media",
            price: 3.99,
            img: `https://image.tmdb.org/t/p/w300${item.poster_path}`,
            amount: 1,
            type: "media",
          })
        }
      >
        Add to Cart
      </button>
    );
  };

  return (
    <div className="page">
      <h1>Choose Your Subscription</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.img}
              alt={product.service}
              className="product-image"
            />
            <h2>{product.service}</h2>
            <p>{product.serviceInfo}</p>
            <p>${product.price}</p>
            {product.type === "subscription" &&
            cartItems.some((item) => item.type === "subscription") ? (
              <button
                className="disabled-button"
                disabled
                title="You can only add one subscription"
              >
                Add to Cart (Limit 1)
              </button>
            ) : (
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            )}
          </div>
        ))}
      </div>

      {!isLoggedIn && (
        <p style={{ marginTop: "2rem", fontWeight: "bold", color: "#444" }}>
          Please sign in with Google to view and add movies or TV shows.
        </p>
      )}

      {isLoggedIn && (
        <>
          <h1 style={{ marginTop: "3rem" }}>Popular Movies</h1>
          {error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <div style={{ position: "relative" }}>
              <button
                className="scroll-btn left"
                onClick={() => scrollContainer(movieScrollRef, "left")}
              >
                &#8249;
              </button>
              <div className="movie-scroll-container" ref={movieScrollRef}>
                {movies.map((movie) => (
                  <div key={movie.id} className="product-card">
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      className="product-image media-image"
                    />
                    <h2>{movie.title}</h2>
                    <p>{movie.release_year}</p>
                    {renderAddButton(movie)}
                  </div>
                ))}
              </div>
              <button
                className="scroll-btn right"
                onClick={() => scrollContainer(movieScrollRef, "right")}
              >
                &#8250;
              </button>
            </div>
          )}

          <h1 style={{ marginTop: "3rem" }}>Popular TV Shows</h1>
          {error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <div style={{ position: "relative" }}>
              <button
                className="scroll-btn left"
                onClick={() => scrollContainer(tvScrollRef, "left")}
              >
                &#8249;
              </button>
              <div className="movie-scroll-container" ref={tvScrollRef}>
                {tvShows.map((show) => (
                  <div key={show.id} className="product-card">
                    <img
                      src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
                      alt={show.title}
                      className="product-image media-image"
                    />
                    <h2>{show.title}</h2>
                    <p>{show.release_year}</p>
                    {renderAddButton(show)}
                  </div>
                ))}
              </div>
              <button
                className="scroll-btn right"
                onClick={() => scrollContainer(tvScrollRef, "right")}
              >
                &#8250;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Movies;
