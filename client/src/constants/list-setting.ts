import SettingsIcon from '@mui/icons-material/Settings';
import LockIcon from '@mui/icons-material/Lock';
import ListIcon from '@mui/icons-material/List';
import LanguageIcon from '@mui/icons-material/Language';
import HelpIcon from '@mui/icons-material/Help';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';

export const LIST_SETTING = [
    {
        Icon: SettingsIcon,
        label: `Cài đặt & quyền riêng tư`,
        subMenu: [
            {
                Icon: SettingsIcon,
                label: `Cài đặt`,
                to: `/`
            },
            {
                label: `Kiểm tra quyền riêng tư`,
                to: `/`,
                Icon: LockIcon
            },
            {
                label: `Trung tâm quyền riêng tư`,
                to: `/`,
                Icon: LockIcon
            },
            {
                label: `Nhật ký hoạt động`,
                to: `/`,
                Icon: ListIcon
            },
            {
                label: `Ngôn ngữ`,
                to: `/`,
                Icon: LanguageIcon
            },
        ]
    },
    {
        Icon: HelpIcon,
        label: `Trợ giúp & hỗ trợ`,
        subMenu: [
            {
                label: `Trung tâm trợ giúp`,
                to: `/`,
                Icon: HelpIcon
            },
            {
                label: `Hộp thư hỗ trợ`,
                to: `/`,
                Icon: MarkAsUnreadIcon
            },
            {
                label: `Báo cáo sự cố`,
                to: `/`,
                Icon: ReportProblemIcon
            }
        ]
    },
    {
        Icon: DarkModeIcon,
        label: `Màn hình & trợ năng`,
        to: `/`
    },
    {
        Icon: ChatIcon,
        label: `Đóng góp ý kiến`,
        to: `/`
    },
    {
        Icon: LogoutIcon,
        label: `Đăng xuất`,
        to: `/`
    }
];