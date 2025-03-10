import * as Yup from "yup"

export const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string().required("Password required")
})