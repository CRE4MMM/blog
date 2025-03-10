'use client'
import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Formik, Form, FormikProps } from 'formik'
import { SignUpSchema } from './schema/SignUpSchema'
import { toast } from 'react-toastify'
import { apiCall } from '@/utils/apiHelpers'

interface IFormValue {
    firstname: string
    lastname: string
    email: string
    password: string
    confirmPassword: string
}

const SignUp = () => {
    const router = useRouter()
    const [typePass, setTypePass] = React.useState('password')
    const [typeConfirmPass, setTypeConfirmPass] = React.useState('password')

    const onSignUp = async (values: IFormValue) => {
        try {
        const response = await apiCall.post('/accounts', values)
        toast.success(`Periksa email ${response.data.email}`)
        router.push('/sign-in')
        } catch (error) {
            console.log(error);
            toast.error('Pendaftaran gagal, coba lagi')
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md">
            <Card className="shadow-lg rounded-xl p-6 bg-white">
            <CardHeader className="text-center">
                <h1 className="text-2xl font-bold">Sign Up</h1>
            </CardHeader>
            <CardContent>
                <Formik
                initialValues={{
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                }}
                validationSchema={SignUpSchema}
                onSubmit={onSignUp}
                >
                {(props: FormikProps<IFormValue>) => {
                    const { values, handleChange } = props

                    return (
                    <Form className="space-y-4">
                        <div className="flex gap-4">
                        <Input
                            name="firstname"
                            type="text"
                            placeholder="First Name"
                            className="w-1/2 rounded-lg"
                            onChange={handleChange}
                            value={values.firstname}
                        />
                        <Input
                            name="lastname"
                            type="text"
                            placeholder="Last Name"
                            className="w-1/2 rounded-lg"
                            onChange={handleChange}
                            value={values.lastname}
                        />
                        </div>
                        <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="rounded-lg"
                        onChange={handleChange}
                        />
                        <div className="relative">
                        <Input
                            name="password"
                            type={typePass}
                            placeholder="Password"
                            className="rounded-lg pr-10"
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="absolute top-2 right-3 text-gray-500"
                            onClick={() =>
                            setTypePass(
                                typePass === 'password' ? 'text' : 'password'
                            )
                            }
                        >
                            {typePass === 'password' ? <FaEye /> : <FaEyeSlash />}
                        </button>
                        </div>
                        <div className="relative">
                        <Input
                            name="confirmPassword"
                            type={typeConfirmPass}
                            placeholder="Confirm Password"
                            className="rounded-lg pr-10"
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="absolute top-2 right-3 text-gray-500"
                            onClick={() =>
                            setTypeConfirmPass(
                                typeConfirmPass === 'password' ? 'text' : 'password'
                            )
                            }
                        >
                            {typeConfirmPass === 'password' ? (
                            <FaEye />
                            ) : (
                            <FaEyeSlash />
                            )}
                        </button>
                        </div>
                        <Button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                        >
                        Sign Up
                        </Button>
                    </Form>
                    )
                }}
                </Formik>
            </CardContent>
            </Card>
        </div>
        </div>
    )
}

export default SignUp
