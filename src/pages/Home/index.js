import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import images from '~/assets/images';
import UserService from '~/utils/request';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function Home() {

    // UserService
    //     .getTopCompany(`company/getAll`, {
           
    //     })
    //     .then((res) => {
    //         //  console.log(res.data.data)
    //         console.log(res.data);
    //     });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('text_top_job')}>Top nhà tuyển dụng được quan tâm nhất</div>
                <div className={cx('d-flex', 'flex-wrap', 'card_company_home')}>
                    <Link to="/view-company"
                        className={cx('item_company_candidate', 'p-2 m-2')}
                        onClick={() => {
                            window.localStorage.setItem('id_company', '1');
                        }}
                    >
                        <img src={images.logo} alt="logo" className={cx('logo_company_home')} />
                        <div className={cx('name_company_home')}>Net Company</div>
                        <div className={cx('number_recruit_company_home')}>
                            <span className={cx('number_job')}>5 việc làm</span>&nbsp;- Hồ Chí Minh
                        </div>
                    </Link>


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
