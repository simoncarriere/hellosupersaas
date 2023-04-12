"use client";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
// Hooks
import { useAuthContext } from "../hooks/useAuthContext";
import { userPremiumCheck } from "../hooks/usePremiumCheck";
// Components
// import Onboarding from "../components/Account/Onboarding";
// import Debugger from "../components/Account/Debugger";
// import EmailVerifyBanner from "../components/Account/EmailVerifyBanner";
import PremiumContent from "../components/PremiumContent";
import FreemiumContent from "../components/FreemiumContent";
// LandingPage Components
import Header from "../components/Landingpage/Header";
import { Pricing } from "../components/Landingpage/Pricing";
import { Footer } from "../components/Landingpage/Footer";
import { Features } from "../components/Landingpage/Features";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user, authIsReady, userIsPremium } = useAuthContext();
  const { checkForPremium } = userPremiumCheck();

  // Check if user is Premium
  useEffect(() => {
    checkForPremium();
  }, [user, checkForPremium]);

  // Toggle SignUp Modal
  // const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    authIsReady && (
      <div className="flex flex-col gap-4 px-6 mx-auto rounded-md pt-28">
        <div>
          {user ? (
            <>
              {/* Banner will only display for users who have signed up with email and password and have not verified their email. */}
              {/* {user.providerData[0].providerId === "password" &&
                user.emailVerified === false && (
                  <EmailVerifyBanner user={user} />
                )} */}

              {userIsPremium ? <PremiumContent /> : <FreemiumContent />}
              {/* Debugger displays useful user data you have access to */}
              {/* <Debugger user={user} /> */}

              {/* Onboarding will only display for users who are signing in for the first time */}
              {/* {user.metadata.creationTime === user.metadata.lastSignInTime && (
                <Onboarding />
              )} */}
            </>
          ) : (
            <>
              <Header
              // showSignupModal={showSignupModal}
              // setShowSignupModal={setShowSignupModal}
              />
              <Features />
              <Pricing
              // showSignupModal={showSignupModal}
              // setShowSignupModal={setShowSignupModal}
              />
            </>
          )}
        </div>
        <Footer />
      </div>
    )
  );
}
