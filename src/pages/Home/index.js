import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
const cx = classNames.bind(styles);

function Home() {
    axios
        .get(
            `https://hiringwebapi-production.up.railway.app/getAll?fbclid=IwAR3poxBWCdRZRmHVdFmIh4RZd04P86gJ8S5SenMXP4DVhOTYPm7iMb6jtiQ`,
        )
        .then((res) => {
            console.log(res.data.data);
        })
        .catch((error) => {
            console.log(error);
        });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('text_top_job')}>Top nhà tuyển dụng được quan tâm nhất</div>
                <div className={cx('d-flex', 'flex-wrap', 'card_company_home')}>
                    <div className={cx('item_company_candidate', 'p-2 m-2')}>
                        <img src={images.logo} alt="logo" className={cx('logo_company_home')} />
                        <a className={cx('name_company_home')} href="/">
                            Net Company
                        </a>
                        <a className={cx('number_recruit_company_home')} href="/">
                            Công việc đang tuyển: <span className={cx('number_job')}>5</span>
                        </a>

                        <div className={cx('evaluate_comany_home')}>
                            Đánh giá: <span className={cx('evaluate')}>4.5/5</span>
                            <FontAwesomeIcon icon={faStar} style={{ color: '#21c2e2' }} />
                        </div>
                        <div className={cx('address_company')}>
                            <FontAwesomeIcon icon={faLocationDot} style={{ color: '#21c2e2', marginRight: 5 }} />
                            Hồ Chí Minh
                        </div>
                    </div>
                    <div className={cx('item_company_candidate', 'p-2 m-2')}>
                        <img src={images.logo} alt="logo" className={cx('logo_company_home')} />
                        <a className={cx('name_company_home')} href="/">
                            Net Company
                        </a>
                        <a className={cx('number_recruit_company_home')} href="/">
                            Công việc đang tuyển: <span className={cx('number_job')}>5</span>
                        </a>

                        <div className={cx('evaluate_comany_home')}>
                            Đánh giá: <span className={cx('evaluate')}>4.5/5</span>
                            <FontAwesomeIcon icon={faStar} style={{ color: '#21c2e2' }} />
                        </div>
                        <div className={cx('address_company')}>
                            <FontAwesomeIcon icon={faLocationDot} style={{ color: '#21c2e2', marginRight: 5 }} />
                            Hồ Chí Minh
                        </div>
                    </div>
                    <div className={cx('item_company_candidate', 'p-2 m-2')}>
                        <img src={images.logo} alt="logo" className={cx('logo_company_home')} />
                        <a className={cx('name_company_home')} href="/">
                            Net Company
                        </a>
                        <a className={cx('number_recruit_company_home')} href="/">
                            Công việc đang tuyển: <span className={cx('number_job')}>5</span>
                        </a>

                        <div className={cx('evaluate_comany_home')}>
                            Đánh giá: <span className={cx('evaluate')}>4.5/5</span>
                            <FontAwesomeIcon icon={faStar} style={{ color: '#21c2e2' }} />
                        </div>
                        <div className={cx('address_company')}>
                            <FontAwesomeIcon icon={faLocationDot} style={{ color: '#21c2e2', marginRight: 5 }} />
                            Hồ Chí Minh
                        </div>
                    </div>
                    <div className={cx('item_company_candidate', 'p-2 m-2')}>
                        <img src={images.logo} alt="logo" className={cx('logo_company_home')} />
                        <a className={cx('name_company_home')} href="/">
                            Net Company
                        </a>
                        <a className={cx('number_recruit_company_home')} href="/">
                            Công việc đang tuyển: <span className={cx('number_job')}>5</span>
                        </a>

                        <div className={cx('evaluate_comany_home')}>
                            Đánh giá: <span className={cx('evaluate')}>4.5/5</span>
                            <FontAwesomeIcon icon={faStar} style={{ color: '#21c2e2' }} />
                        </div>
                        <div className={cx('address_company')}>
                            <FontAwesomeIcon icon={faLocationDot} style={{ color: '#21c2e2', marginRight: 5 }} />
                            Hồ Chí Minh
                        </div>
                    </div>
                    <div className={cx('item_company_candidate', 'p-2 m-2')}>
                        <img src={images.logo} alt="logo" className={cx('logo_company_home')} />
                        <a className={cx('name_company_home')} href="/">
                            Net Company
                        </a>
                        <a className={cx('number_recruit_company_home')} href="/">
                            Công việc đang tuyển: <span className={cx('number_job')}>5</span>
                        </a>

                        <div className={cx('evaluate_comany_home')}>
                            Đánh giá: <span className={cx('evaluate')}>4.5/5</span>
                            <FontAwesomeIcon icon={faStar} style={{ color: '#21c2e2' }} />
                        </div>
                        <div className={cx('address_company')}>
                            <FontAwesomeIcon icon={faLocationDot} style={{ color: '#21c2e2', marginRight: 5 }} />
                            Hồ Chí Minh
                        </div>
                    </div>
                </div>
                <div className={cx('navigation-home')}>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li class="page-item">
                                <a className="page-link" href="/">
                                    1
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="/">
                                    2
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="/">
                                    3
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Home;
