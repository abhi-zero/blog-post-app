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
import { useSelector } from "react-redux";

export default function AuthForm() {
  const [mode, setMode] = useState("login");
  const [passVisible, setPassVisible] = useState(false);
  const theme = useSelector((state) => state.theme.theme);
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
    if (registerSuccess) {
      refetch();
    }
  }, [refetch, registerUser]);

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
    <div className="flex flex-col justify-center items-center-safe">
      <div>
        <h1>{mode === "login" ? "Login" : "Sign Up"}</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-[500px]">
          {mode !== "login" && (
            <div className="flex flex-col gap-2 min-h-[64px]">
              <div className="items-center-safe gap-5 grid grid-cols-4">
                <label
                  className="col-end-2 font-bold text-[#353535] dark:text-[#cac8c8] text-xl text-right text-nowrap transition-all duration-300 ease-in-out"
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
                {errors.name && errors.name.message}abcs
              </p>
            </div>
          )}
          <div className="flex flex-col gap-2 min-h-[64px]">
            <div className="items-center-safe gap-5 grid grid-cols-4">
              <label
                className="col-end-2 font-bold text-[#353535] dark:text-[#cac8c8] text-xl text-right text-nowrap transition-all duration-300 ease-in-out"
                htmlFor=""
              >
                E-mail
              </label>
              <input
                className="col-start-2 col-end-5 bg-[#E4E3E3] dark:bg-[#272829] px-[20px] py-[8px] rounded focus:outline-[#a1a1a1] focus:outline-1 w-full text-black dark:text-white transition-all duration-300 ease-in-out"
                type="email"
                placeholder="johndoe9@gmail.com"
                {...register("email", { required: "Enter Your Email" })}
              />
            </div>
            <p className="text-red-600 text-xs text-right">
              {errors.email && errors.email.message}
            </p>
          </div>
          <div className="flex flex-col gap-2 min-h-[64px]">
            <div className="items-center-safe gap-5 grid grid-cols-4">
              <label
                className="col-end-2 font-bold text-[#353535] dark:text-[#cac8c8] text-xl text-right text-nowrap transition-all duration-300 ease-in-out"
                htmlFor=""
              >
                Password
              </label>
              <div className="relative col-start-2 col-end-5">
                <input
                  className="bg-[#E4E3E3] dark:bg-[#272829] py-[8px] pr-[50px] pl-[20px] rounded focus:outline-1 pupfocus:outline-[#a1a1a1] w-full text-[black] dark:text-white transition-all duration-300 ease-in-out"
                  type={passVisible ? "text" : "password"}
                  placeholder="*********"
                  {...register("pass", { required: "Enter Your Password" })}
                />
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
              {errors.pass && errors.pass.message}
            </p>
          </div>

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
      </div>
    </div>
  );
}
