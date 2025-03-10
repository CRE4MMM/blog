'use client'
import * as React from 'react'
import { Input } from '@/components/ui/input'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Formik, Form, FormikProps } from 'formik'
import { SignInSchema } from './schema/SignInSchema'
import { apiCall } from '@/utils/apiHelpers'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/lib/hooks'
import { setSignIn } from '@/lib/features/authSlice'

interface IFormValue {
    email: string
    password: string
}

const SignInPage: React.FunctionComponent = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [typePass, setTypePass] = React.useState<string>('password')

    const onHandleTypePass = () => {
        setTypePass(typePass === 'password' ? 'text' : 'password')
    }

    const onSignIn = async (values: IFormValue) => {
        try {
        const query = encodeURIComponent(
            `email='${values.email}' AND password='${values.password}'`
        )
        const response = await apiCall.get(`/accounts?where=${query}`)
        console.log(response.data)

        if (response.data.length === 1) {
            toast('Sign in berhasil')
            dispatch(
            setSignIn({
                id: response.data[0].objectId,
                firstname: response.data[0].firstname,
                lastname: response.data[0].lastname,
                email: response.data[0].email,
            })
            )
            localStorage.setItem('auth', response.data[0].objectId)
            router.replace('/')
        } else {
            toast('Account cant be found')
        }
        } catch (error) {
        console.log(error)
        }
    }

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8">
            <h1 className="text-2xl font-semibold text-center mb-6">Sign In</h1>
            <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={SignInSchema}
            onSubmit={(values) => onSignIn(values)}
            >
            {(props: FormikProps<IFormValue>) => {
                const { errors, values, handleChange } = props
                return (
                <Form className="space-y-5">
                    <div>
                    <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="w-full rounded-lg border-gray-300 focus:ring focus:ring-indigo-200"
                        onChange={handleChange}
                        value={values.email}
                    />
                    {errors.email && (
                        <span className="text-red-500 text-sm">{errors.email}</span>
                    )}
                    </div>
                    <div className="relative">
                    <Input
                        name="password"
                        type={typePass}
                        placeholder="Password"
                        className="w-full rounded-lg border-gray-300 focus:ring focus:ring-indigo-200 pr-10"
                        onChange={handleChange}
                        value={values.password}
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                        onClick={onHandleTypePass}
                    >
                        {typePass === 'password' ? (
                        <FaEye size={20} />
                        ) : (
                        <FaEyeSlash size={20} />
                        )}
                    </button>
                    {errors.password && (
                        <span className="text-red-500 text-sm">
                        {errors.password}
                        </span>
                    )}
                    </div>
                    <div className="flex justify-end">
                    <Button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg"
                    >
                        Sign In
                    </Button>
                    </div>
                </Form>
                )
            }}
            </Formik>
        </div>
        </div>
    )
}

export default SignInPage
