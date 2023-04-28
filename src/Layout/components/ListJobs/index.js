import classNames from 'classnames/bind';
import styles from './ListJobs.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function ListJobs() {
    return (
            <div className={cx('inner')}>
                <div className={cx('text_top_job')}>
                   Tất cả việc làm
                </div>
                <div className={cx('d-flex', 'flex-wrap', 'card_company_home')}>
                    <div className={cx('item_recruit_candidate', 'p-2 m-2')}>
                        <img src={images.logo} alt="logo" className={cx('logo_company')} />
                        <div className={cx('name_recruit')} href="/">
                            Frontend - Developer (ReactJS, AngularJS)
                        </div>
                        <ul className={cx('require')}>
                            <li className={cx('label')}>
                                Mức lương: <span className={cx('value')}>12-20 triệu</span>
                            </li>
                            <li className={cx('label')}>
                                Kinh nghiệm: <span className={cx('value')}>1 năm</span>
                            </li>
                            <li className={cx('label')}>
                                Địa điểm: <span className={cx('value')}>Hồ Chí Minh</span>
                            </li>
                        </ul>
                        <div className={cx('time_update')}>
                            <FontAwesomeIcon icon={faClockRotateLeft} style={{ marginRight: 5 }} />
                            Cập nhật gần nhất: 2023-04-20
                        </div>
                    </div>
                    <div className={cx('item_recruit_candidate', 'p-2 m-2')}>
                        <img src={images.logo} alt="logo" className={cx('logo_company')} />
                        <div className={cx('name_recruit')} href="/">
                            Frontend - Developer (ReactJS, AngularJS)
                        </div>
                        <ul className={cx('require')}>
                            <li className={cx('label')}>
                                Mức lương: <span className={cx('value')}>12-20 triệu</span>
                            </li>
                            <li className={cx('label')}>
                                Kinh nghiệm: <span className={cx('value')}>1 năm</span>
                            </li>
                            <li className={cx('label')}>
                                Địa điểm: <span className={cx('value')}>Hồ Chí Minh</span>
                            </li>
                        </ul>
                        <div className={cx('time_update')}>
                            <FontAwesomeIcon icon={faClockRotateLeft} style={{ marginRight: 5 }} />
                            Cập nhật gần nhất: 2023-04-20
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default ListJobs;
