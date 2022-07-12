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
    const {user} = useAppSelector(state => state.authSlice);
    const dispatch = useAppDispatch();

    const onConnected = useCallback(() => {
        if (user) {
            stompClient.subscribe(`/user/friend-request/${user.id}`, (data: Frame | undefined) => {
                if (data) {
                    const friend: IUserFull = JSON.parse(data.body);
                    dispatch(appendFriendRequest(friend))
                }
            })
        }
        stompClient.subscribe(`/channel/connected`, (data: Frame | undefined) => {
            console.log(data)
        });
        stompClient.send(`/app/connected`, {}, `Xin chào`);
    }, [dispatch, user])

    useEffect(() => {
        const token = localStorage.getItem('auth');
        stompClient.connect({
            'Authorization': `Bearer ${token}`,
        }, onConnected, onError);
    }, [onConnected]);

    const onError = (error: Frame | string) => {
        console.log(error)
    }


    return (
        <SocketContext.Provider value={stompClient}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;