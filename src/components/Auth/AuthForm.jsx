import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  useRegisterMutation,
  useGetCurrentUserQuery,
  useLoginMutation,
} from "../../api/authApi";
import PrimaryBtn from "../buttons/PrimaryBtn";
import SecondaryBtn from "../buttons/SecondaryBtn";
import { TiEye } from "react-icons/ti";
import { LuEyeClosed } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showNortification } from "../../features/notification/notificationSlice";

export default function AuthForm() {
  const [mode, setMode] = useState("login");
  const [passVisible, setPassVisible] = useState(false);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [
    registerUser,
    { isLoading: isRegistering, isSuccess: registerSuccess },
  ] = useRegisterMutation();
  const [login, { isLoading: isLogin, isSuccess: loginSuccess }] =
    useLoginMutation();
  const { data: currentUser, refetch } = useGetCurrentUserQuery();

  useEffect(() => {
    if (registerSuccess || loginSuccess) {
      refetch();
    }
  }, [refetch, registerSuccess, loginSuccess]);

  useEffect(() => {
    if (currentUser) {
      navigate("/profile");
      dispatch(showNortification(`Logged in as ${currentUser.name}`));
    }
  },[currentUser, navigate, dispatch]);

  async function onSubmit(data) {
    try {
      if (mode === "signup") {
        await registerUser({
          email: data.email,
          password: data.password,
          name: data.name,
        });
      } else {
        await login({ email: data.email, password: data.password });
      }
      reset();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center-safe gap-5 px-[20px]">
      <div>
        <h1 className="font-medium text-[black] dark:text-[white] text-3xl transition-all duration-300 ease-in-out">
          {mode === "login" ? "Login" : "Sign Up"}
        </h1>
      </div>

      {/* From */}
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2.5 max-w-[500px]"
        >
          {/* name vicsible only if from is for registeration */}
          {mode !== "login" && (
            <div className="flex flex-col gap-2 min-h-[64px]">
              <div className="flex flex-col items-start md:items-center-safe gap-2.5 md:gap-5 md:grid md:grid-cols-4">
                <label
                  className="col-end-2 font-bold text-[#353535] dark:text-[#cac8c8] text-xl text-left md:text-right text-nowrap transition-all duration-300 ease-in-out"
                  htmlFor=""
                >
                  Name
                </label>
                <input
                  className="col-start-2 col-end-5 bg-[#E4E3E3] dark:bg-[#272829] px-[20px] py-[8px] rounded focus:outline-[#a1a1a1] focus:outline-1 w-full text-black dark:text-white transition-all duration-300 ease-in-out"
                  type="text"
                  placeholder="John Doe"
                  {...register("name", { required: "Enter Your Name" })}
                />
              </div>
              <p className="text-red-600 text-xs text-right">
                {errors.name && errors.name.message}
              </p>
            </div>
          )}

          {/* email input */}
          <div className="flex flex-col gap-2 min-h-[64px]">
            <div className="flex flex-col items-start md:items-center-safe gap-2.5 md:gap-5 md:grid md:grid-cols-4">
              <label
                className="col-end-2 font-bold text-[#353535] dark:text-[#cac8c8] text-xl text-left md:text-right text-nowrap transition-all duration-300 ease-in-out"
                htmlFor=""
              >
                E-mail
              </label>
              <input
                className="col-start-2 col-end-5 bg-[#E4E3E3] dark:bg-[#272829] px-[20px] py-[8px] rounded focus:outline-[#a1a1a1] focus:outline-1 w-full text-black dark:text-white transition-all duration-300 ease-in-out"
                type="email"
                placeholder="johndoe9@gmail.com"
                {...register("email", {
                  required: "Enter Your Email",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
            </div>
            <p className="text-red-600 text-xs text-right">
              {errors.email && errors.email.message}
            </p>
          </div>
          {/* password input */}
          <div className="flex flex-col gap-2 min-h-[64px]">
            <div className="flex flex-col items-start md:items-center-safe gap-2.5 md:gap-5 md:grid md:grid-cols-4">
              <label
                className="col-end-2 font-bold text-[#353535] dark:text-[#cac8c8] text-xl text-left md:text-right text-nowrap transition-all duration-300 ease-in-out"
                htmlFor=""
              >
                Password
              </label>
              <div className="relative col-start-2 col-end-5">
                <input
                  className="bg-[#E4E3E3] dark:bg-[#272829] py-[8px] pr-[50px] pl-[20px] rounded focus:outline-1 pupfocus:outline-[#a1a1a1] w-full text-[black] dark:text-white transition-all duration-300 ease-in-out"
                  type={passVisible ? "text" : "password"}
                  placeholder={passVisible ? "Johnliza" : "*********"}
                  {...register("password", {
                    required: "Enter Your Password",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password cannot exceed 20 characters",
                    },
                  })}
                />

                {/* show pass button */}
                <div className="top-0 right-0 absolute cursor-pointer">
                  <SecondaryBtn
                    hover={
                      theme === "light"
                        ? "hover:text-[#9810FA]"
                        : "hover:text-[#2563EB]"
                    }
                    onClick={() => setPassVisible(!passVisible)}
                    noScale={true}
                    padX={"px-[12px]"}
                    padY={"py-[12px]"}
                    icon={passVisible ? <TiEye /> : <LuEyeClosed />}
                    type={"button"}
                  />
                </div>
              </div>
            </div>
            <p className="text-red-600 text-xs text-right">
              {errors.password && errors.password.message}
            </p>
          </div>
          {/* Login or Register button */}
          <div className="flex justify-center-safe">
            <PrimaryBtn
              style={"2"}
              type={"submit"}
              text={
                isLogin || isRegistering
                  ? "processing"
                  : mode === "login"
                  ? "Login"
                  : "Register"
              }
              disabled={isRegistering || isLogin}
            />
          </div>
        </form>

        {/* from toggle section */}

        <div className="mt-[20px]">
          <div>
            <p className="text-center">
              {mode === "login"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <button
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                className="text-blue-500 underline cursor-pointer"
              >
                {mode === "login" ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
