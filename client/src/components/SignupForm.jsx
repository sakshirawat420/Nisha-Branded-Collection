import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';

const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
};

const SignupForm = ({ showPassword, togglePasswordVisibility }) => {
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: Yup.object({
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                password: Yup.string()
                    .min(3, 'Must be 3 characters or more')
                    .max(15, 'Must be 15 characters or less')
                    .required('Required'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                    .required('Required'),
            }),
            onSubmit: (values, action) => {
                console.log(values.email, values.password);
                // Handle form submission
            },
        });

    return (
        <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center drop-shadow-lg  h-10  border-b-2 border-black px-2  bg-opacity-50  bg-white rounded">
                <input
                    type="text"
                    className="focus:outline-none bg-white bg-opacity-0 w-60 placeholder:text-black font-semibold"
                    name="email"
                    id="email"
                    placeholder="Email"
                    autoComplete="off"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <FaUser />
            </div>
            {errors.email && touched.email && (
                <p className="form-error text-white text-xs font-semibold mt-[-10px]">
                    *{errors.email}
                </p>
            )}
            <div className="flex justify-between items-center drop-shadow-lg  h-10  border-b-2 border-black px-2  bg-opacity-50  bg-white rounded">
                <input
                    type={showPassword ? 'text' : 'password'}
                    className="focus:outline-none bg-white bg-opacity-0 w-60 placeholder:text-black font-semibold"
                    name="password"
                    id="password"
                    autoComplete="off"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {showPassword ? (
                    <FaEyeSlash onClick={togglePasswordVisibility} />
                ) : (
                    <FaEye onClick={togglePasswordVisibility} />
                )}
            </div>
            {errors.password && touched.password && (
                <p className="form-error text-white text-xs font-semibold mt-[-10px]">
                    *{errors.password}
                </p>
            )}
            <div className="flex justify-between items-center drop-shadow-lg  h-10  border-b-2 border-black px-2  bg-opacity-50  bg-white rounded">
                <input
                    type={showPassword ? 'text' : 'password'}
                    className="focus:outline-none bg-white bg-opacity-0 w-60 placeholder:text-black font-semibold"
                    name="confirmPassword"
                    id="confirmPassword"
                    autoComplete="off"
                    placeholder="Confirm Password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>
            {errors.confirmPassword && touched.confirmPassword && (
                <p className="form-error text-white text-xs font-semibold mt-[-10px]">
                    *{errors.confirmPassword}
                </p>
            )}

            <button
                type="submit"
                className="text-black font-semibold bg-white w-full flex justify-center p-1 rounded "
            >
                SIGN UP
            </button>
        </div>
    );
};

export default SignupForm;
