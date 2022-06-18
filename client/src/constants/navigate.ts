import {GameNavigate, GroupNavigate, HomeNavigate, MarketplaceNavigate, WatchNavigate} from '../components/Icons';


export const NAVIGATE_LIST = [
    {
        Icon: HomeNavigate,
        to: '/',
        title: 'Trang chủ',
    },
    {
        Icon: WatchNavigate,
        to: '/watch',
        title: 'Watch',
    },
    {
        Icon: MarketplaceNavigate,
        to: '/marketplace',
        title: 'Marketplace',
    },
    {
        Icon: GroupNavigate,
        to: '/group',
        title: 'Nhóm',
    },
    {
        Icon: GameNavigate,
        to: '/game',
        title: 'Trò chơi',
    },

]