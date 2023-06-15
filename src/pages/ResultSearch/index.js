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
    const [resultFilter, setResultFilter] = useState([]);
    const [visibleItems, setVisibleItems] = useState(10);
  
    useEffect(() => {
        const fetch = async () => {
            const response = await UserService.searchJob(`job/search?text=${text}&address=${address}`, {});
            console.log(response.data);
            setResultFilter(response.data);
            setResult(response.data);
        };
        fetch();
    }, [text, address]);
    const handleShowMore = () => {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 6);
    };
    const handleFilter = (working_form = '', experience = '', salary = '0 triệu') => {
        console.log(working_form);
        let collator = new Intl.Collator('vi');
        let newResult = result.filter((job) => {
            if (experience === '') {
                return job.working_form.includes(working_form) && collator.compare(job.salary, salary);
            } else {
                return (
                    job.working_form.includes(working_form) &&
                    collator.compare(job.experience, experience) === 0 &&
                    collator.compare(job.salary, salary)
                );
            }
        });
        setResultFilter(newResult);
    };
    const convertDate = (time) => {
        const dateTime = new Date(time);
        var date = dateTime.getDate();
        var month = dateTime.getMonth() + 1; // Months are zero-based, so we add 1
        if (month.toString().length === 1) {
            month = '0' + month;
        }
        if (date.toString().length === 1) {
            date = '0' + date;
        }
        const year = dateTime.getFullYear();
        return date + '-' + month + '-' + year;
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Filter className={cx('fil')} handleFilter={handleFilter} />
                <div className={cx('inner_content')}>
                    {resultFilter.length === 0 ? (
                        <div className={cx('text_top_job')}>Không tìm thấy công việc nào phù hợp với bạn</div>
                    ) : (
                        <div className={cx('text_top_job')}>
                            Tìm thấy<span> {resultFilter.length} </span> công việc phù hợp với bạn
                        </div>
                    )}

                    <div className={cx('d-flex', 'flex-wrap', 'card_company_home')}>
                        {resultFilter.slice(0, visibleItems).map((job, index) => (
                            <Link
                                key={index}
                                className={cx('item_recruit_candidate', 'p-2 m-2')}
                                to={`/detail-job?id=${job.id_JobPosting}`}
                            >
                                <img src={job.companyLogo} alt="logo" className={cx('logo_company')} />
                                <div className={cx('name_recruit')} href="/">
                                    {job.title}
                                </div>
                                <div className={cx('name_company')}>{job.companyName}</div>
                                <ul className={cx('require')}>
                                    <li className={cx('label')}>
                                        Mức lương: <span className={cx('value')}>{job.salary}</span>
                                    </li>
                                    <li className={cx('label')}>
                                        Kinh nghiệm: <span className={cx('value')}>{job.experience}</span>
                                    </li>
                                    <li className={cx('label')}>
                                        Địa điểm: <span className={cx('value')}>{job.addressWork}</span>
                                    </li>
                                </ul>
                                <div className={cx('time_update')}>
                                    <FontAwesomeIcon icon={faClockRotateLeft} style={{ marginRight: 5 }} />
                                    Cập nhật gần nhất: <span className={cx('value')}>{convertDate(job.postDate)}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                    {visibleItems < resultFilter.length && <button onClick={handleShowMore} className={cx("show_more")}>Xem thêm</button>}
                </div>
            </div>
        </div>
    );
}

export default ResultSearch;
