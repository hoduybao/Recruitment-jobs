import classNames from 'classnames/bind';

import styles from './TotalReview.module.scss';
import { Rate } from 'antd';
const cx = classNames.bind(styles);

function TotalReview({rate,isListJob=false,onClick}) {
    var newRate=Math.round(rate * 2) / 2;
    return (
        <div className={cx('inner')}>
            <div className={cx('text_review_overall')}>Đánh giá tổng quát</div>
            <Rate className={cx('rating_company')} value={newRate} disabled allowHalf />
            <span className={cx('value_star')}>{newRate}</span>
            {isListJob && (
            <div className={cx('view_list_review')}>
                <button className={cx('btn_view_review')} onClick={onClick}>Xem tất cả đánh giá</button>
            </div>)}
        </div>
    );
}

export default TotalReview;
