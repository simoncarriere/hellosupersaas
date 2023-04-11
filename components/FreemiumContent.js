import { useAuthContext } from "../hooks/useAuthContext";
// Components
import SendToCheckout from "./Account/SendToCheckout";
// Icons
import { CheckIcon } from "@heroicons/react/20/solid";

const FreemiumContent = () => {
  const { user } = useAuthContext();

  //   name: "The Solopreneur",
  //   id: "tier-solopreneur",
  //   href: "#",
  //   price: "$250/Year",
  //   onClick: true,
  //   description:
  //     "For the ambitious solopreneur who wants to get to market fast.",
  //   features: [
  //     "Access to all current and future boilerplates",
  //     "Community Slack Channels",
  //   ],
  //   featured: false,
  //   cta: "Start Building",
  // },

  return (
    <div className="items-center justify-between max-w-lg mx-auto mb-2 border border-gray-100 rounded-md bg-gray-50">
      <h1 className="success"></h1>

      <div className="flex flex-col justify-between max-w-2xl p-8 bg-gray-50 rounded-xl xl:p-10">
        <div>
          <h3 className="text-2xl font-semibold leading-8 text-gray-900">
            The Solopreneur
          </h3>
          <p className="mt-1 text-sm text-gray-500 ">
            For the ambitious solopreneur who wants to get to market fast.
          </p>

          {/* Checklist */}
          <ul
            role="list"
            className="mt-2 space-y-3 text-sm leading-6 text-gray-600 xl:mt-4"
          >
            <li className="flex gap-x-3">
              <CheckIcon
                className="flex-none w-3 h-6 text-orange-400"
                aria-hidden="true"
              />
              Access to all current and future boilerplates
            </li>
            <li className="flex gap-x-3">
              <CheckIcon
                className="flex-none w-3 h-6 text-orange-400"
                aria-hidden="true"
              />
              Community Slack Channels
            </li>
          </ul>
        </div>
        {/* Pricing */}
        <div className="my-6 border-t border-gray-200">
          <p className="flex items-baseline mt-6 gap-x-1">
            <span className="text-xl font-semibold tracking-tight text-gray-900">
              250$ / Year
            </span>
          </p>
        </div>
        <SendToCheckout user={user} />
      </div>
    </div>
  );
};

export default FreemiumContent;
