import classNames from 'classnames/bind';
import styles from './WrapperNotify.module.scss';
const cx = classNames.bind(styles);

function WrapperNotify({ data, className }) {
    const switchTime = (time) => {
        var resultTime = '';

        var date1 = new Date();

        var date2 = new Date(time);
        date2.setUTCHours(date2.getUTCHours() - 7);

        var timeDiff = Math.abs(date2.getTime() - date1.getTime());

        var result = Math.floor(timeDiff / (1000 * 60));

        resultTime = result.toString() + ' phút trước';
        console.log(resultTime);
        if (result >= 60) {
            result = Math.floor(timeDiff / (1000 * 60 * 60));
            resultTime = result.toString() + ' giờ trước';

            if (result >= 24) {
                result = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                resultTime = result.toString() + ' ngày trước';
            }
        }

        return resultTime;
    };

    // Hiển thị kết quả
    return (
        <div className={cx('wrapper', className)}>
            <img src={data.image} alt="logo" className={cx('logo')} />
            <div className={cx('content')}>
                <p className={cx('message')}>
                    <span className={cx('tittle')}>{data.title}: </span>
                    {data.content}
                </p>
                <p className={cx('time_notify')}>{switchTime(data.time)}</p>
            </div>
        </div>
    );
}

export default WrapperNotify;
