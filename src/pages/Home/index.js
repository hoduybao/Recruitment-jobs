import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import UserService from '~/utils/request';
import { Link } from 'react-router-dom';
import Loading from '~/Layout/components/Loading';
import React, { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function Home() {
    const user = localStorage.getItem('user');
    const [companies, setCompanies] = useState([]);
    //const [listJobs, setListJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            console.log('zo');
            let response = await UserService.GetCompany('company/getTop');
            //let response1 = await UserService.GetCompany('company/getTop');
            console.log(response.data);
            setCompanies(response.data);
            setIsLoading(false);
        };
        fetch();
    }, [user]);

    return (
        <div className={cx('wrapper')}>
            {isLoading ? (
                <Loading />
            ) : (
                <div className={cx('inner')}>
                    <div className={cx('text_top_job')}>Top nhà tuyển dụng được quan tâm nhất</div>
                    <div className={cx('d-flex', 'flex-wrap', 'card_company_home')}>
                        {companies &&
                            companies.map((company) => (
                                <Link
                                    key={company.id}
                                    // to="/view-company"
                                    to={`/view-company?id=${company.id}`}
                                    className={cx('item_company_candidate', 'p-2 m-2')}
                                >
                                    <img src={company.logo} alt="logo" className={cx('logo_company_home')} />
                                    <div className={cx('name_company_home')}>{company.name}</div>
                                    <div className={cx('number_recruit_company_home')}>{company.address}</div>
                                </Link>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
