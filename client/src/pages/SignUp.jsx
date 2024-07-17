import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import cover from '../assets/woman-s-clothing-hanger-modern-shop-boutique.jpg';
import { useRegisterMutation } from '../api/userApi';
// import { useDispatch } from 'react-redux';
// import { setUserLoginData } from '../reducers/authSlice';
import { useNavigate } from 'react-router-dom';

const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const [register] = useRegisterMutation();

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: initialValues,

            validationSchema: Yup.object({
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                password: Yup.string()
                    .min(8, 'Must be 8 characters or more')
                    .max(15, 'Must be 15 characters or less')
                    .matches(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
                        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                    )
                    .required('Required'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                    .required('Required'),
            }),

            onSubmit: (values, action) => {
               
                register({
                    email: values.email,
                    password: values.password,
                })
                    .unwrap()
                    .then(payload => {
                        // dispatch(
                        //     setUserLoginData({
                        //         jwt: payload.authToken,
                        //         userId: payload.userId,
                        //     })
                        // );
                        window.sessionStorage.setItem('JWT', payload.authToken);
                        window.sessionStorage.setItem(
                            'user',
                            JSON.stringify(payload.user)
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
                    })}
                   
            
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
                    <div className="font-bold text-center text-2xl mb-4 ">
                        User Sign Up
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

                    <div className="flex justify-between items-center drop-shadow-lg  h-10  border-b-2 border-black px-2  bg-opacity-50  bg-white rounded">
                        <input
                            type="text"
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
                    {errors.confirmPassword && touched.confirmPassword ? (
                        <p className="form-error text-white text-xs font-semibold mt-[-10px]">
                            *{errors.confirmPassword}
                        </p>
                    ) : (
                        <p className="text-white text-xs font-semibold invisible mt-[-10px]">
                            error
                        </p>
                    )}

                    <button
                        type="submit"
                        className="text-black font-semibold bg-white w-full flex justify-center p-1 rounded "
                    >
                        Register
                    </button>
                    <div className="text-xs  font-semibold mt-[-5px] text-center">
                        Already have an Account ?{' '}
                        <span
                            className="font-thin text-white "
                            onClick={() =>
                                navigate('/login', { replace: true })
                            }
                        >
                            Login
                        </span>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
