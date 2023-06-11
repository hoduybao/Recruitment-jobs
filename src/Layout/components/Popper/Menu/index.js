import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/Layout/components/Popper';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import UserService from '~/utils/request';

const cx = classNames.bind(styles);



function Menu({ children, items = [] }) {
    const handleLogout = (employer) => {
        localStorage.removeItem('user');
        if (employer) {
            window.location.href = 'http://localhost:3001/employer/sign-in';
        } else {
            window.location.href = 'http://localhost:3001/sign-in';
        }
    };

    const HideStatus = (status, id_job) => {
        const fetch = async () => {
            if (status === 'approved') {
                let response = await UserService.postJob(`employer/setJob/${id_job}?action=hide`);
                console.log(response);
            } else if (status === 'hide') {
                let response = await UserService.postJob(`employer/setJob/${id_job}?action=approved`);
                console.log(response);
            }
        }

        fetch();
    }

    const DeleteJob = (id_job) => {
        const fetch = async () => {
            let response = await UserService.postJob(`employer/setJob/${id_job}?action=delete`);
            console.log(response);
        }

        fetch();
    }

    const renderItems = () => {
        return items.map((item, index) => {
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (item.separate) {
                            handleLogout(item.employer);
                        }
                        if (item.hide){
                            HideStatus(item.status, item.id_job);
                        }
                        if (item.delete){
                            DeleteJob(item.id_job);
                        }
                    }}
                />
            );
        });
    };

    return (
        <Tippy
            interactive
            delay={[0, 200]}
            offset={[12, 8]}
            hideOnClick={false}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>{renderItems()}</PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
