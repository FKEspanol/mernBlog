import { useEffect, useState } from "react";
import { Input, Ripple, initTE } from "tw-elements";

import DisplayFormErrorMessage from "../reusable/DisplayErrorMsg";

import ApiError from "../helper/handleApiError";

const API = import.meta.env;
let formBody = {};

function SignUp() {
  const [errors, setErrors] = useState();

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
        className="bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-10 py-20 border border-primary rounded-xl"
      >
        <h3 className="text-3xl font-bold mb-4">Sign Up</h3>
        <div className="block mb-5 w-96">
          <div className="relative" data-te-input-wrapper-init>
            <input
              type="text"
              className="peer tw-input"
              id="nameInput"
              name="name"
            />
            <label htmlFor="nameInput" className="input-label">
              Name
            </label>
          </div>

          {errors && (
            <DisplayFormErrorMessage inputName="name" errors={errors} />
          )}
        </div>
        <div className="block mb-5 w-96">
          <div className="relative" data-te-input-wrapper-init>
            <input
              type="email"
              className="peer tw-input"
              id="emailInput"
              name="email"
            />
            <label htmlFor="emailInput" className="input-label">
              Email
            </label>
          </div>
          {errors && (
            <DisplayFormErrorMessage inputName="email" errors={errors} />
          )}
        </div>
        <div className="block mb-5 w-96">
          <div className="relative" data-te-input-wrapper-init>
            <input
              type="password"
              className="peer tw-input"
              id="passwordInput"
              name="password"
            />
            <label htmlFor="passwordInput" className="input-label">
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
