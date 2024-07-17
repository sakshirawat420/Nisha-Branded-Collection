import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import cover from '../assets/woman-s-clothing-hanger-modern-shop-boutique.jpg';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../api/userApi';
// import { useDispatch } from 'react-redux';
// import { setUserLoginData } from '../reducers/authSlice';

const initialValues = {
    email: 'sakshirawat49916@gmail.com',
    password: 'Sakshi@123',
};

const Login = () => {
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [login] = useLoginMutation();

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: Yup.object({
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                password: Yup.string()
                    .min(8, 'Must be 8 characters or more')
                    .max(15, 'Must be 15 characters or less')
                    .required('Required'),
            }),
            onSubmit: (values, action) => {
                login({
                    email: values.email,
                    password: values.password,
                })
                    .unwrap()

                    .then(payload => {
                        console.log('Token received:', payload.token); // Log the token here

                        // dispatch(
                        //     setUserLoginData({
                        //         jwt: payload.token,
                        //         userId: payload.userId,
                        //     })
                        // );
                        window.sessionStorage.setItem('JWT', payload.token);

                        console.log(
                            'Token after dispatch and storage:',
                            payload.token
                        );
                        navigate('/');
                        action.resetForm();
                        action.setSubmitting(false);
                        return payload;
                    })
                    .catch(error => {
                        action.resetForm();
                        action.setSubmitting(false);
                        throw error;
                    });
            },
        });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div
            className="relative flex border-2 justify-center items-center h-screen w-screen bg-cover"
            style={{ backgroundImage: `url(${cover})` }}
        >
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col py-10 px-5 gap-3 bg-white border-b-2 border-r-2  showdow-xl   drop-shadow-lg rounded-2xl  p-10 h-full w-full  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-25  border-gray-100 ">
                    <div className="text-2xl text-center font-bold  mb-4">
                        User Login
                    </div>
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
                    {errors.email && touched.email ? (
                        <p className="form-error text-white text-xs font-semibold mt-[-10px]">
                            *{errors.email}
                        </p>
                    ) : (
                        <p className="text-white text-xs font-semibold invisible mt-[-10px]">
                            error{' '}
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
                    {errors.password && touched.password ? (
                        <p className="form-error text-white text-xs font-semibold mt-[-10px]">
                            *{errors.password}
                        </p>
                    ) : (
                        <p className="text-white text-xs font-semibold invisible mt-[-10px]">
                            error
                        </p>
                    )}
                    <div className="flex gap-1 items-center text-xs">
                        <div className="text-xs   my-[-5px] font-semibold">
                            Forgot Password?
                        </div>
                        <span className=" text-white font-thin ">
                            Click Here
                        </span>
                    </div>
                    <button
                        type="submit"
                        className="text-black font-semibold bg-white w-full flex justify-center p-1 rounded "
                    >
                        SIGN IN
                    </button>

                    <div className="font-semibold text-xs flex gap-1 items-center mt-[-5px]">
                        <div>Don't Have an Account ?</div>
                        <span
                            className="text-white font-thin"
                            onClick={() =>
                                navigate('/signup', { replace: true })
                            }
                        >
                            Sign Up Now
                        </span>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
