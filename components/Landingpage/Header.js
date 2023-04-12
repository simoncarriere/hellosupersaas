import { CalendarDaysIcon } from "@heroicons/react/20/solid";

import Signup from "../Auth/Signup";

const Header = () => {
  return (
    <header className="mx-0 mt-20 lg:mt-28 md:mx-12 2xl:mx-24 ">
      {/* <header className="flex items-center w-full mx-auto mt-20 lg:mt-30"> */}
      {/* Pitch  */}
      <div className="flex flex-col max-w-3xl gap-6 ">
        {/* Early access tag  */}
        <h1 className="max-w-lg text-5xl font-black text-gray-700 sm:text-8xl">
          Race to your MVP
        </h1>
        <h2 className="max-w-xl text-lg font-medium leading-8 text-gray-400 tracking-loose ">
          Access our collection of boilerplates to fast track your next SAAS
          project. Built for ambitious agencies and solopreneurs who move fast.
        </h2>
        <div className="flex items-center h-20 gap-4">
          <div className="w-40 h-full ">
            <Signup primaryBtn={true} btnText="Get Started" />
          </div>
          {/* <button className="px-8 py-6 text-orange-100 transition-all duration-200 bg-orange-500 hover:bg-orange-600 hover:text-orange-200 btn-blue">
            Get Started
          </button> */}
          <a
            href="https://calendly.com/simonsjournal/supersaas"
            target="_blank"
          >
            <button className="flex items-center justify-between h-20 gap-2 px-8 py-6 btn-outline">
              <CalendarDaysIcon className="w-5 h-5 text-gray-600" />
              Schedule a Demo
            </button>
          </a>
        </div>
        {/* <div className="mx-auto cursor-pointer sm:flex sm:justify-center sm:px-6 lg:px-8">
          <div className="flex items-center justify-between p-4 border pointer-events-auto gap-x-6 border-slate-200 hover:border-orange-200 hover:bg-orange-100 hover:text-orange-700 sm:rounded-md">
            <p className="text-sm leading-6 text-slate-600">
              <strong className="font-semibold">🚀 Early Access</strong>
              <svg
                viewBox="0 0 2 2"
                className="mx-2 inline h-0.5 w-0.5 fill-current"
                aria-hidden="true"
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
              Get notified as we get closer to launching version uno&nbsp;
              <span aria-hidden="true">&rarr;</span>
            </p>
          </div>
        </div> */}

        {/* CTA  */}
        {/* <button className="px-6 py-4 text-base text-white rounded-md bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-400 hover:to-orange-700">
          Get Early Access
          <span className="mx-1 text-orange-200 line-through">$250</span>
          $100/year
        </button> */}
      </div>
    </header>
  );
};

export default Header;
