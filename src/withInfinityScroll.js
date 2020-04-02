import React, { useRef, useEffect, useState } from "react";

const useInfinityScroll = () => {
  const size = 20;
  const [limit, setLimit] = useState(size);
  const [loading, setLoading] = useState(null);

  const loadMore = () => {
    if (!loading) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setLimit(limit + size);
      }, 2000);
    }
  };

  return { loading, limit, loadMore };
};

const WithInfinityScroll = wrappedComponent => {
  const WrappedComponent = wrappedComponent;
  const { limit, loadMore, loading } = useInfinityScroll();
  const containerElement = useRef(null);

  const scrollHandler = e => {
    const el = e.target;
    const { clientHeight, scrollHeight, scrollTop } = el;

    if (scrollTop + clientHeight === scrollHeight) {
      loadMore();
    }
  };

  useEffect(() => {
    const element = containerElement.current;
    element.addEventListener("scroll", scrollHandler);

    return () => {
      element.removeEventListener("scroll", scrollHandler);
    };
  });

  return (
    <WrappedComponent
      containerElement={containerElement}
      limit={limit}
      loading={loading}
    />
  );
};

export default WithInfinityScroll;
