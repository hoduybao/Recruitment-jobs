import classNames from 'classnames/bind';
import styles from './ListJobs.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const cx = classNames.bind(styles);

function ListJobs({ ListJobs,logo }) {
    const [visibleItems, setVisibleItems] = useState(5);
    const handleShowMore = () => {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 5);
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
        <div className={cx('inner')}>
            <div className={cx('text_top_job')}>Tất cả việc làm</div>
            <div className={cx('d-flex', 'flex-wrap', 'card_company_home')}>
                {ListJobs.slice(0,visibleItems).map((job, index) => {
                    if (job.status === 'approved') {
                        return (
                            <Link
                                className={cx('item_recruit_candidate', 'p-2 m-2')}
                                key={index}
                                to={`/detail-job?id=${job.id}`}
                            >
                                <img src={logo} alt="logo" className={cx('logo_company')} />
                                <div className={cx('name_recruit')} href="/">
                                    {job.title}
                                </div>
                                <ul className={cx('require')}>
                                    <li className={cx('label')}>
                                        Mức lương: <span className={cx('value')}>{job.jobDescription.salary}</span>
                                    </li>
                                    <li className={cx('label')}>
                                        Kinh nghiệm:{' '}
                                        <span className={cx('value')}>{job.jobDescription.experience}</span>
                                    </li>
                                    <li className={cx('label')}>
                                        Địa điểm: <span className={cx('value')}>{job.jobDescription.address_work}</span>
                                    </li>
                                </ul>
                                <div className={cx('time_update')}>
                                    <FontAwesomeIcon icon={faClockRotateLeft} style={{ marginRight: 5 }} />
                                    Cập nhật gần nhất: {convertDate(job.postDate)}
                                </div>
                            </Link>
                        );
                    } else {
                        return null;
                    }
                })}
                {visibleItems < ListJobs.length && (
                    <button onClick={handleShowMore} className={cx('show_more')}>
                        Xem thêm
                    </button>
                )}
            </div>
        </div>
    );
}

export default ListJobs;
