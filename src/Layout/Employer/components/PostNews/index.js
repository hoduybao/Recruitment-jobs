import classNames from 'classnames/bind';
import styles from './PostNews.module.scss';
import { useEffect, useState } from 'react';
import UserService from '~/utils/request';

import { Link, useLocation } from 'react-router-dom';
const cx = classNames.bind(styles);

function PostNews({ update = false }) {
    const [hidenSalary, setHidenSalary] = useState(true);
    const [selectedSalary, setSelectedSalary] = useState('0');
    var today = new Date();
    var dateString = today.toISOString().split('T')[0];
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id_job = params.get('id');
    const handleChangeSalary = (e) => {
        var value = e.target.value;
        setSelectedSalary(value);

        if (value === '0') {
            setHidenSalary(true);
        } else {
            setHidenSalary(false);
        }
    };
    const convertDate = (time) => {
        const dateTime = new Date(time);
        const date = dateTime.getDate();
        const month = dateTime.getMonth()  // Months are zero-based, so we add 1
        
        const year = dateTime.getFullYear();
        const d=new Date(year,month,date);
        const newDate=d.toISOString().split('T')[0];
        return newDate;
    };
    const [post, setPost] = useState({
        tittle: '',
        quantity: '1',
        gender: 'Không yêu cầu',
        experience: 'Không yêu cầu',
        salary: '',
        working_form: 'Full time',
        address_work: 'Thành phố Hà Nội',
        description: '',
        requirement: '',
        benefits: '',
        dueDate: dateString,
    });

    useEffect(() => {
        if (id_job) {
            const fetch = async () => {
                let response = await UserService.getJobPosting(`job/${id_job}`);
                if (response.status === 'ok') {
                    response = response.data;

                    let collator = new Intl.Collator('vi');
                    var splitSalary = '0';
                    if (!collator.compare(response.jobDescription.salary, 'Thỏa thuận')) {
                        
                        setSelectedSalary(0);
                        setHidenSalary(true);
                    } else {
                        splitSalary = response.jobDescription.salary.split(' ')[0];
                        setSelectedSalary(1);
                        setHidenSalary(false);
                    }
                    console.log(response);
                    var due = new Date(response.dueDate);
                    var newDue = due.toISOString().split('T')[0];
                    setPost({
                        tittle: response.title,
                        quantity: response.jobDescription.number_candidates ,
                        gender: response.jobDescription.gender,
                        experience: response.jobDescription.experience,
                        salary:splitSalary,
                        working_form: response.jobDescription.working_form,
                        address_work: response.jobDescription.address_work,
                        description: response.jobDescription.description,
                        requirement: response.jobDescription.requirement,
                        benefits: response.jobDescription.benefits,
                        dueDate: newDue, 
                    });

                    //   setLoad(false);
                }
            };
            fetch();
        }
    }, [id_job]);

    const [errors, setErrors] = useState({
        tittle: '',
        quantity: '',
        gender: '',
        experience: '',
        salary: '',
        working_form: '',
        address_work: '',
        description: '',
        requirement: '',
        benefits: '',
        dueDate: '',
    });

    let success = true;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prevInputs) => ({ ...prevInputs, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };
    const handleRegister = (event) => {
        event.preventDefault();
        var newSalary = '';
        // Validate inputs
        const newErrors = {};
        if (post.quantity < 1) {
            console.log(post.quantity);
            newErrors.quantity = 'Số lượng không phù hợp';
            success = false;
        }
        if (!post.tittle) {
            newErrors.tittle = 'Chưa nhập tiêu đề tuyển dụng';
            success = false;
        }
        //let newSalary=post.salary+ " triệu";
        if (selectedSalary !== '0') {
            if (!post.salary) {
                newErrors.salary = 'Chưa nhập mức lương';
                success = false;
            } else {
                //     console.log(post.salary + " triệu");
                newSalary = post.salary.toString() + ' triệu';
            }
        } else {
            newSalary = 'Thỏa thuận';
            setPost((prevInputs) => ({ ...prevInputs, salary: newSalary }));
        }

        if (!post.address_work) {
            newErrors.address_work = 'Chưa nhập địa chỉ làm việc';
            success = false;
        }

        if (!post.description) {
            newErrors.description = 'Chưa nhập mô tả công việc';
            success = false;
        }
        if (!post.requirement) {
            newErrors.requirement = 'Chưa nhập yêu cầu ứng viên';
            success = false;
        }
        if (!post.benefits) {
            newErrors.benefits = 'Chưa nhập quyền lợi làm việc';
            success = false;
        }
        setErrors(newErrors);

        // Handle form submission logic
        if (success) {
            const fetch = async () => {
                if(!update)
                {
                    let response = await UserService.postJob(`employer/addJobPosting`, {
                        title: post.tittle,
                        postDate: dateString,
                        dueDate: post.dueDate,
                        description: post.description,
                        benefits: post.benefits,
                        requirement: post.requirement,
                        gender: post.gender,
                        experience: post.experience,
                        salary: newSalary,
                        number_candidates: post.quantity,
                        working_form: post.working_form,
                        address_work: post.address_work,
                    });
                    console.log(response);
                    if (response.status === 'ok') {
                        console.log('success');
                    } else {
                        console.log('no_success');
                    }
                }
                else{
                    let response = await UserService.postJob(`employer/updateJobPosting/${id_job}`, {
                        title: post.tittle,
                        postDate: dateString,
                        dueDate: post.dueDate,
                        description: post.description,
                        benefits: post.benefits,
                        requirement: post.requirement,
                        gender: post.gender,
                        experience: post.experience,
                        salary: newSalary,
                        number_candidates: post.quantity,
                        working_form: post.working_form,
                        address_work: post.address_work,
                    });
                    console.log(response);
                    if (response.status === 'ok') {
                        console.log('success');
                    } else {
                        console.log('no_success');
                    }
                }
                
            };
            fetch();
        } else {
            setErrors(newErrors);
        }
    };
    const urlProvice = 'https://provinces.open-api.vn/api/';
    const [provinces, setProvinces] = useState([]);
    useEffect(() => {
        fetch(urlProvice)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setProvinces(data);
            })
            .catch(function (error) {
                console.log(error);
            });
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                {update === false ? (
                    <>
                        <div className={cx('title')}>Đăng tin tuyển dụng</div>
                        <div className={cx('introduce')}>Vui lòng nhập thông tin tuyển dụng</div>
                    </>
                ) : (
                    <>
                        <div className={cx('title')}>Chỉnh sửa tin tuyển dụng</div>
                        <div className={cx('introduce')}>Vui lòng nhập thông tin chỉnh sửa</div>
                    </>
                )}

                <div className={cx('label_title')}>Tiêu đề</div>
                <input
                    type="text"
                    value={post.tittle}
                    onChange={handleChange}
                    name="tittle"
                    className={cx('title_recruitment')}
                    required
                    placeholder="Tiêu đề tuyển dụng"
                />
                {errors.tittle && <span className={cx('error')}>{errors.tittle}</span>}

                <h4 className={cx('infor_general')}>Thông tin chung</h4>
                <div className={cx('wrapp_infor_general')}>
                    <div className={cx('item')}>
                        <div className={cx('label_general')}>Số lượng</div>
                        <input
                            type="number"
                            name="quantity"
                            min="1"
                            value={post.quantity}
                            onChange={handleChange}
                            className={cx('quantity')}
                            required
                            placeholder="Số lượng"
                        />
                        {errors.quantity && <span className={cx('error')}>{errors.quantity}</span>}
                    </div>

                    <div className={cx('item')}>
                        <div className="label_general">Giới tính</div>
                        <select name="gender" value={post.gender} onChange={handleChange} className={cx('sex_select')}>
                            <option value="Không yêu cầu">Không yêu cầu</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select>
                    </div>
                    <div className={cx('item')}>
                        <div className="label_general">Kinh nghiệm</div>

                        <select
                            name="experience"
                            value={post.experience}
                            onChange={handleChange}
                            className={cx('experience_select')}
                        >
                            <option value="Không yêu cầu">Không yêu cầu</option>
                            <option value="1 năm">1 năm</option>
                            <option value="2 năm">2 năm</option>
                            <option value="3 năm">3 năm</option>
                            <option value="Trên 3 năm">Trên 3 năm</option>
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
                            name="salary"
                            value={post.salary}
                            onChange={handleChange}
                            min="1"
                            className={cx('value_salary')}
                            required
                            placeholder="tối đa (triệu)"
                        />
                        {errors.salary && <span className={cx('error')}>{errors.salary}</span>}
                    </div>
                    <div className={cx('item')}>
                        <div className="label_general">Hình thức làm việc</div>

                        <select
                            name="working_form"
                            value={post.working_form}
                            onChange={handleChange}
                            className={cx('experience_select')}
                            required=""
                        >
                            <option value="Full time">Full time</option>
                            <option value="Part time">Part time</option>
                            <option value="Remote">Remote</option>
                        </select>
                    </div>
                </div>
                <h4 className={cx('infor_general')}>Địa chỉ làm việc</h4>
                <select
                    name="address_work"
                    value={post.address_work}
                    onChange={handleChange}
                    className={cx('input_address')}
                    required=""
                >
                    {provinces.map((province) => (
                        <option value={province.name}>{province.name}</option>
                    ))}
                </select>

                {errors.address_work && <span className={cx('error')}>{errors.address_work}</span>}

                <h4 className={cx('infor_general')}>Mô tả công việc</h4>
                <textarea
                    type="text"
                    name="description"
                    value={post.description}
                    onChange={handleChange}
                    className={cx('job_describe')}
                    required
                ></textarea>
                {errors.description && <span className={cx('error')}>{errors.description}</span>}

                <h4 className={cx('infor_general')}>Yêu cầu ứng viên</h4>
                <textarea
                    type="text"
                    name="requirement"
                    value={post.requirement}
                    onChange={handleChange}
                    className={cx('job_describe')}
                    required
                ></textarea>
                {errors.requirement && <span className={cx('error')}>{errors.requirement}</span>}

                <h4 className={cx('infor_general')}>Quyền lợi</h4>
                <textarea
                    type="text"
                    name="benefits"
                    value={post.benefits}
                    onChange={handleChange}
                    className={cx('job_describe')}
                    required
                ></textarea>
                {errors.benefits && <span className={cx('error')}>{errors.benefits}</span>}

                <div className={cx('lable_deadline')}>Hạn nộp hồ sơ</div>
                <input
                    type="date"
                    name="dueDate"
                    min={dateString}
                    value={post.dueDate}
                    onChange={handleChange}
                    className={cx('deadline')}
                    required
                    placeholder="Hạn nộp hồ sơ"
                />
                {errors.dueDate && <span className={cx('error')}>{errors.dueDate}</span>}

                {update === false ? (
                    <button type="button" className={cx('submit_recruits')} onClick={handleRegister}>
                        Đăng tin
                    </button>
                ) : (
                    <button className={cx('submit_recruits')} onClick={handleRegister}>Cập nhật</button>
                )}
                <Link className={cx('cancle')} to="/employer/jobs">
                    Hủy bỏ
                </Link>
            </div>
        </div>
    );
}

export default PostNews;
