import classNames from 'classnames/bind';
import styles from './ManageJobs.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import UserService from '~/utils/request';
import Loading from '~/Layout/components/Loading';
const cx = classNames.bind(styles);

function ManageJobs({ employer }) {
    var user = localStorage.getItem('user');
    const [path_logo, setPathLogo] = useState('');

    const [listJobs, setListJobs] = useState([]);

    const [listJobsSaved, setListJobsSaved] = useState([]);
    const [visibleItems, setVisibleItems] = useState(6);
    const [visibleItemsEmployer, setVisibleItemsEmployer] = useState(8);
    const [isLoading, setIsLoading] = useState(true);

    const handleShowMore = () => {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 6);
    };
    const handleShowMoreEmployer = () => {
        setVisibleItemsEmployer((prevVisibleItems) => prevVisibleItems + 4);
    };
    useEffect(() => {
        if (user) {
            if (employer) {
                const fetch = async () => {
                    let response = await UserService.getUser('employer/getMyJob');
                    let response1 = await UserService.getUser('employer/myInfoNew');
                    setListJobs(response.data);
                    setPathLogo(response1.data.logo);
                    setIsLoading(false);
                };
                fetch();
            } else {
                const fetch = async () => {
                    let response1 = await UserService.getUser('candidate/getJobSaved');
                    let response = await UserService.getUser('candidate/JobSummited');
                    setListJobsSaved(response1.data);
                    setListJobs(response.data);
                    setIsLoading(false);
                };
                fetch();
            }
        }
    }, [user, employer]);

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

    const [classJobSave, setClassJobSave] = useState(['active']);
    const [classJobApply, setClassJobApply] = useState([]);

    var classesJobSave = cx('item_navi', ...classJobSave);
    var classesJobApply = cx('item_navi', ...classJobApply);
    var classesWrapper;
    var text_navi1, text_navi2, navi1, navi2;
    if (employer) {
        classesWrapper = cx('wrapper_employer');
        text_navi1 = 'Việc làm đã đăng';
        text_navi2 = 'Việc làm đã ẩn';
        navi1 = 'Đã đăng';
        navi2 = 'Đã ẩn';
    } else {
        classesWrapper = cx('wrapper');
        text_navi1 = 'Việc làm đã lưu';
        text_navi2 = 'Việc làm đã ứng tuyển';
        navi1 = 'Đã lưu';
        navi2 = 'Đã ứng tuyển';
    }

    if (employer) {
        return (
            <div className={classesWrapper}>
                {isLoading ? (
                    <Loading name="load" />
                ) : (
                    <>
                        <div className={cx('wrapper_inner')}>
                            <div className={cx('inner')}>
                                <div className={cx('navigation')}>
                                    <Link
                                        className={classesJobSave}
                                        to=""
                                        onClick={(e) => {
                                            setClassJobSave(['active']);
                                            setClassJobApply([]);
                                            setVisibleItemsEmployer(8);
                                        }}
                                    >
                                        {navi1}
                                    </Link>
                                    <Link
                                        className={classesJobApply}
                                        to=""
                                        onClick={(e) => {
                                            setClassJobApply(['active']);
                                            setClassJobSave([]);
                                            setVisibleItemsEmployer(8);
                                        }}
                                    >
                                        {navi2}
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className={cx('content')}>
                            <div className={cx('inner')}>
                                {classJobSave.length > 0 ? (
                                    <div className={cx('list_item')}>
                                        <div className={cx('text_title')}>{text_navi1}</div>
                                        <div className={cx('d-flex', 'flex-wrap', 'card_company_home')}>
                                            {listJobs.map((job) => {
                                                if (job.status === 'approved') {
                                                    return (
                                                        <Link
                                                            key={job.id}
                                                            to={`/employer/detail-job?id=${job.id}`}
                                                            className={cx('item_recruit_candidate', 'p-2 m-2')}
                                                        >
                                                            <img
                                                                src={path_logo}
                                                                alt="logo"
                                                                className={cx('logo_company')}
                                                            />
                                                            <div className={cx('name_recruit')} href="/">
                                                                {job?.title}
                                                            </div>
                                                            <div className={cx('name_company')}>
                                                                {job?.companyInfo?.name}
                                                            </div>
                                                            <ul className={cx('require_employer')}>
                                                                <li className={cx('label')}>
                                                                    Mức lương:{' '}
                                                                    <span className={cx('value')}>
                                                                        {job?.jobDescription?.salary}
                                                                    </span>
                                                                </li>
                                                                <li className={cx('label')}>
                                                                    Kinh nghiệm:{' '}
                                                                    <span className={cx('value')}>
                                                                        {job?.jobDescription?.experience}
                                                                    </span>
                                                                </li>
                                                                <li className={cx('label')}>
                                                                    Địa điểm:{' '}
                                                                    <span className={cx('value')}>
                                                                        {job?.jobDescription?.address_work}
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                            <div className={cx('time_update')}>
                                                                <FontAwesomeIcon
                                                                    icon={faClockRotateLeft}
                                                                    style={{ color: '#21c2e2', marginRight: 5 }}
                                                                />
                                                                Cập nhật gần nhất:{' '}
                                                                <span className={cx('value')}>
                                                                    {convertDate(job?.dueDate)}
                                                                </span>
                                                            </div>
                                                        </Link>
                                                    );
                                                } else {
                                                    return null;
                                                }
                                            })}
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className={cx('text_title')}>{text_navi2}</div>
                                        <div className={cx('d-flex', 'flex-wrap', 'card_company_home')}>
                                            {listJobs.map((job) => {
                                                if (job.status !== 'approved') {
                                                    return (
                                                        <Link
                                                            key={job.id}
                                                            to={`/employer/detail-job?id=${job.id}`}
                                                            className={cx('item_recruit_candidate', 'p-2 m-2')}
                                                        >
                                                            <img
                                                                src={path_logo}
                                                                alt="logo"
                                                                className={cx('logo_company')}
                                                            />
                                                            <div className={cx('name_recruit')} href="/">
                                                                {job?.title}
                                                            </div>
                                                            <div className={cx('name_company')}>
                                                                {job?.companyInfo?.name}
                                                            </div>
                                                            <ul className={cx('require_employer')}>
                                                                <li className={cx('label')}>
                                                                    Mức lương:{' '}
                                                                    <span className={cx('value')}>
                                                                        {job?.jobDescription?.salary}
                                                                    </span>
                                                                </li>
                                                                <li className={cx('label')}>
                                                                    Kinh nghiệm:{' '}
                                                                    <span className={cx('value')}>
                                                                        {job?.jobDescription?.experience}
                                                                    </span>
                                                                </li>
                                                                <li className={cx('label')}>
                                                                    Địa điểm:{' '}
                                                                    <span className={cx('value')}>
                                                                        {job?.jobDescription?.address_work}
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                            <div className={cx('time_update')}>
                                                                <FontAwesomeIcon
                                                                    icon={faClockRotateLeft}
                                                                    style={{ color: '#21c2e2', marginRight: 5 }}
                                                                />
                                                                Cập nhật gần nhất:{' '}
                                                                <span className={cx('value')}>
                                                                    {convertDate(job?.dueDate)}
                                                                </span>
                                                            </div>
                                                        </Link>
                                                    );
                                                } else {
                                                    return null;
                                                }
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    } else {
        return (
            <div className={classesWrapper}>
                {isLoading ? (
                    <Loading name="load"/>
                ) : (
                    <>
                        <div className={cx('wrapper_inner')}>
                            <div className={cx('inner')}>
                                <div className={cx('navigation')}>
                                    <Link
                                        className={classesJobSave}
                                        to=""
                                        onClick={(e) => {
                                            setClassJobSave(['active']);
                                            setClassJobApply([]);
                                            setVisibleItems(6);
                                        }}
                                    >
                                        {navi1}
                                    </Link>
                                    <Link
                                        className={classesJobApply}
                                        to=""
                                        onClick={(e) => {
                                            setClassJobApply(['active']);
                                            setClassJobSave([]);
                                            setVisibleItems(6);
                                        }}
                                    >
                                        {navi2}
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className={cx('content')}>
                            <div className={cx('inner')}>
                                {classJobSave.length > 0 ? (
                                    <div>
                                        <div className={cx('text_title')}>{text_navi1}</div>
                                        <div className={cx('d-flex', 'flex-wrap', 'card_company_home')}>
                                            {listJobsSaved.slice(0, visibleItems).map((job, index) => (
                                                <Link
                                                    key={index}
                                                    to={`/detail-job?id=${job?.id}`}
                                                    className={cx('item_recruit_candidate', 'p-2 m-2')}
                                                >
                                                    <img
                                                        src={job?.companyInfo?.logo}
                                                        alt="logo"
                                                        className={cx('logo_company')}
                                                    />
                                                    <div className={cx('name_recruit')} href="/">
                                                        {job?.infoJobPosting?.title}
                                                    </div>
                                                    <div className={cx('name_company')}>{job?.companyInfo?.name}</div>
                                                    <ul className={cx('require')}>
                                                        <li className={cx('label')}>
                                                            Mức lương:{' '}
                                                            <span className={cx('value')}>
                                                                {job?.infoJobPosting?.salary}
                                                            </span>
                                                        </li>
                                                        <li className={cx('label')}>
                                                            Kinh nghiệm:{' '}
                                                            <span className={cx('value')}>
                                                                {job?.infoJobPosting?.experience}
                                                            </span>
                                                        </li>
                                                        <li className={cx('label')}>
                                                            Địa điểm:{' '}
                                                            <span className={cx('value')}>
                                                                {job?.infoJobPosting?.address_work}
                                                            </span>
                                                        </li>
                                                    </ul>
                                                    <div className={cx('time_update')}>
                                                        <FontAwesomeIcon
                                                            icon={faClockRotateLeft}
                                                            style={{ color: '#21c2e2', marginRight: 5 }}
                                                        />
                                                        Cập nhật gần nhất:{' '}
                                                        <span className={cx('value')}>
                                                            {convertDate(job?.infoJobPosting?.dueDate)}
                                                        </span>
                                                    </div>
                                                </Link>
                                            ))}
                                            {visibleItems < listJobsSaved.length && (
                                                <button onClick={handleShowMore} className={cx('show_more')}>
                                                    Xem thêm
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className={cx('list_item')}>
                                        <div className={cx('text_title')}>{text_navi2}</div>
                                        <div className={cx('d-flex', 'flex-wrap', 'card_company_home')}>
                                            {listJobs.slice(0, visibleItems).map((job, index) => (
                                                <Link
                                                    key={index}
                                                    to={`/detail-job?id=${job?.infoJobPosting?.id}`}
                                                    className={cx('item_recruit_candidate', 'p-2 m-2')}
                                                >
                                                    <img
                                                        src={job?.company?.logo}
                                                        alt="logo"
                                                        className={cx('logo_company')}
                                                    />
                                                    <div className={cx('name_recruit')} href="/">
                                                        {job?.infoJobPosting?.title}
                                                    </div>
                                                    <div className={cx('name_company')}>{job?.company?.name}</div>
                                                    <ul className={cx('require')}>
                                                        <li className={cx('label')}>
                                                            Mức lương:{' '}
                                                            <span className={cx('value')}>
                                                                {job?.infoJobPosting?.salary}
                                                            </span>
                                                        </li>
                                                        <li className={cx('label')}>
                                                            Kinh nghiệm:{' '}
                                                            <span className={cx('value')}>
                                                                {job?.infoJobPosting?.experience}
                                                            </span>
                                                        </li>
                                                        <li className={cx('label')}>
                                                            Địa điểm:{' '}
                                                            <span className={cx('value')}>
                                                                {job?.infoJobPosting?.address_work}
                                                            </span>
                                                        </li>
                                                    </ul>
                                                    <div className={cx('time_update')}>
                                                        <FontAwesomeIcon
                                                            icon={faClockRotateLeft}
                                                            style={{ color: '#21c2e2', marginRight: 5 }}
                                                        />
                                                        Cập nhật gần nhất:{' '}
                                                        <span className={cx('value')}>
                                                            {convertDate(job?.infoJobPosting?.dueDate)}
                                                        </span>
                                                    </div>
                                                </Link>
                                            ))}
                                            {visibleItems < listJobs.length && (
                                                <button onClick={handleShowMore} className={cx('show_more')}>
                                                    Xem thêm
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    }
}

export default ManageJobs;
