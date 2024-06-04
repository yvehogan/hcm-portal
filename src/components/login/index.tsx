"use client"
import { useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from 'next/navigation';
import { Formik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import logo1 from "../../../public/icons/logo1.svg";
import FormInput from "../commons/Input";
import CheckboxInput from "../commons/CheckboxInput";
import { useCookies } from 'react-cookie';
import notification from "@/utilities/notification";
import handleFetch from "@/services/handleFetch";

const validationSchema = Yup.object({
  password: Yup.string().required("Password is required"),
  email: Yup.string().required("Email is required"),
});

const Login = () => {
  const router = useRouter();
  const [, setCookie] = useCookies(['data']);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const loginMutation = useMutation(handleFetch, {
    onSuccess: (res) => {
      setLoading(false);
      if (res?.responseMessage === 'Login succeeded') {
        const path = '/dashboard/upload';
        setCookie('data', res?.responseData?.accessToken, { secure: true, sameSite: true });
        router.push(path);
        notification({
          title: 'Success',
          message: `${res?.responseMessage}` ,
          type: 'success'
        });
      } else {
        notification({
          title: 'Invalid Login Details',
          message: 'Incorrect Email or Password',
          type: 'error'
        });
      }
    },
    onError: (err) => {
      setLoading(false);
      notification({
        title: 'Error',
        message: err?.toString() || 'Something went wrong.',
        type: 'error'
      });
    }
  });
  

  const handleFormSubmit = (values: any) => {
    const { email, password } = values;

        if (!email.endsWith('@wemabank.com')) {
          notification({
            title: 'Invalid Email',
            message: 'Please provide a valid Wema Bank email',
            type: 'error'
          });
          return;
        }    
    setLoading(true);
    const body = { email, password };

    loginMutation.mutate({
      endpoint: 'authentication/login', method: 'POST', body, auth: true
    });
  };

  return (
    <div className="h-screen flex flex-col gap-y-3 justify-center items-center bg-loginBg w-full bg-no-repeat bg-cover">
      <Image src={logo1} alt="wema bank logo" />
      <div className="w-full md:w-[500px] rounded-[8px] shadow-md p-[32px] bg-white">
        <h1 className="text-2xl font-bold text-HCMblack mb-7 text-center">Log in</h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FormInput
                label="Email"
                name="email"
                type="text"
                placeholder="Moyinoluwa Akindele"
                required={true}
              />
              <FormInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required={true}
              />
              <div className="flex justify-between my-5 items-center">
                <div className="flex">
                  <CheckboxInput checked={isChecked} onChange={handleCheckboxChange} />
                  <p className="text-xs text-HCMgrey">Remember me</p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 text-sm font-bold px-5 bg-primary text-white rounded-[8px] h-[48px] hover:bg-[#c064a7] focus:outline-none"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Log in'}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
