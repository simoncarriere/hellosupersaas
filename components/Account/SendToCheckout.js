import { useState } from "react";
// Firebase
import { db } from "../../lib/firebase";
import {
  doc,
  collection,
  getDoc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
// Stripe
import { loadStripe } from "@stripe/stripe-js";

const SendToCheckout = ({ user }) => {
  const [loading, setLoading] = useState(false);
  // Open Checkout Session
  const sendToCheckout = async () => {
    setLoading(true);
    try {
      const authUserDocument = await doc(db, "users", user.uid);
      getDoc(authUserDocument)
        .then((doc) => {
          const checkoutRef = collection(authUserDocument, "checkout_sessions");
          // Cloud function will trigger generating a checkout session ID, write it to the doc location
          addDoc(checkoutRef, {
            price: process.env.NEXT_PUBLIC_STRIPE_PRODUCTPRICE, // Price Id from your products price in Stripe
            success_url: window.location.origin, // Return user back to this screen on successful purchase
            cancel_url: window.location.origin, // return user back ot this screen on failed purchase
          })
            // Wait for the CheckoutSession to get attached by the extension
            .then((docRef) => {
              onSnapshot(docRef, async (docs) => {
                // console.log(snap.data())
                const { error, sessionId } = docs.data();
                if (error) {
                  // Show an error to your customer and inspect your Cloud Function logs in the Firebase console
                  alert(`An error occured: ${error.message}`);
                }
                if (sessionId) {
                  const stripe = await loadStripe(
                    process.env.NEXT_PUBLIC_STRIPE_PUBLICKEY
                  );
                  await stripe.redirectToCheckout({ sessionId });
                }
              });
            });
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return loading ? (
    <button className="w-full py-4 bg-gray-100 btn-outline" disabled>
      loading...
    </button>
  ) : (
    <button
      className="w-full py-4 text-orange-500 bg-orange-100 btn-blue"
      onClick={sendToCheckout}
    >
      Purchase
    </button>
  );
};

export default SendToCheckout;
