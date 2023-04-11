import { CheckIcon, CalendarDaysIcon } from "@heroicons/react/20/solid";
import Signup from "../Auth/Signup";

const tiers = [
  {
    name: "The Solopreneur",
    id: "tier-solopreneur",
    href: "#",
    price: "$250/Year",
    onClick: true,
    description:
      "For the ambitious solopreneur who wants to get to market fast.",
    features: [
      "Access to all current and future boilerplates",
      "Community Slack Channels",
    ],
    featured: false,
    cta: "Start Building",
  },
  {
    name: "The Agency",
    id: "tier-agency",
    href: "https://form.typeform.com/to/BDIMSvJl",
    price: "$1000/Year",
    description: "A plan that scales with your rapidly growing business.",
    features: [
      //   "Bespoke solutions",
      "1-hour onboarding call",
      "Direct email support",
      "Accelerated feature request",
    ],
    featured: false,
    cta: "Get Started",
  },
  {
    name: "Need a developer?",
    id: "tier-development",
    href: "https://form.typeform.com/to/tB51v9LZ",
    price: "Starting $5000",
    description: "Have a big idea but need a hand with the code",
    features: [
      "Competitive rate",
      "Get an MVP in record time",
      "Get support from ideation to launch",
    ],
    featured: true,
    cta: "Get In Touch",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Pricing() {
  return (
    <div className="my-24">
      {/* Pitch */}
      <div className="flex flex-col max-w-2xl gap-4 mx-auto text-center">
        <h2 className="text-4xl font-bold">Let&apos;s talk money</h2>
        <h2 className="text-lg leading-8 text-gray-400 tracking-loose lg:px-12">
          We&apos;re saving you days of work, it&apos;s only fair we get a
          little something in return. Not conviced?
        </h2>
        <button className="flex items-center justify-center px-6 py-4 mx-auto btn-outline">
          <CalendarDaysIcon className="w-5 h-5 mr-2" aria-hidden="true" />
          <a
            target="_blank"
            rel="noreferrer"
            href="https://calendly.com/simonsjournal/supersaas-demo"
          >
            Schedule a demo
          </a>
        </button>
      </div>
      {/* Payment Plants */}
      <div className="flex mx-auto ">
        <div className="grid grid-cols-1 gap-8 mx-auto mt-24 lg:grid-cols-2 xl:grid-cols-3 ">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                tier.featured ? "bg-gray-900 ring-gray-900" : "bg-gray-50",
                "card flex max-w-2xl flex-col justify-between rounded-xl p-8 xl:p-10"
              )}
            >
              <div>
                <h3
                  id={tier.id}
                  className={classNames(
                    tier.featured ? "text-white" : "text-gray-900",
                    "text-2xl font-semibold leading-8"
                  )}
                >
                  {tier.name}
                </h3>
                <p
                  className={classNames(
                    tier.featured ? "text-gray-400" : "text-gray-500",
                    "mt-1 text-sm "
                  )}
                >
                  {tier.description}
                </p>

                {/* Checklist */}
                <ul
                  role="list"
                  className={classNames(
                    tier.featured ? "text-gray-300" : "text-gray-600",
                    "mt-2 space-y-3 text-sm leading-6 xl:mt-4"
                  )}
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className={classNames(
                          tier.featured ? "text-white" : "text-orange-400",
                          "h-6 w-3 flex-none"
                        )}
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Pricing */}
              <div
                className={classNames(
                  tier.featured ? "border-gray-700" : "border-gray-200",
                  "mt-6 border-t"
                )}
              >
                <p className="flex items-baseline mt-6 gap-x-1">
                  <span
                    className={classNames(
                      tier.featured ? "text-white" : "text-gray-900",
                      "text-xl font-semibold tracking-tight"
                    )}
                  >
                    {tier.price}
                  </span>
                </p>
                {tier.onClick ? (
                  <div className="w-full py-3 mt-6 ">
                    <Signup btnText={tier.cta} className="" />
                  </div>
                ) : (
                  <a
                    href={tier.href}
                    aria-describedby={tier.id}
                    className={classNames(
                      tier.featured
                        ? "bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white"
                        : // : 'bg-gradient-to-r from-orange-400 to-orange-600 hover:from-gray-700 transition-all text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600',
                          "btn-blue bg-orange-500 text-orange-50 hover:bg-orange-600",
                      "mt-6 block rounded-md py-3 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      //   ? "bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white"
                      //   : // : 'bg-gradient-to-r from-orange-400 to-orange-600 hover:from-gray-700 transition-all text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600',
                      //     "bg-orange-500 text-orange-50  shadow-sm transition-all hover:bg-orange-500 hover:from-gray-700 focus-visible:outline-orange-600",
                      // "mt-6 block rounded-md py-3 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    )}
                  >
                    {tier.cta}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
