"use client";

import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SubscriptionButton = ({
  isPro = false,
}: {
  isPro: boolean;
}) => {
  return (
    <Button variant="premium" disabled>
      Payments Coming Soon
      <Zap className="w-4 h-4 ml-2 fill-white" />
    </Button>
  );
};
