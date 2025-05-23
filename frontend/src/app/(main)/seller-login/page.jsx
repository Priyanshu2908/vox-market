'use client'
// import { IconLoader3, IconSend2 } from '@tabler/icons-react';
import axios from 'axios';
import { useFormik } from 'formik';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});

const  SellerLogin = () => {
  const router = useRouter();
  // initializing Formik
  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      setSubmitting(true);
      axios.post('http://localhost:5000/seller/authenticate', values)
        .then((result) => {
          if (result.data?.token) {
            // Store the token securely
            localStorage.setItem('seller-token', result.data.token);
            // Set authorization header for future requests
            axios.defaults.headers.common['x-auth-token'] = result.data.token;
            toast.success('Login Successful');
            resetForm();
            router.push('/seller/dashboard');
          } else {
            toast.error('Authentication failed');
          }
        }).catch((err) => {
          console.error(err);
          toast.error(err.response?.data?.message || 'Login Failed');
        }).finally(() => {
          setSubmitting(false);
        });
    },
    validationSchema: LoginSchema

  });

  return (
    <div className="my-7 w-1/3 mx-auto bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700 ">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
            Seller Login
          </h1>
          <br />
          <br />  
          <Link
              className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
              href="/seller-signup"
            >
              Sign up here
            </Link>

          
          {/* Form */}
          <form onSubmit={loginForm.handleSubmit} >
            <div className="grid gap-y-4">
              {/* Form Group */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm mb-2 dark:text-white"
                >
                  Email address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    onChange={loginForm.handleChange}
                    value={loginForm.values.email}
                    className="py-3 border px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    required=""
                    aria-describedby="email-error"
                  />
                  <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                    <svg
                      className="size-5 text-red-500"
                      width={16}
                      height={16}
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>
                  </div>
                </div>
                {
                  (loginForm.touched.email && loginForm.errors.email) &&
                  (
                    <p className=" text-xs text-red-600 mt-2" id="email-error">
                      {loginForm.errors.email}
                    </p>

                  )
                }
              </div>
              {/* End Form Group */}
              {/* Form Group */}
              <div>
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="block text-sm mb-2 dark:text-white"
                  >
                    Password
                  </label>
                  <a
                    className="inline-flex  items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                    href="../examples/html/recover-account.html"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    onChange={loginForm.handleChange}
                    value={loginForm.values.password}
                    name="password"
                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 border dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    required=""
                    aria-describedby="password-error"
                  />
                  <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                    <svg
                      className="size-5 text-red-500"
                      width={16}
                      height={16}
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>
                  </div>
                </div>
                {
                  (loginForm.touched.password && loginForm.errors.password) &&
                  (
                    <p className=" text-xs text-red-600 mt-2" id="password-error">
                      {loginForm.errors.password}
                    </p>

                  )
                }
              </div>
              {/* End Form Group */}
              {/* Checkbox */}
              <div className="flex items-center">
                <div className="flex">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="shrink-0  mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  />
                </div>
                <div className="ms-3">
                  <label
                    htmlFor="remember-me"
                    className="text-sm dark:text-white"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              {/* End Checkbox */}
              <button
                type="submit"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Sign in
              </button>
            </div>
          </form>
          {/* End Form */}
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;