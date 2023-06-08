import classNames from 'classnames/bind';
import styles from './ListJobs.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function ListJobs({ companies }) {
    return (
            <div className={cx('inner')}>
                <div className={cx('text_top_job')}>
                   Tất cả việc làm
                </div>
                <div className={cx('d-flex', 'flex-wrap', 'card_company_home')}>
                    
                {companies.map((company) => (
                    <Link className={cx('item_recruit_candidate', 'p-2 m-2')} 
                    to={`/detail-job?id=${company.id}`}>
                        <img src={images.logo} alt="logo" className={cx('logo_company')} />
                        <div className={cx('name_recruit')} href="/">
                            {company.title}
                        </div>
                        <ul className={cx('require')}>
                            <li className={cx('label')}>
                                Mức lương: <span className={cx('value')}>{company.jobDescription.salary}</span>
                            </li>
                            <li className={cx('label')}>
                                Kinh nghiệm: <span className={cx('value')}>{company.jobDescription.experience}</span>
                            </li>
                            <li className={cx('label')}>
                                Địa điểm: <span className={cx('value')}>{company.jobDescription.address_work}</span>
                            </li>
                        </ul>
                        <div className={cx('time_update')}>
                            <FontAwesomeIcon icon={faClockRotateLeft} style={{ marginRight: 5 }} />
                            Cập nhật gần nhất: {company.dueDate}
                        </div>
                    </Link>
                ))}
                </div>
            </div>
    );
}

export default ListJobs;
