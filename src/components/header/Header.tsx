import React from 'react';
import styles from './Header.module.scss'
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../bll/store";
import {LogoutTC} from "../../bll/authReducer";

export const Header = () => {

    const isLoggenIn = useSelector<AppRootStateType, boolean>( state => state.auth.isLoggedIn )
    const dispatch = useAppDispatch()


    const onClickHandler = () => {
        dispatch(LogoutTC())
    }

    return (
        <div className={styles.header}>
            <div className={styles.container} >
                {isLoggenIn && <div>
                    <button onClick={onClickHandler}>Log out</button>
                </div>}
            </div>
        </div>
    );
}

