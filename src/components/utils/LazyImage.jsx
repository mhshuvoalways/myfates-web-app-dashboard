import { useEffect, useRef, useState } from "react";

const LazyImage = ({ imgSrc }) => {
  const imageRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer?.unobserve(imageRef.current);
          }
        });
      },
      { threshold: 0.1 }
    );
    imageObserver.observe(imageRef.current);
    return () => imageObserver.disconnect();
  }, [imgSrc]);

  return (
    <img
      src={isVisible ? imgSrc : ""}
      className={!hasLoaded}
      ref={imageRef}
      onLoad={() => setHasLoaded(true)}
      alt=""
    />
  );
};

export default LazyImage;
