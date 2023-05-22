import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faCheckToSlot, faFileMedical } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('text_efficiency')}>Hiệu quả tuyển dụng</div>
                <div className={cx('d-flex', 'flex-wrap','list_result')}>
                    <div className={cx('rectangle_news_posted')}>
                        <div className={cx('quantity_news_posted')}>3</div>
                        <div className={cx('text_news_posted')}>Ứng viên cần tuyển</div>
                        <FontAwesomeIcon icon={faBullhorn} className={cx('ic_megaphone')} />
                    </div>
                    <div className={cx('rectangle_quantity_candidate')}>
                        <div className={cx('quantity_candidate')}>3</div>
                        <div className={cx('text_quantity_candidates')}>Ứng viên đã nộp hồ sơ</div>
                        <FontAwesomeIcon icon={faFileMedical} className={cx('ic_candidate')} />
                    </div>
                    <div className={cx('rectangle_accepted')}>
                        <div className={cx('quantity_accepted')}>3</div>
                        <div className={cx('text_accepted')}>Ứng viên trúng tuyển</div>
                        <FontAwesomeIcon icon={faCheckToSlot} className={cx('ic_accepted')} />
                    </div>
            
                </div>
            </div>
        </div>
    );
}

export default Home;
