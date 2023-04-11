import Image from "next/image";

const features = [
  {
    title: "Onboard your users",
    desc: "Authenticate and onboard your users by email or with your prefered social auth",
    imageUrl: "/socialonboard.png",
    icons: [
      {
        active: true,
        title: "firebase",
        link: "http://firebase.com",
        logo: "/images/icons/firebase.png",
      },
      {
        active: false,
        title: "nextAuth",
        link: "https://www.nextauth.com",
        logo: "/images/icons/nextauth.png",
      },
      {
        active: false,
        title: "magic",
        link: "http://magic.com",
        logo: "/images/icons/magic.png",
      },
    ],
  },
  {
    title: "Get that MRR",
    desc: "Manage user access through monthly or yearly subscription. Free trial and discounts coming soon",
    imageUrl: "/subscribe.png",
    // "https://res.cloudinary.com/amie/video/upload/v1647368101/website/card-create-history_qpwvxk.mp4",
    icons: [
      {
        active: true,
        title: "stripe",
        link: "http://stripe.com",
        logo: "/images/icons/stripe.png",
      },
      {
        active: false,
        title: "Lemonsqueezy",
        link: "https://www.lemonsqueezy.com",
        logo: "/images/icons/lemonsqueezy.jpg",
      },
      {
        active: false,
        title: "paddle",
        link: "http://paddle.com",
        logo: "/images/icons/paddle.png",
      },
    ],
  },
  {
    title: "Let them work together",
    desc: "Users have the ability to create teams, gain access to shared rooms, and collaborate on data",
    imageUrl:
      "https://res.cloudinary.com/amie/video/upload/v1647368101/website/card-profile_s3tjyr.mp4",
    icons: [
      {
        active: true,
        title: "firebase",
        link: "http://firebase.com",
        logo: "/images/icons/firebase.png",
      },
      {
        active: false,
        title: "planetscale",
        link: "https://www.planetscales.com",
        logo: "/images/icons/planetscale2.png",
      },
      {
        active: false,
        title: "prisma",
        link: "http://prisma.com",
        logo: "/images/icons/prisma.png",
      },
    ],
  },
  {
    title: "Market your product",
    desc: "Begin publishing blog articles from day one, optimized for social sharing and SEO ready",
    imageUrl:
      "https://res.cloudinary.com/amie/video/upload/v1647368102/website/card-share-slots_kiuaad.mp4",
    icons: [
      {
        active: true,
        title: "Contentlayer",
        link: "http://stripe.com",
        logo: "/images/icons/contentlayer.png",
      },
      {
        active: false,
        title: "Sanity",
        link: "https://www.lemonsqueezy.com",
        logo: "/images/icons/sanity.png",
      },
    ],
  },
  {
    title: "Realtime (Coming Soon)",
    desc: "The web is fast becoming multiplayer, and your app should be too. ",
    imageUrl:
      "https://res.cloudinary.com/amie/video/upload/v1647367902/website/intro-short_o4nfbw.mp4",
    icons: [
      {
        active: true,
        title: "firebase",
        link: "http://firebase.com",
        logo: "/images/icons/firebase.png",
      },
      {
        active: false,
        title: "liveblocks",
        link: "https://www.lemonsqueezy.com",
        logo: "/images/icons/liveblocks.png",
      },
    ],
  },
  {
    title: "Have a feature in mind?",
    desc: "Tweet your product ideas to @simonsjournal",
    imageUrl:
      "https://res.cloudinary.com/amie/video/upload/v1647367902/website/intro-short_o4nfbw.mp4",
  },
];

export function Features() {
  return (
    <div className="my-32">
      <div className="mx-auto 2xl:mx-8 ">
        {/* GRID */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 grid-rows-auto ">
          {/* Youtube */}

          {/* <div className="col-span-1 row-span-1 p-4 bg-gray-100 card sm:inline-block sm:w-full rounded-xl md:col-span-2 h-96 lg:h-auto">
            <div className="flex flex-col h-full gap-4 md:flex-row">
              <div className="w-full transition-all duration-200 cursor-pointer hover:brightness-90">
                <iframe
                  className="w-full h-full rounded-xl"
                  src={`https://www.youtube.com/embed/fup-FQ06o6g`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </div>
              <div className="basis-1/2">
                <h4 className="text-sm font-medium text-gray-900">title</h4>
                <div>
                  <p className="my-3 text-sm leading-6 text-gray-400 ">
                    description
                  </p>
                </div>
              </div>
            </div>
          </div> */}
          {features.map((feature) => (
            <div
              key={feature.title}
              className="h-full col-span-1 row-span-1 p-4 card sm:inline-block sm:w-full rounded-xl bg-gray-50"
            >
              {/* <div className="relative w-full h-48 mt-4 bg-gray-200 rounded-lg">
                        <img src={feature.imageUrl} className="object-contain "/>
                </div> */}
              <div className="bg-gray-200 rounded-xl">
                <img
                  className="object-cover w-full bg-gray-100 min-h-56 lg:h-64 2xl:h-80 rounded-xl"
                  src={feature.imageUrl}
                  alt={feature.title}
                />
              </div>
              <div className="flex flex-col gap-3 p-2 mt-2 2xl:mt-4">
                <h4 className="text-sm font-medium text-gray-900 2xl:text-base">
                  {feature.title}
                </h4>
                <p className="text-sm leading-6 text-gray-400 ">
                  {feature.desc}
                </p>

                <div className="flex justify-between">
                  {feature.icons &&
                    feature.icons
                      .filter((i) => i.active)
                      .map((icon) => (
                        <a
                          href={icon.link}
                          key={icon.title}
                          className="relative transition-all ease-in-out group hover:scale-110 duration-400"
                        >
                          <Image
                            className="icon"
                            width={20}
                            height={20}
                            src={icon.logo}
                            alt={icon.title}
                          />
                          <span className="z-10 absolute top-7 scale-0 opacity-0 rounded transition-all ease-in-out duration-400 bg-slate-900/80 px-2 py-1 text-[10px] text-slate-100 group-hover:scale-100 group-hover:opacity-100">
                            {icon.title}
                          </span>
                        </a>
                      ))}
                  {feature.icons && (
                    <div className="flex">
                      {feature.icons
                        .filter((i) => !i.active)
                        .map((icon) => (
                          <a
                            href={icon.link}
                            key={icon.title}
                            className="relative transition-all ease-in-out cursor-not-allowed group duration-400 "
                          >
                            <Image
                              className="icon"
                              width={20}
                              height={20}
                              src={icon.logo}
                              alt={icon.title}
                            />
                            <span className="z-10 absolute top-7 scale-0 opacity-0 rounded transition-all ease-in-out duration-400 bg-slate-900/80 px-2 py-1 text-[10px] text-slate-100 group-hover:scale-100 group-hover:opacity-100">
                              {/* {icon.title}  */}
                              (Coming Soon)
                            </span>
                          </a>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
