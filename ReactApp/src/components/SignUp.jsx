import { useEffect, useState } from "react";
import { Input, Ripple, initTE } from "tw-elements";

import DisplayFormErrorMessage from "../reusable/DisplayErrorMsg";

import ApiError from "../helper/handleApiError";

const API = import.meta.env;
let formBody = {};

function SignUp() {
  const [errors, setErrors] = useState();
  const [invalidName, setInvalidName] = useState();
  const [invalidEmail, setInvalidEmail] = useState();
  const [invalidPassword, setInvalidPassword] = useState();

  const onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    formBody = {
      ...formBody,
      [name]: value,
    };
  };
  console.log("run");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API.VITE_SERVER}/${API.VITE_CREATEUSER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(formBody),
      });

      const data = await res.json();
      if (data.type === "error") {
        setErrors([...data.errorProps]);
        throw new ApiError(data);
      }
      console.log(data);
    } catch (error) {
      if (error instanceof ApiError) {
        console.log(error.message);
        console.log(error.errorResponse);
      }
    }
  };

  useEffect(() => {
    initTE({ Input, Ripple });
  }, []);
  return (
    <div className="bg-secondary absolute inset-0">
      <form
        onSubmit={onSubmit}
        onChange={onChange}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-10 py-20 border border-primary rounded-xl"
      >
        <h3 className="text-3xl text-white font-bold mb-4">Sign Up</h3>
        <div className="block mb-5">
          <div className="relative w-96" data-te-input-wrapper-init>
            <input
              type="text"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="nameInput"
              name="name"
            />
            <label
              htmlFor="nameInput"
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
            >
              Name
            </label>
          </div>

          {errors && (
            <DisplayFormErrorMessage inputName="name" errors={errors} />
          )}
        </div>
        <div className="block mb-5">
          <div className="relative w-96" data-te-input-wrapper-init>
            <input
              type="email"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="emailInput"
              name="email"
            />
            <label
              htmlFor="emailInput"
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
            >
              Email
            </label>
          </div>
          {errors && (
            <DisplayFormErrorMessage inputName="email" errors={errors} />
          )}
        </div>
        <div className="block mb-5">
          <div className="relative" data-te-input-wrapper-init>
            <input
              type="password"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="passwordInput"
              name="password"
            />
            <label
              htmlFor="passwordInput"
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
            >
              Password
            </label>
          </div>
          {errors && (
            <DisplayFormErrorMessage inputName="password" errors={errors} />
          )}
        </div>
        <button
          type="submit"
          data-te-ripple-init
          data-te-ripple-color="light"
          className="block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignUp;
