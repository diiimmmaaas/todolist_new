import {useFormik} from "formik";
import {AppRootStateType, useAppDispatch} from "../../bll/store";
import {LoginTC} from "../../bll/authReducer";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";


export const Login = () => {

    const dispatch = useAppDispatch()
    const isLoggenIn = useSelector<AppRootStateType, boolean>( state => state.auth.isLoggedIn )

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
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
                    id="checkbox"
                    name="checkbox"
                    type="checkbox"
                    onChange={formik.handleChange}
                    checked={formik.values.rememberMe}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}