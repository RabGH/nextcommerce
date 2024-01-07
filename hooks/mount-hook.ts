"use client";

import React from "react";

export const useMount = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};

// const isMounted = useMount();
// if (!isMounted) {
//   return null;
// }
