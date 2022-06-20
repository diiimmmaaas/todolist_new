import {useFormik} from "formik";
import {AppRootStateType, useAppDispatch} from "../../bll/store";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import { LoginTC } from "../../bll/authReducer";


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {

    const dispatch = useAppDispatch()
    const isLoggenIn = useSelector<AppRootStateType, boolean>( state => state.auth.isLoggedIn )


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'Password must be more 3 symbols';
            }

            return errors;
        },
        onSubmit: values => {
            dispatch(LoginTC(values))
        },
    })

    if (isLoggenIn) {
        return <Navigate to={'/'}/>
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
            </div>
            <div>
                <label htmlFor="rememberMe">Remember me</label>
                <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    onChange={formik.handleChange}
                    checked={formik.values.rememberMe}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}