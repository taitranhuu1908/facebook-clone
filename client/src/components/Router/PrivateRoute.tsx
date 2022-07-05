import {Navigate, Outlet} from 'react-router-dom';
import {useAppSelector} from "../../app/hook";

export default function PrivateRoute() {
    const {isLoggedIn} = useAppSelector(state => state.authSlice);
    return isLoggedIn ? (
        <Outlet/>
    ) : <Navigate to="/login"/>;
}