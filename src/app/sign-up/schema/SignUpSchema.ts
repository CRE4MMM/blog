import * as Yup from 'yup'

export const SignUpSchema = Yup.object().shape({
    firstname: Yup.string().required("Firstname required"),
    lastname: Yup.string().required("Lastname required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Password must match").required("Confirmation password required")
})