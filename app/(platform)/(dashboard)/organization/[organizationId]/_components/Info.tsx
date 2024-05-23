"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const Info = () => {
  const { organization, isLoaded } = useOrganization();
  if (!isLoaded) {
    return <Info.Skeleton />;
  }
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Image
          fill
          src={organization?.imageUrl!}
          alt="Organization logo"
          className="rounded-md object-cover"
        />
      </div>
      <div>
        <p className="font-semibold text-xl">{organization?.name}</p>
      </div>
    </div>
  );
};

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] rounded-md relative">
        <Skeleton className="w-full h-full absolute" />
      </div>
      <div>
        <div className="w-24 h-6 rounded-md">
          <Skeleton className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default Info;
Info;
