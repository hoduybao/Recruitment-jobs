import classNames from 'classnames/bind';
import styles from './ResultSearch.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faClockRotateLeft  } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function ResultSearch() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('text_top_job')}>
                    Tìm thấy<span> 10 </span> công việc phù hợp với bạn
                </div>
                <div className={cx('d-flex', 'flex-wrap', 'card_company_home')}>
                    <div className={cx('item_recruit_candidate', 'p-2 m-2')}>
                        <img src={images.logo} alt="logo" className={cx('logo_company')} />
                        <div className={cx('name_recruit')} href="/">
                            Frontend - Developer (ReactJS, AngularJS)
                        </div>
                        <div className={cx('name_company')}>NET Company</div>
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
                            <FontAwesomeIcon icon={faClockRotateLeft} style={{ color: '#21c2e2', marginRight: 5 }} />
                            Cập nhật gần nhất: <span className={cx('value')}>2023-04-20</span>
                        </div>
                    </div>
                    <div className={cx('item_recruit_candidate', 'p-2 m-2')}>
                        <img src={images.logo} alt="logo" className={cx('logo_company')} />
                        <div className={cx('name_recruit')} href="/">
                            Frontend - Developer (ReactJS, AngularJS)
                        </div>
                        <div className={cx('name_company')}>NET Company</div>
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
                            <FontAwesomeIcon icon={faClockRotateLeft} style={{ color: '#21c2e2', marginRight: 5 }} />
                            Cập nhật gần nhất: <span className={cx('value')}>2023-04-20</span>
                        </div>
                    </div>
                    <div className={cx('item_recruit_candidate', 'p-2 m-2')}>
                        <img src={images.logo} alt="logo" className={cx('logo_company')} />
                        <div className={cx('name_recruit')} href="/">
                            Frontend - Developer (ReactJS, AngularJS)
                        </div>
                        <div className={cx('name_company')}>NET Company</div>
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
                            <FontAwesomeIcon icon={faClockRotateLeft} style={{ color: '#21c2e2', marginRight: 5 }} />
                            Cập nhật gần nhất: <span className={cx('value')}>2023-04-20</span>
                        </div>
                    </div>
                </div>
                <div className={cx('navigation-home')}>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                        <li className={cx('page-item', 'pagination-lg')}>
                                <a className="page-link" href="/">
                                    Trang trước
                                </a>
                            </li>
                            <li className={cx('page-item', 'pagination-lg')}>
                                <a className="page-link" href="/">
                                    1
                                </a>
                            </li>
                            <li className={cx('page-item', 'pagination-lg')}>
                                <a className="page-link" href="/">
                                    2
                                </a>
                            </li>
                            <li className={cx('page-item', 'pagination-lg')}>
                                <a className="page-link" href="/">
                                    3
                                </a>
                            </li>
                            <li className={cx('page-item', 'pagination-lg')}>
                                <a className="page-link" href="/">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default ResultSearch;
