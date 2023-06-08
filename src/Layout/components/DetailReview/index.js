import classNames from 'classnames/bind';
import styles from './DetailReview.module.scss';
import { Rate} from 'antd';
const cx = classNames.bind(styles);

function DetailReview() {

    const number_review=10;

    return (
        <div className={cx('inner')}>
            <div className={cx('text_list_review')}>Tất cả {number_review} đánh giá</div>
            <div className={cx('list_review')}>
                <div className={cx('item_review')}>
                    <Rate defaultValue={3} disabled/>
                    <div className={cx('time_review')}>20-10-2022</div>
                    <div className={cx('good')}>Đánh giá</div>
                    <p>Công ty rộng rãi , lương cao</p>
                </div>
                <div className={cx('item_review')}>
                    <Rate defaultValue={3} disabled/>
                    <div className={cx('time_review')}>20-10-2022</div>
                    <div className={cx('good')}>Đánh giá</div>
                    <p>Công ty rộng rãi , lương cao</p>
                </div>
                <div className={cx('item_review')}>
                    <Rate defaultValue={3} disabled/>
                    <div className={cx('time_review')}>20-10-2022</div>
                    <div className={cx('good')}>Đánh giá</div>
                    <p>Công ty rộng rãi , lương cao</p>
                </div>
                <div className={cx('item_review')}>
                    <Rate defaultValue={3} disabled/>
                    <div className={cx('time_review')}>20-10-2022</div>
                    <div className={cx('good')}>Đánh giá</div>
                    <p>Công ty rộng rãi , lương cao</p>
                </div>
            </div>
        </div>
    );
}

export default DetailReview;
