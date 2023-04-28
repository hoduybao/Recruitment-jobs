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
                            <span className={cx('number_job')}>5 việc làm</span>&nbsp;- Hồ Chí Minh
                        </a>


                    
                    </div>
                    <div className={cx('item_company_candidate', 'p-2 m-2')}>
                        <img src={images.logo} alt="logo" className={cx('logo_company_home')} />
                        <a className={cx('name_company_home')} href="/">
                            Net Company
                        </a>
                        <a className={cx('number_recruit_company_home')} href="/">
                            <span className={cx('number_job')}>5 việc làm</span>&nbsp;- Hồ Chí Minh
                        </a>


                    
                    </div>
                    <div className={cx('item_company_candidate', 'p-2 m-2')}>
                        <img src={images.logo} alt="logo" className={cx('logo_company_home')} />
                        <a className={cx('name_company_home')} href="/">
                            Net Company
                        </a>
                        <a className={cx('number_recruit_company_home')} href="/">
                            <span className={cx('number_job')}>5 việc làm</span>&nbsp;- Hồ Chí Minh
                        </a>


                    
                    </div>
                    <div className={cx('item_company_candidate', 'p-2 m-2')}>
                        <img src={images.logo} alt="logo" className={cx('logo_company_home')} />
                        <a className={cx('name_company_home')} href="/">
                            Net Company
                        </a>
                        <a className={cx('number_recruit_company_home')} href="/">
                            <span className={cx('number_job')}>5 việc làm</span>&nbsp;- Hồ Chí Minh
                        </a>


                    
                    </div>
                    <div className={cx('item_company_candidate', 'p-2 m-2')}>
                        <img src={images.logo} alt="logo" className={cx('logo_company_home')} />
                        <a className={cx('name_company_home')} href="/">
                            Net Company
                        </a>
                        <a className={cx('number_recruit_company_home')} href="/">
                            <span className={cx('number_job')}>5 việc làm</span>&nbsp;- Hồ Chí Minh
                        </a>


                    
                    </div>
                    <div className={cx('item_company_candidate', 'p-2 m-2')}>
                        <img src={images.logo} alt="logo" className={cx('logo_company_home')} />
                        <a className={cx('name_company_home')} href="/">
                            Net Company
                        </a>
                        <a className={cx('number_recruit_company_home')} href="/">
                            <span className={cx('number_job')}>5 việc làm</span>&nbsp;- Hồ Chí Minh
                        </a>


                    
                    </div>
                 
                </div>
                
            </div>
        </div>
    );
}

export default Home;