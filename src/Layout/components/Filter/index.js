import classNames from 'classnames/bind';
import styles from './Filter.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faHouseLaptop, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Filter({ handleFilter }) {
    const [filter, setFilter] = useState({
        working_form: 't',
        experience: '0',
        salary: 'triệu',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        var object = filter;
        object[name] = value;
        setFilter((prevInputs) => ({ ...prevInputs, [name]: value }));
        handleFilter(object.working_form, object.experience, object.salary);
    };

    return (
        <div className={cx('inner-bottom')}>
            <div className={cx('search-province')}>
                <FontAwesomeIcon className={cx('icon-province')} icon={faHouseLaptop} />
                <select
                    name="working_form"
                    value={filter.working_form}
                    onChange={handleChange}
                    className={cx('select_work_form_candidate')}
                >
                    <option value="t" disabled>
                        Hình thức làm việc
                    </option>
                    <option value="e">Tất cả</option>
                    <option value="Full time">Full time</option>
                    <option value="Part time">Part time </option>
                    <option value="Remote">Remote</option>
                </select>
            </div>
            <div className={cx('search-province')}>
                <FontAwesomeIcon className={cx('icon-province')} icon={faBriefcase} />
                <select
                    name="experience"
                    value={filter.experience}
                    onChange={handleChange}
                    className={cx('select_experience')}
                >
                    <option value="0" disabled>
                        Kinh nghiệm
                    </option>
                    <option value="00">Không yêu cầu</option>
                    <option value="1 năm">1 năm</option>
                    <option value="2 năm">2 năm</option>
                    <option value="3 năm">3 năm</option>
                    <option value="Trên 3 năm">Trên 3 năm</option>
                </select>
            </div>
            <div className={cx('search-province')}>
                <FontAwesomeIcon className={cx('icon-province')} icon={faMoneyBillWave} />
                <select name="salary" value={filter.salary} onChange={handleChange} className={cx('select_salary')}>
                    <option value="triệu" disabled>
                        Mức lương
                    </option>
                    <option value="5 triệu">&#8805; 5 triệu</option>
                    <option value="10 triệu">&#8805; 10 triệu</option>
                    <option value="15 triệu">&#8805; 15 triệu</option>
                    <option value="20 triệu">&#8805; 20 triệu</option>
                    <option value="0 triệu">Tất cả</option>
                </select>
            </div>
        </div>
    );
}

export default Filter;
