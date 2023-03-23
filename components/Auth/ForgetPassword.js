"use client";
import { useState, useEffect, Fragment } from "react";
// Lib
import { Dialog, Transition } from "@headlessui/react";
// Firebase
import { auth } from "../../lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
// Components
import FormInput from "../Atoms/FormInput";
import Success from "../Atoms/SuccessAlert";
import Error from "../Atoms/ErrorAlert";

const ForgetPassword = ({ showForgetPassword, setShowForgetPassword }) => {
  const [forgetEmail, setForgetEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false); //Cleanup

  const Inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errormessage: "It should be a valid email address!",
      label: "Email",
    },
  ];

  const handleForgetEmail = async (e) => {
    e.preventDefault();
    setError(null);
    setIsPending(true);
    setSuccessMsg(null);

    // Send User Reset Email
    // You can customize the Password Reset email under: Firebase Console -> Auth -> Email Templates -> Password Reset
    try {
      await sendPasswordResetEmail(auth, forgetEmail)
        .then(() => {
          console.log("Password Reset Email Sent!");
          setSuccessMsg("Check your email for a link to reset your password.");
          setIsPending(false);
        })
        .catch((err) => {
          console.log(err.message);
          setError("There is no user record corresponding to this email.");
          setIsPending(false);
        });

      // // Only update state if setIsCancelled is false (before cleanup)
      // if (!isCancelled) {
      //   setIsPending(false);
      //   setError(null);
      // }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  // Cleanup Function will only return on component unmount (Cancel pending async request)
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return (
    <>
      {showForgetPassword && (
        <Transition.Root show={showForgetPassword} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setShowForgetPassword(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-800"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 transition-opacity bg-gray-800/60" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-800"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-500"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="w-full max-w-lg bg-white rounded-lg">
                    <form
                      className="flex flex-col p-6"
                      onSubmit={handleForgetEmail}
                    >
                      <Dialog.Title as="h1" className="mb-4 ">
                        Forget Password
                      </Dialog.Title>

                      <div className="rounded-md ">
                        {Inputs.map((input) => (
                          <FormInput
                            key={input.name}
                            {...input}
                            value={forgetEmail}
                            onChange={(e) => setForgetEmail(e.target.value)}
                          />
                        ))}
                      </div>

                      <div>
                        {error && <Error errorMsg={error} />}
                        {successMsg && <Success successMsg={successMsg} />}
                        {!isPending ? (
                          <button
                            type="submit"
                            className="w-full py-4 btn-blue"
                          >
                            Send recovery email
                          </button>
                        ) : (
                          <button
                            type="text"
                            disabled
                            className="w-full py-4 btn-light"
                          >
                            Sending...
                          </button>
                        )}
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
};
export default ForgetPassword;
