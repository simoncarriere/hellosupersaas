"use client";
import { useState, useRef, Fragment } from "react";
// Lib
import { Dialog, Transition } from "@headlessui/react";
// Hooks
import { useSignup } from "../../hooks/useSignup";
import { useSocialAuth } from "../../hooks/useSocialAuth";
// Components
import SocialLogins from "./SocialLogins";
import FormInput from "../Atoms/FormInput";
import Error from "../Atoms/ErrorAlert";
//Icons
import { XCircleIcon } from "@heroicons/react/24/solid";

const Signup = ({ btnText, primaryBtn }) => {
  // Toggle Component
  const [showModal, setShowModal] = useState(false);
  // Form Values
  const [values, setValues] = useState({
    displayName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errorMessage: "",
  });
  // Input Ref
  const emailRef = useRef(null);

  // Email Signup
  const { signup, loading, error } = useSignup();
  // Social Signup
  const { socialSignup, googleProvider, githubProvider, twitterProvider } =
    useSocialAuth();

  // Sign Up Fields Input
  const Inputs = [
    {
      id: 1,
      name: "displayName",
      type: "text",
      placeholder: "Full Name",
      errormessage: "It should be a valid email address!",
      label: "Full Name",
      autoComplete: "off",
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errormessage: "It should be a valid email address!",
      label: "Email",
      autoComplete: "off",
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errormessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      autoComplete: "off",
    },
    {
      id: 4,
      name: "passwordConfirmation",
      type: "password",
      placeholder: "Confirm Password",
      errormessage: "Passwords don't match!",
      label: null,
      pattern: values.password,
      autoComplete: "off",
    },
  ];

  const handleEmailAuth = (e) => {
    e.preventDefault();

    setValues({ ...values, errorMessage: "" });
    if (
      values.displayName.length > 1 &&
      values.email.length > 1 &&
      values.password.length > 1 &&
      values.passwordConfirmation.length > 1
    ) {
      signup(
        values.email,
        values.password,
        values.displayName,
        values.passwordConfirmation
      );
    } else {
      setValues({ ...values, errorMessage: "Cannot leave fields blank" });
    }
  };

  const handleSocialAuth = (provider) => {
    socialSignup(provider);
  };

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className={` flex items-center justify-center h-full 
          ${
            primaryBtn
              ? "px-8  text-orange-100 transition-all duration-200 bg-orange-500 hover:bg-orange-600 hover:text-orange-200 btn-blue"
              : "btn-blue"
          }

        `}
        // "flex items-center justify-center w-full h-full mx-auto btn-blue"
        // }
      >
        {btnText}
      </div>
      {showModal && (
        <Transition.Root show={showModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-20 isolate"
            initialFocus={emailRef}
            onClose={() => setShowModal(false)}
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
                  <Dialog.Panel className="w-full max-w-2xl bg-white rounded-lg">
                    <form
                      autoComplete="off"
                      className="flex flex-col gap-2 p-8"
                      onSubmit={handleEmailAuth}
                    >
                      {/* Title */}
                      <Dialog.Title as="h1" className="mb-4 text-2xl">
                        Create an account and get instant access!
                      </Dialog.Title>

                      {/* Social Logins */}
                      <SocialLogins
                        providers={{
                          googleProvider,
                          githubProvider,
                          twitterProvider,
                        }}
                        handleSocialAuth={handleSocialAuth}
                      />

                      {/* Login Form Inputs */}
                      <div className="rounded-md ">
                        {Inputs.map((input) => (
                          <div key={input.id}>
                            <FormInput
                              {...input}
                              value={values[input.name]}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  [e.target.name]: e.target.value,
                                })
                              }
                            />
                          </div>
                        ))}
                      </div>

                      {/* Buttons & Errors */}
                      <div>
                        {/* {error && <Error errorMsg={error} />} */}
                        {error && (
                          <div className="p-4 mb-4 rounded-md bg-red-50 sm:col-start-2 ">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <XCircleIcon
                                  className="w-5 h-5 text-red-400 "
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800 ">
                                  {error}
                                </h3>
                              </div>
                            </div>
                          </div>
                        )}
                        {values.errorMessage && (
                          <div className="p-4 mb-4 rounded-md bg-red-50 sm:col-start-2">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <XCircleIcon
                                  className="w-5 h-5 text-red-400 "
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800 ">
                                  {values.errorMessage}
                                </h3>
                              </div>
                            </div>
                          </div>
                        )}
                        {!loading ? (
                          <button
                            type="submit"
                            className="w-full py-4 btn-blue"
                          >
                            Continue
                          </button>
                        ) : (
                          <button
                            type="text"
                            disabled
                            className="w-full py-4 btn-light"
                          >
                            loading...
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
export default Signup;
// test123@
