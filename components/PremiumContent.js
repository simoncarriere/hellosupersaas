import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// Hooks
import { useAuthContext } from "../hooks/useAuthContext";
import { useCollection } from "../hooks/useCollection";
import { useDocument } from "../hooks/useDocument";
// Firebase
import { db } from "../lib/firebase";
import { doc, collection, setDoc, onSnapshot } from "firebase/firestore";
// Icons
import {
  ArrowDownCircleIcon,
  LinkIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
const boilerplates = [
  {
    id: 1,
    title: "Auth SPA",
    liveLink: "https://auth-spa-n13-f9.vercel.app/",
    downloadLink: "https://github.com/simoncarriere/Auth-SPA-N13F9",
    description:
      "Authentication for Single Page App using Email and Google/Github/Twitter social auth providers. Includes user profile, email verification, password reset, and more.",
    image: "/images/boilerplates/nextjs-tailwindcss.png",
    active: true,
    icons: [
      {
        title: "next",
        link: "http://nextjs.com",
        logo: "/images/icons/next.png",
      },
      {
        title: "firebase",
        link: "http://firebase.com",
        logo: "/images/icons/firebase.png",
      },
    ],
    images: [
      {
        alt: "image-2",
        src: "/authspa.png",
      },
      {
        alt: "image-1",
        src: "/authspa-1.png",
      },
    ],
  },
  {
    id: 2,
    title: "Paywall Subscription",
    liveLink: "https://paywall-subscription-n13-f9.vercel.app",
    downloadLink: "https://github.com/simoncarriere/Paywall-subscription-N13F9",
    description:
      "An extension of the auth SPA including a subscription paywall using Stripe Firebase Extension. Users can subscribe to a monthly or yearly plan.",
    image: "/images/boilerplates/nextjs-tailwindcss.png",
    active: true,
    icons: [
      {
        title: "next",
        link: "http://nextjs.com",
        logo: "/images/icons/next.png",
      },
      {
        title: "firebase",
        link: "http://firebase.com",
        logo: "/images/icons/firebase.png",
      },
      {
        title: "stripe",
        link: "http://stripe.com",
        logo: "/images/icons/stripe.png",
      },
    ],
    images: [
      {
        alt: "image-1",
        src: "/paywall-1.png",
      },
      {
        alt: "image-2",
        src: "/paywall-2.png",
      },
    ],
  },
  // {
  //   id: 3,
  //   title: "Auth Access Controlled Rooms",
  //   liveLink: "",
  //   downloadLink: "",
  //   description:
  //     "Auth SPA extension, users can form rooms/teams and collaborate on collection data in real time.",
  //   image: "/images/boilerplates/nextjs-tailwindcss.png",
  //   active: false,
  //   icons: [
  //     {
  //       title: "next",
  //       link: "http://nextjs.com",
  //       logo: "/images/icons/next.png",
  //     },
  //     {
  //       title: "firebase",
  //       link: "http://firebase.com",
  //       logo: "/images/icons/firebase.png",
  //     },
  //   ],
  //   images: [
  //     {
  //       alt: "image-1",
  //       src: "/oliur.jpeg",
  //     },
  //     {
  //       alt: "image-2",
  //       src: "/oliur.jpeg",
  //     },
  //   ],
  // },
];

const PremiumContent = () => {
  const { user } = useAuthContext();
  const [stats, setStats] = useState([
    { id: 1, count: 0, name: "Auth SPA with Prisma & Planetscale" },
    {
      id: 2,
      count: 0,
      name: "Realtime Multiplayer with Liveblocks & Firebase",
    },
    { id: 3, count: 0, name: "TYPESCRIPT !" },
  ]);
  const [totalVotes, setTotalVotes] = useState(0);
  // const { documents: votes } = useCollection("votes");
  const { document: vote } = useDocument("votes", user.uid);
  const [votes, setVotes] = useState(null);

  // Get the votes
  useEffect(() => {
    let ref = collection(db, "votes");
    try {
      const unsub = onSnapshot(ref, (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setVotes(results);
        // console.log("Current data: ", results);
        setTotalVotes(results.length);
      });
      return () => unsub();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }, []);

  // Update the stats
  useEffect(() => {
    if (votes) {
      // Update the votes count
      let localStats = [
        { id: 1, count: 0, name: "Auth SPA with Prisma & Planetscale" },
        {
          id: 2,
          count: 0,
          name: "Realtime Multiplayer with Liveblocks & Firebase",
        },
        { id: 3, count: 0, name: "TYPESCRIPT !" },
      ];
      votes.forEach((vote) => {
        if (vote.vote === 1) localStats[0].count++;
        if (vote.vote === 2) localStats[1].count++;
        if (vote.vote === 3) localStats[2].count++;
      });
      setStats(localStats.sort((a, b) => b.count - a.count));
    }
  }, [votes]);

  const handleVote = async (id) => {
    try {
      await setDoc(doc(db, "votes", user.uid), {
        vote: id,
      }).then(() => {
        console.log("Document successfully written!");
      });
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };
  // useEffect(() => {
  //   if (vote && stats)
  //     stats.forEach((stat) => console.log(stat.id === vote.vote));
  // }, [vote, stats]);

  return (
    <div className="md:mx-6">
      {/* Callout */}
      <div className="p-4 mb-8 rounded-lg md:p-8 bg-slate-50">
        <div className="flex flex-col max-w-2xl gap-8 xl:mx-auto xl:flex-row lg:max-w-none">
          {/* Busy building */}
          <div className="items-center justify-center xl:basis-1/2 ">
            <div className="flex flex-col max-w-sm gap-4">
              <div className="flex justify-center w-24 p-1 text-sm font-bold text-orange-500 bg-orange-100 rounded-lg">
                Roadmap
              </div>
              <h2 className="text-3xl font-semibold text-gray-800">
                We are busy building!
              </h2>
              <p className="text-gray-400">
                Help us prioritize our roadmap by voting on what boilerplate
                you'd like to see us build next.
              </p>
              <div className="flex items-center ">
                <p className="text-sm text-gray-600">Get in touch</p>
                <Link
                  href="https://twitter.com/simonsjournal"
                  aria-label="twitter"
                >
                  <p className="flex items-center justify-between gap-2 px-1 text-blue-300 transition rounded-lg hover:bg-blue-50 hover:text-blue-400">
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 ml-1 fill-blue-300"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 22 5.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 2.8 9.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.093 4.093 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 18.407a11.615 11.615 0 0 0 6.29 1.84" />
                    </svg>
                    simonsjournal
                  </p>
                </Link>
              </div>
            </div>
          </div>
          {/* Roadmap */}
          <div className="flex flex-col gap-2 rounded-lg xl:basis-1/2">
            {/* <p className="text-sm font-medium">Coming this month</p>
            <div className="flex flex-col gap-2 rounded-lg basis-1/2">
              <div className="flex justify-between gap-4 p-4 text-orange-500 bg-orange-100 border border-orange-100 rounded-lg ">
                <p className="text-sm leading-6 ">
                  Landing Page with ContentLayer
                </p>
              </div>
            </div> */}
            <p className="mt-3 text-sm font-medium text-gray-500">
              Cast your vote
            </p>

            {stats &&
              stats.map((stat) => (
                <div
                  key={stat.id}
                  onClick={() => handleVote(stat.id)}
                  className="flex justify-between gap-4 p-4 text-gray-600 border rounded-lg cursor-pointer hover:border-orange-200 hover:bg-orange-100 hover:text-orange-500"
                >
                  <p className="text-sm leading-6 ">{stat.name}</p>
                  {/* <p className="font-semibold tracking-tight ">{stat.value}</p> */}
                  <p className="font-semibold tracking-tight ">
                    {Math.floor((stat.count / totalVotes) * 100)}%
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Boilerplates */}
      {boilerplates.map((boilerplate) => (
        <div
          key={boilerplate.id}
          className="flex flex-col justify-between gap-4 my-24 "
        >
          <div className="flex flex-col lg:gap-8 xl:flex-row">
            <div className="flex flex-col gap-4 xl:max-w-sm">
              <h2 className="text-lg font-semibold ">{boilerplate.title}</h2>
              <p className="max-w-lg text-base text-gray-600 ">
                {boilerplate.description}
              </p>
              {/* Icons */}
              <div className="flex mb-1 lg:pb-4 ">
                {boilerplate.icons.map((icon) => (
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
                      {icon.title}
                    </span>
                  </a>
                ))}
              </div>
              {/* Images Mobile */}
              <div className="hidden gap-4 pt-4 md:flex xl:hidden lg:pt-0">
                {boilerplate.images.map((image) => (
                  <Image
                    key={image.alt}
                    className="w-full rounded-lg "
                    width={400}
                    height={100}
                    src={image.src}
                    alt={image.alt}
                  />
                ))}
              </div>
              <div className="flex gap-4 pt-4 md:hidden lg:pt-0">
                <Image
                  className="object-cover w-full rounded-lg"
                  width={400}
                  height={100}
                  src={boilerplate.images[0].src}
                  alt={boilerplate.images[0].alt}
                />
              </div>
              {/* Tags */}
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-200 xl:gap-4 md:flex-row">
                <a
                  className="tag-gray"
                  href={boilerplate.downloadLink}
                  target="_blank"
                >
                  <ArrowDownCircleIcon className="w-5 h-5 " />
                  Download
                </a>
                <a
                  className="tag-gray"
                  href={boilerplate.liveLink}
                  target="_blank"
                >
                  <LinkIcon className="w-5 h-5 " />
                  Live URL
                </a>
                <a className="tag-gray" href="#" target="_blank">
                  <DocumentIcon className="w-5 h-5 " />
                  Docs
                </a>
              </div>
            </div>
            {/* Images Desktop */}
            <div className="hidden gap-4 pt-4 xl:flex lg:pt-0">
              {boilerplate.images.map((image) => (
                <Image
                  key={image.alt}
                  className="object-cover rounded-lg card"
                  width={400}
                  height={100}
                  src={image.src}
                  alt={image.alt}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PremiumContent;
