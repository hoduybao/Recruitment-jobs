import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import WrapperNotify from '../../WrapperNotify';

const cx = classNames.bind(styles);

function MenuNotify({ data }) {
    const classes = cx('menu-item');
    return <WrapperNotify className={classes} data={data}></WrapperNotify>;
}

export default MenuNotify;
