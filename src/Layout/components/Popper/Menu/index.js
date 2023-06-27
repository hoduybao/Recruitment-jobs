import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/Layout/components/Popper';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import MenuNotify from './MenuNotify';
import UserService from '~/utils/request';

const cx = classNames.bind(styles);

function Menu({ children, items = null, notifies = null }) {
    var classList = cx('menu-list');
    if (items === null) {
        classList = cx('menu-list-notify');
    }
    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('back');
        window.location.href = '/sign-in';
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
        };

        fetch();
    };

    const DeleteJob = (id_job) => {
        const fetch = async () => {
            let response = await UserService.postJob(`employer/setJob/${id_job}?action=delete`);
            console.log(response);
        };

        fetch();
    };

    const renderItems = () => {
        if (items !== null) {
            return items.map((item, index) => {
                return (
                    <MenuItem
                        key={index}
                        data={item}
                        onClick={() => {
                            if (item.separate) {
                                handleLogout();
                            }
                            if (item.hide) {
                                HideStatus(item.status, item.id_job);
                            }
                            if (item.delete) {
                                DeleteJob(item.id_job);
                            }
                        }}
                    />
                );
            });
        } else {
            if (notifies) {
                console.log(notifies);
                return notifies.map((item, index) => {
                    return <MenuNotify key={index} data={item} />;
                });
            } else {
                return <div className={cx('not_notify')}>Không có thông báo nào</div>;
            }
        }
    };

    return (
        <Tippy
            interactive
            delay={[0, 200]}
            offset={[12, 8]}
            hideOnClick={true}
            placement="bottom-end"
            trigger="click"
            render={(attrs) => (
                <div className={classList} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>{renderItems()}</PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
