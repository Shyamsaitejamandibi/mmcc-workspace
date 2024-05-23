"use client";

import { useEffect, useState } from "react";
import { CardModal } from "../modals/card-model";

export const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return <CardModal />;
};
