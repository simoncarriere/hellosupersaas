"use client";
import { useState, useRef, Fragment } from "react";
// Lib
import { Dialog, Transition } from "@headlessui/react";
// Hooks
import { useLogin } from "../../hooks/useLogin";
import { useSocialAuth } from "../../hooks/useSocialAuth";
// Components
import SocialLogins from "./SocialLogins";
import FormInput from "../Atoms/FormInput";
//Icons
import { XCircleIcon } from "@heroicons/react/24/solid";

const Login = ({ btnText, setShowForgetPassword }) => {
  const [showModal, setShowModal] = useState(false);

  const [values, setValues] = useState({
    displayName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errorMessage: "",
  });
  const emailRef = useRef(null);
  const { error, loading, login } = useLogin();

  const Inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errormessage: "It should be a valid email address!",
      label: "Email",
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errormessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    },
  ];

  const handleEmailAuth = (e) => {
    e.preventDefault();
    setValues({ ...values, errorMessage: "" });
    if (values.email.length > 1 && values.password.length > 1) {
      login(values.email, values.password);
    } else {
      setValues({ ...values, errorMessage: "Cannot leave fields blank" });
    }
  };

  // Social Signup
  const { socialSignup, googleProvider, githubProvider, twitterProvider } =
    useSocialAuth();
  const handleSocialAuth = (provider) => {
    socialSignup(provider);
  };

  const toggleForgetPassword = () => {
    setShowForgetPassword(true);
    setShowModal(false);
  };

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="px-6 py-3 text-base font-semibold tracking-wide border rounded-md shadow-sm cursor-pointer text-slate-700 border-slate-200 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {btnText}
      </div>
      {showModal && (
        <Transition.Root show={showModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
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
                  <Dialog.Panel className="w-full max-w-lg bg-white rounded-lg">
                    <form
                      autoComplete="off"
                      className="flex flex-col p-6"
                      onSubmit={handleEmailAuth}
                    >
                      <Dialog.Title as="h1" className="mb-4 text-2xl">
                        Log in
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
                            Log in
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
                      <p
                        onClick={() => toggleForgetPassword()}
                        className="mt-2 text-sm text-gray-500 cursor-pointer hover:text-gray-700"
                      >
                        Forgot your password? It happens.
                      </p>
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
export default Login;
