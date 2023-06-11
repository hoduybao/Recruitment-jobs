import classNames from 'classnames/bind';
import styles from './DetailReview.module.scss';
import { Rate } from 'antd';
const cx = classNames.bind(styles);

function DetailReview({rating}) {
    const convertDate = (time) => {
        const dateTime = new Date(time);
        const date = dateTime.getDate();
        var month = dateTime.getMonth() + 1; // Months are zero-based, so we add 1
        if(month.toString().length===1)
        {
            month="0"+month;
        }
        const year = dateTime.getFullYear();
        return date + '-' + month + '-' + year;
    };
    return (
        <div className={cx('inner')}>
            <div className={cx('text_list_review')}>Tất cả {rating.length} đánh giá</div>
            <div className={cx('list_review')}>
                {rating.map((rate, index) => (
                    <div className={cx('item_review')} key={index}>
                        <Rate value={rate.rate} disabled  allowHalf className={cx('rate')} />
                        <div className={cx('time_review')}>{convertDate(rate.createdDate)}</div>
                        <div className={cx('good')}>Đánh giá</div>
                        <p>{rate.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DetailReview;
