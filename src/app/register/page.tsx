'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import COMMON_CONSTANTS from '@/lib/constants/common';
import { singupService } from '@/lib/services/authService';
import InputForm, { InputFormError } from '@/components/form/InputForm';

export interface UserData {
    fullname: string;
    email: string;
    password: string;
    confirmPassword: string | '';
}

interface FormError {
    valid: boolean;
    message: string;
}

const defaultError = {
    valid: true,
    message: ''
}

const Register: React.FC = () => {

    const { validations: {
        emailLenght,
        fullnameLenght,
        passwordEquals,
        apiError,
        serverError
    } } = COMMON_CONSTANTS

    const [formData, setFormData] = useState<UserData>({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState<FormError>(defaultError);
    const [signup, setSignup] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validfullname = (fullname: string) => {
        if (fullname && fullname.length > 6) return true;
        setError({
            valid: false,
            message: fullnameLenght
        });
        return false
    };

    const validEmail = (email: string) => {
        if (email && email.length > 6) return true;
        setError({
            valid: false,
            message: emailLenght
        });
        return;
    };

    const validPass = (pass1: string, pass2: string) => {
        if (pass1 && pass2 && pass1 === pass2) return true;
        setError({
            valid: false,
            message: passwordEquals
        });
        return;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(defaultError);
        if (!validfullname(formData.fullname)) return;
        if (!validEmail(formData.email)) return;
        if (!validPass(formData.password, formData.confirmPassword)) return;
        const { confirmPassword, ...dataToSubmit } = formData;
        try {
            const response = await singupService(dataToSubmit);
            if (response?.status === 200 && response?.data?.status === 200) {
                setSignup(true)
            } else {
                setSignup(false)
                setError({
                    valid: false,
                    message: `${apiError}: ${response?.data?.message}`
                });
            }
        } catch (error: any) {
            setError({
                valid: false,
                message: `${serverError}: ${error.message}`
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-96">
                {
                    signup ?
                        <div className="mb-4 p-2 bg-red-100 text-green-600 border border-green-300 rounded">
                            User created
                        </div>
                        :
                        <>
                            <h2 className="text-2xl font-semibold mb-4">User Registration</h2>
                            <form onSubmit={handleSubmit}>
                                <InputForm
                                    label="Fullname"
                                    name="fullname"
                                    type="text"
                                    onChange={handleChange}
                                    value={formData.fullname}
                                />
                                <InputForm
                                    label="Email"
                                    name="email"
                                    type="email"
                                    onChange={handleChange}
                                    value={formData.email}
                                />
                                <InputForm
                                    label="Password"
                                    name="password"
                                    type="password"
                                    onChange={handleChange}
                                    value={formData.password}
                                />
                                <InputForm
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                    onChange={handleChange}
                                    value={formData.confirmPassword}
                                />
                                <InputFormError error={error} />
                                <button
                                    onClick={handleSubmit}
                                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                                >
                                    Register
                                </button>
                            </form>
                        </>
                }
            </div>
        </div>
    );
};

export default Register;
