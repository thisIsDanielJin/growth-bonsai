import React from "react";
import Image from "next/image";

export const LandingPreRelease = () => {
  return (
    <div className=" h-screen-minus-32 w-screen bg-[#F8FDEF] ">
      <div className="w-full h-full px-32 py-8 flex flex-row">
        <div className="h-full w-1/2 ">
          <div className="h-1/2 flex justify-end flex-col ">
            <div className="flex pr-10">
              <p className="font-bold text-6xl">
                GrowthBonsai is launching soon
              </p>
              <Image
                src="/upGraph.png"
                width={120}
                height={100}
                alt="growthImage"
              />
            </div>
            <p className="font-light text-3xl mt-8">
              The personal tracking tool for achieving your goals
            </p>
          </div>
          <div className="h-1/2 pt-8">
            <div className="h-full  flex flex-col space-y-5">
              <input
                type="text"
                placeholder="Your name"
                className="input w-3/4 bg-white border border-gray-300 text-lg"
              />
              <input
                type="text"
                placeholder="Your email address"
                className="input w-3/4 bg-white border border-gray-300 text-lg"
              />

              <div className="flex">
                <div className="btn btn-accent w-3/4">
                  <p className="font-bold text-xl">{"I'm in"}</p>
                </div>
                <div className="rotate-[12deg] ml-3">
                  <p className="font-light text-xl text-nowrap">
                    {" "}
                    Join the waiting list!
                  </p>
                  <Image
                    src="/iconArrowCurved.svg"
                    width={40}
                    height={40}
                    alt="iconArrow"
                    className="ml-5 rotate-180 transform -scale-x-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-1/2 flex  items-center grid grid-col-3 ">
          <div className="col-start-3">
            <Image
              src="/mockIphone.png"
              width={300}
              height={300}
              alt="bonsaiImage"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
