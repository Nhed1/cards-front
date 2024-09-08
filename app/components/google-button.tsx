"use client";

import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

export const GoogleButton = ({ ...props }) => {
  return (
    <Button onClick={() => console.log} {...props}>
      Continuar com Google
    </Button>
  );
};
