import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const HomePage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div
        className={cn(
          "flex items-center justify-center flex-col",
          font.className
        )}
      >
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal className="h-6 w-6 mr-2" />
          Mess Monitoring and Controlling Committe
        </div>
        <h1 className="text-3xl font-bold md:text-6xl text-center text-neutral-800 mb-6">
          Welcome to MMCC Portal
        </h1>
        <div className="text-lg md:text-lg bg-gradient-to-r from-gray-400 to-gray-600 px-4 p-2 text-gray-800 rounded-md pb-4 w-fit text-center">
          <p>
            The Mess Monitoring and Controlling Committee (MMCC) is a group of
            students and faculty members who are responsible for monitoring the
            quality of food and services provided by the messes and canteens on
            campus.
          </p>
          <p>
            The MMCC Portal is a platform that allows students to provide
            feedback on the quality of food and services provided by the messes
            and canteens on campus. The feedback provided by students is used to
            improve the quality of food and services provided by the messes and
            canteens on campus.
          </p>
        </div>
      </div>

      <div className="text-sm md:text-xl text-neutral-600 mt-4 max-w-xs md:max-w-2xl text-center mx-auto">
        <p>
          The MMCC Portal is a platform that allows students to provide feedback
          on the quality of food and services provided by the messes and
          canteens on campus.
        </p>
        <p>
          The feedback provided by students is used to improve the quality of
          food and services provided by the messes and canteens on campus.
        </p>
      </div>
      <Button className="mt-6" size={"lg"}>
        <Link href="/sign-up">Get Started</Link>
      </Button>
    </div>
  );
};

export default HomePage;
