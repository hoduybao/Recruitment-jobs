import classNames from 'classnames/bind';
import styles from './PostNews.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function PostNews() {
    const [hidenSalary, setHidenSalary] = useState(true);
    const [selectedSalary, setSelectedSalary] = useState('0');

    const handleChangeSalary = (e) => {
        var value = e.target.value;
        setSelectedSalary(value);

        if (value === '0') {
            setHidenSalary(true);
        } else {
            setHidenSalary(false);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('title')}>Đăng tin tuyển dụng</div>
                <div className={cx('introduce')}>Vui lòng nhập thông tin tuyển dụng</div>
                <div className={cx('label_title')}>Tiêu đề</div>
                <input
                    type="text"
                    name="title_recruitment"
                    className={cx('title_recruitment')}
                    required
                    placeholder="Tiêu đề tuyển dụng"
                />
                <h4 className={cx('infor_general')}>Thông tin chung</h4>
                <div className={cx('wrapp_infor_general')}>
                    <div className={cx('item')}>
                        <div className={cx('label_general')}>Số lượng</div>
                        <input
                            type="number"
                            name="quantity"
                            min="1"
                            value="1"
                            className={cx('quantity')}
                            required
                            placeholder="Số lượng"
                        />
                    </div>
                    <div className={cx('item')}>
                        <div className="label_general">Giới tính</div>
                        <select name="sex" className={cx('sex_select')} required="">
                            <option value="not" selected>
                                Không yêu cầu
                            </option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                        </select>
                    </div>
                    <div className={cx('item')}>
                        <div className="label_general">Kinh nghiệm</div>

                        <select name="experience" className={cx('experience_select')} required="">
                            <option value="0" selected>
                                Không yêu cầu
                            </option>
                            <option value="1">1 năm</option>
                            <option value="2">2 năm</option>
                            <option value="3">3 năm</option>
                            <option value="4">Trên 3 năm</option>
                        </select>
                    </div>
                    <div className={cx('item')}>
                        <div className="label_salary">Mức lương</div>

                        <select
                            name="salary"
                            className={cx('salary')}
                            value={selectedSalary}
                            onChange={handleChangeSalary}
                            required=""
                        >
                            <option value="0">Thỏa thuận</option>
                            <option value="1">Quy định</option>
                        </select>
                    </div>
                    <div className={cx('item')} hidden={hidenSalary}>
                        <div className="label_salary">&nbsp;</div>

                        <input
                            type="number"
                            name="value_salary"
                            min="1"
                            className={cx('value_salary')}
                            required
                            placeholder="tối đa (triệu)"
                        />
                    </div>
                    <div className={cx('item')}>
                        <div className="label_general">Hình thức làm việc</div>

                        <select name="experience" className={cx('experience_select')} required="">
                            <option value="full" selected>
                                Full time
                            </option>
                            <option value="part">Part time</option>
                            <option value="remote">Remote</option>
                        </select>
                    </div>
                </div>
                <h4 className={cx('infor_general')}>Mô tả công việc</h4>
                <textarea type="text" name="job_describe" className={cx('job_describe')} required></textarea>
                <h4 className={cx('infor_general')}>Yêu cầu ứng viên</h4>
                <textarea type="text" name="job_require" className={cx('job_describe')} required></textarea>
                <h4 className={cx('infor_general')}>Quyền lợi</h4>
                <textarea type="text" name="job_benefits" className={cx('job_describe')} required></textarea>

                <div className={cx('lable_deadline')}>Hạn nộp hồ sơ</div>
                <input type="date" name="deadline" className={cx('deadline')} required placeholder="Hạn nộp hồ sơ" />

                <button className={cx('submit_recruits')}>Đăng tin</button>
                <Link className={cx('cancle')} to="/employer">
                    Hủy bỏ
                </Link>
            </div>
        </div>
    );
}

export default PostNews;
