import classNames from 'classnames/bind';
import styles from './WrapperNotify.module.scss';
const cx = classNames.bind(styles);

function WrapperNotify({ data, className }) {
    return (
        <div className={cx('wrapper', className)}>
            <img src={data.image} alt="logo" className={cx('logo')} />
            <div className={cx('content')}>
                <p className={cx('message')}>
                    <span className={cx('tittle')}>{data.title}: </span>
                    {data.content}
                </p>
            </div>
        </div>
    );
}

export default WrapperNotify;
