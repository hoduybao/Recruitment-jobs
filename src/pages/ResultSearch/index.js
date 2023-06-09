import classNames from 'classnames/bind';
import styles from './ResultSearch.module.scss';
import Filter from '~/Layout/components/Filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import UserService from '~/utils/request';
import { useState } from 'react';
const cx = classNames.bind(styles);
function ResultSearch() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const text = params.get('text');
    const address = params.get('address');
    const [result, setResult] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const response = await UserService.searchJob(`job/search?text=${text}&address=${address}`, {});
            console.log(response.data);
            setResult(response.data);
        };
        fetch();
    }, [text, address]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Filter className={cx('fil')} />
                <div className={cx('inner_content')}>
                    {result.length === 0 ? (
                        <div className={cx('text_top_job')}>Không tìm thấy công việc nào phù hợp với bạn</div>
                    ) : (
                        <div className={cx('text_top_job')}>
                            Tìm thấy<span> {result.length} </span> công việc phù hợp với bạn
                        </div>
                    )}

                    <div className={cx('d-flex', 'flex-wrap', 'card_company_home')}>
                        {result.map((job, index) => (
                            <Link
                                className={cx('item_recruit_candidate', 'p-2 m-2')}
                                to={`/detail-job?id=${job.id}`}
                               
                            >
                                <img src={job.companyInfo.logo} alt="logo" className={cx('logo_company')} />
                                <div className={cx('name_recruit')} href="/">
                                    {job.title}
                                </div>
                                <div className={cx('name_company')}>{job.companyInfo.name}</div>
                                <ul className={cx('require')}>
                                    <li className={cx('label')}>
                                        Mức lương: <span className={cx('value')}>{job.jobDescription.salary}</span>
                                    </li>
                                    <li className={cx('label')}>
                                        Kinh nghiệm: <span className={cx('value')}>{job.jobDescription.experience}</span>
                                    </li>
                                    <li className={cx('label')}>
                                        Địa điểm: <span className={cx('value')}>{job.jobDescription.address_work}</span>
                                    </li>
                                </ul>
                                <div className={cx('time_update')}>
                                    <FontAwesomeIcon
                                        icon={faClockRotateLeft}
                                        style={{  marginRight: 5 }}
                                    />
                                   
                                Cập nhật gần nhất: <span className={cx('value')}>{job.postDate}</span>
                                </div>
                            </Link>
                        ))}
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
        </div>
    );
}

export default ResultSearch;
