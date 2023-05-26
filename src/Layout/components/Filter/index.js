import classNames from 'classnames/bind';
import styles from './Filter.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faHouseLaptop, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';

const cx=classNames.bind(styles);

function Filter() {
    return (
        <div className={cx('inner-bottom')}>
            <div className={cx('search-province')}>
                <FontAwesomeIcon className={cx('icon-province')} icon={faHouseLaptop} />
                <select name="select_province" className={cx('select_work_form_candidate')}>
                    <option value="" disabled selected>
                        Hình thức làm việc
                    </option>
                    <option value="0">Tất cả</option>
                    <option value="1">Remote</option>
                    <option value="2">At office </option>
                    <option value="3">Hybrid</option>
                </select>
            </div>
            <div className={cx('search-province')}>
                <FontAwesomeIcon className={cx('icon-province')} icon={faBriefcase} />
                <select name="select_experience" className={cx('select_experience')}>
                    <option value="100" disabled selected>
                        Kinh nghiệm
                    </option>
                    <option value="0">Chưa có</option>
                    <option value="1">1 năm</option>
                    <option value="2">2 năm</option>
                    <option value="3">3 năm</option>
                    <option value="4">Hơn 3 năm</option>
                </select>
            </div>
            <div className={cx('search-province')}>
                <FontAwesomeIcon className={cx('icon-province')} icon={faMoneyBillWave} />
                <select name="select_salary" className={cx('select_salary')}>
                    <option value="100" disabled selected>
                        Mức lương
                    </option>
                    <option value="5">&#8805; 5 triệu</option>
                    <option value="10">&#8805; 10 triệu</option>
                    <option value="15">&#8805; 15 triệu</option>
                    <option value="20">&#8805; 20 triệu</option>
                    <option value="100">Tất cả</option>
                </select>
            </div>
        </div>
    );
}

export default Filter;
