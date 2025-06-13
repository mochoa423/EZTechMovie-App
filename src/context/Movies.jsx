<<<<<<< HEAD
import React, { useContext } from "react";
import list from "../context/data"; 
import { CartContext } from "../context/CartContext";

const Movies = () => {
  const { addToCart, warning } = useContext(CartContext);

  return (
    <div className="page">
      <h1>Available Products</h1>
      {warning && <p style={{ color: "red" }}>{warning}</p>}

      <div className="product-grid">
        {list.map((item) => (
          <div className="product-card" key={item.id}>
            <img src={item.img} alt={item.service} />
            <h3>{item.service}</h3>
            <p>{item.serviceInfo}</p>
            <p><strong>${item.price.toFixed(2)}</strong></p>
            <button onClick={() => addToCart({
              id: `item-${item.id}`,
              name: item.service,
              price: item.price,
              type: item.type,
            })}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
=======
import React, { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "./CartContext";
import products from "./data";
import { fetchMovies, fetchTVShows } from "./movieData";

const Movies = () => {
  const { addToCart, cartItems, setWarning } = useContext(CartContext);
  const [movies, setMovies] = useState([]);
  const [tvShows, setTVShows] = useState([]);
  const [error, setError] = useState(null);
  const isLoggedIn = true;

  const movieScrollRef = useRef(null);
  const tvScrollRef = useRef(null);

  useEffect(() => {
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

    if (isLoggedIn) loadContent();
  }, []);

  const scrollContainer = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleAddToCart = (product) => {
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
                  <div key={movie.id} className="movie-card">
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      className="movie-poster"
                    />
                    <h3>{movie.title}</h3>
                    <p>{movie.release_year}</p>
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
                  <div key={show.id} className="movie-card">
                    <img
                      src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
                      alt={show.title}
                      className="movie-poster"
                    />
                    <h3>{show.title}</h3>
                    <p>{show.release_year}</p>
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
>>>>>>> 2e9bc5e (Added Page Adjustments, Credit Card Security, Credit Card Form, Etc.)
    </div>
  );
};

export default Movies;
