import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/Layout/components/Popper';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
const cx = classNames.bind(styles);

function Menu({ children, items = [] }) {

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = 'http://localhost:3001/sign-in';
    };
    const renderItems = () => {
        return items.map((item, index) => {
            return <MenuItem key={index} data={item}  onClick={()=>{
                if(item.separate){
                    handleLogout();
                }
            }}/>;
        });
    };

    return (
        <Tippy
            interactive
            delay={[0, 500]}
            offset={[12, 8]}
            hideOnClick={false}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
