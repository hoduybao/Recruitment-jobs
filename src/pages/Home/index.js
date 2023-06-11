import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import images from '~/assets/images';
import UserService from '~/utils/request';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function Home() {

    const user=localStorage.getItem('user');
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            let response = await UserService.GetCompany('company/getTop');
            console.log(response.data)
            setCompanies(response.data);
        };
        fetch();
    },[user]);


    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('text_top_job')}>Top nhà tuyển dụng được quan tâm nhất</div>
                <div className={cx('d-flex', 'flex-wrap', 'card_company_home')}>
                    {companies.map((company) => (
                        <Link
                            key={company.id}
                            // to="/view-company"
                           to={`/view-company?id=${company.id}`}
                            className={cx('item_company_candidate', 'p-2 m-2')}
                        >
                            <img src={images.logo} alt="logo" className={cx('logo_company_home')} />
                            <div className={cx('name_company_home')}>{company.name}</div>
                            <div className={cx('number_recruit_company_home')}>
                                <span className={cx('number_job')}>{company.jobPostingList.length} việc làm</span>&nbsp;- {company.address}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;