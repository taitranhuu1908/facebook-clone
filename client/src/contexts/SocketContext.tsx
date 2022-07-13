import React, {createContext, useCallback, useEffect} from 'react';
import SockJS from 'sockjs-client';
import Stomp, {Frame} from 'stompjs';
import {useAppDispatch, useAppSelector} from "../app/hook";
import {appendFriendRequest} from "../app/features/FriendSlice";
import {IUserFull} from "../app/models/User";

const URL_SERVER = process.env.REACT_APP_URL_SERVER || 'http://localhost:1000';

const Sock = new SockJS(`${URL_SERVER}/ws`);
const stompClient = Stomp.over(Sock);

export const SocketContext = createContext(stompClient);

const SocketProvider = ({children}: { children: React.ReactNode }) => {
    const {user, isLoggedIn} = useAppSelector(state => state.authSlice);
    const dispatch = useAppDispatch();


    const onConnected = useCallback(() => {
        stompClient.subscribe(`/user/friend-request/${user.id}`, (data: Frame | undefined) => {
            if (data) {
                const friend: IUserFull = JSON.parse(data.body);
                dispatch(appendFriendRequest(friend))
            }
        })
        stompClient.subscribe(`/channel/connected`, (data: Frame | undefined) => {
            console.log(data)
        });

        stompClient.send(`/app/connected`, {}, `Xin chào`);
    }, [dispatch, user.id])

    useEffect(() => {
        const token = localStorage.getItem('auth');
        if (isLoggedIn) {

            stompClient.connect({
                'Authorization': `Bearer ${token}`,
            }, onConnected, onError);
            console.log(`re-render`)
        }

        return () => {
            stompClient.disconnect(() => {
                console.log(`Disconnected`)
            }, {})
        }

    }, [onConnected, isLoggedIn]);

    const onError = (error: Frame | string) => {
        console.log(error)
        console.error('Sorry, I cannot connect to the server right now.');
    }


    return (
        <SocketContext.Provider value={stompClient}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;