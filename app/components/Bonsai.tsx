import React from "react";
import Image from "next/image";
export const Bonsai = () => {
  return (
    <div className="flex items-center justify-center flex-col h-full border">
      <Image src="/simpleBonsai.png" alt="bonsai" width={300} height={300} />
    </div>
  );
};
