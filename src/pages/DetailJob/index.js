import classNames from 'classnames/bind';
import styles from './DetailJob.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from '~/Layout/components/Popper/Menu';
import Modal from 'react-overlays/Modal';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    faAddressCard,
    faBars,
    faBriefcase,
    faClockRotateLeft,
    faCopy,
    faEyeSlash,
    faMarsAndVenus,
    faMoneyBillWave,
    faPenToSquare,
    faTrashCan,
    faUser,
    faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import UserService from '~/utils/request';

const cx = classNames.bind(styles);

function DetailJob({ employer = false }) {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id_job = params.get('id');

    const currentPath = window.location.origin + location.pathname + location.search;

    const [showModal, setShowModal] = useState(false);
    var handleClose = () => {
        setShowModal(false);
    };
    const [apply, setApply] = useState({
        name: '',
        file_cv: null,
        introduce: '',
    });
    const [errors, setErrors] = useState({
        name: '',
        file_cv: '',
        introduce: '',
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'file_cv') {
            let value2 = event.target.files[0];

            if (!(value2.size > 3 * 1024 * 1024)) {
                setApply((prevInputs) => ({ ...prevInputs, [name]: value2 }));
                setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
            }
            else{
                toast.error('File không được quá 3MB!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            }
        } else {
            setApply((prevInputs) => ({ ...prevInputs, [name]: value }));
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }
    };
    var handleSave = (event) => {
        event.preventDefault();
        let success = true;
        // Validate inputs
        const newErrors = {};
        if (!apply.name) {
            newErrors.name = 'Chưa nhập họ tên';
            success = false;
        }

        if (!apply.file_cv) {
            newErrors.file_cv = 'Chưa chọn file phù hợp';
            success = false;
        }

        if (success) {
            // console.log(apply.file_cv);
            // var formdata = new FormData();
            // formdata.append('file', apply.file_cv);
            // formdata.append('info', '{"introLetter": "Em muốn ứng tuyển vào công ty ạ", "name": "Dương Minh Hiếu"}');
            // const fetch = async () => {
            //     let response = await UserService.applyJob(`candidate/submitCV/${id_job}`, formdata);
            //     console.log(response);
            // };
            // fetch();

            const submitCV = () => {
                const formData = new FormData();
                formData.append('file', apply.file_cv);
                formData.append('name', apply.name);

                formData.append('introLetter', apply.introduce);

                const requestOptions = {
                    method: 'POST',
                    headers: {
                        Authorization:
                            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJob2R1eWJhb28yMDAyQGdtYWlsLmNvbSIsImlhdCI6MTY4NjQxNTExMywiZXhwIjoxNjg2NTAxNTEzfQ.E_Ru-1QOESYVvryesqT9lk51sIbAFHGQEX1O5KjAixI',
                    },
                    body: formData,
                };

                fetch('https://hiringweb.up.railway.app/candidate/submitCV/1', requestOptions)
                    .then((response) => response.json())
                    .then((data) => {
                        // Xử lý kết quả trả về từ API
                        if (data.status === 'ok') {
                            toast.success('Ứng tuyển thành công!', {
                                position: 'top-right',
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: 'light',
                            });
                        }
                        handleClose();

                    })
                    .catch((error) => {
                        // Xử lý lỗi
                        console.error(error);
                    });
            };
            submitCV();
        } else {
            setErrors(newErrors);
        }
    };
    const renderBackdrop = (props) => <div className={cx('backdrop')} {...props} />;

    const [showModalReport, setShowModalReport] = useState(false);
    var handleCloseReport = () => setShowModalReport(false);

    var handleSaveReport = () => {
        console.log('success');
    };

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            let response = await UserService.getJobPosting(`job/${id_job}`);
            setJobs(response.data);
        };
        fetch();
    }, [id_job]);

    const renderBackdropReport = (props) => <div className={cx('backdrop')} {...props} />;
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faPenToSquare} />,
            title: 'Chỉnh sửa bài đăng',
            to: '/',
        },
        {
            icon: <FontAwesomeIcon icon={faEyeSlash} />,
            title: 'Ẩn bài đăng',
            to: '/',
        },
        {
            icon: <FontAwesomeIcon icon={faTrashCan} />,
            title: 'Xóa bài đăng',
            to: '/',
        },
    ];

    var classesWrapper;
    if (employer) {
        classesWrapper = cx('wrapper_employer');
    } else {
        classesWrapper = cx('wrapper');
    }
    return (
        <div className={classesWrapper}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            <div className={cx('inner')}>
                <div className={cx('header_detail_job')}>
                    <div className={cx('header_left')}>
                        <img src={jobs.companyInfo?.logo} alt="logo_company" className={cx('logo')} />
                        <div className={cx('block_info')}>
                            <div className={cx('name_job')}>{jobs.title}</div>
                            <Link to={`/view-company?id=${jobs.companyInfo?.id}`}>
                                <div className={cx('name_company')}>{jobs.companyInfo?.name}</div>
                            </Link>

                            <div className={cx('deadline_submit')}>
                                <FontAwesomeIcon icon={faClockRotateLeft} style={{ marginRight: 10 }} />
                                Hạn nộp hồ sơ: {jobs.dueDate}
                            </div>
                        </div>
                    </div>

                    {employer === false ? (
                        <div className={cx('header_right')}>
                            <button
                                type="button"
                                className={cx('btn_apply')}
                                onClick={() => {
                                    setShowModal(true);
                                }}
                            >
                                Ứng tuyển
                            </button>
                            <button type="button" className={cx('btn_save_job')}>
                                Lưu tin
                            </button>
                            <Modal
                                className={cx('modal')}
                                show={showModal}
                                onHide={handleClose}
                                renderBackdrop={renderBackdrop}
                            >
                                <div>
                                    <div className={cx('modal-header')}>
                                        <div className={cx('modal-title')}>
                                            {' '}
                                            Ứng tuyển:&nbsp;<span className={cx('modal_name_job')}>{jobs.title}</span>
                                        </div>
                                        <span className={cx('btn-close')} onClick={handleClose}>
                                            x
                                        </span>
                                    </div>
                                    <div className={cx('line')}></div>

                                    <div className={cx('modal-body')}>
                                        <div className={cx('wrapper_name_CV')}>
                                            <div className={cx('text_fullname_CV')}>Họ và tên:</div>
                                            <input
                                                type="text"
                                                name="name"
                                                value={apply.name}
                                                onChange={handleChange}
                                                className={cx('fullname_cv')}
                                                required
                                            />
                                        </div>
                                        {errors.name && <span className={cx('error')}>{errors.name}</span>}

                                        <div className={cx('wrapper_name_CV')}>
                                            <div className={cx('text_CV_me')}>
                                                CV của bạn:
                                                <div className={cx('wrapper_cv')}>
                                                    {' '}
                                                    <input
                                                        type="file"
                                                        accept=".doc, .docx, .pdf,"
                                                        name="file_cv"
                                                        onChange={handleChange}
                                                        className={cx('inputfile')}
                                                        required
                                                    />
                                                    <p className={cx('note_cv')}>
                                                        Chỉ nhận file .doc, .docx, .pdf, tối đa 3MB
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {errors.file_cv && <span className={cx('error')}>{errors.file_cv}</span>}
                                        <div className={cx('text_introduce_CV')}>
                                            Giới thiệu một số kỹ năng, dự án của bạn:
                                        </div>
                                        <textarea
                                            name="introduce"
                                            value={apply.introduce}
                                            onChange={handleChange}
                                            className={cx('introduce_cv')}
                                        ></textarea>
                                    </div>
                                    <div className="modal-footer">
                                        <button className={cx('secondary-button')} onClick={handleClose}>
                                            Đóng
                                        </button>
                                        <button className={cx('primary-button')} onClick={handleSave}>
                                            Hoàn thành
                                        </button>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    ) : (
                        <Menu items={userMenu}>
                            <div className={cx('wrapper_setting')}>
                                <FontAwesomeIcon icon={faBars} className={cx('icon_setting')} />
                            </div>
                        </Menu>
                    )}
                </div>
                <div className={cx('body_detail_job')}>
                    <div className={cx('text_detail')}>Chi tiết tuyển dụng</div>
                    <div className={cx('info_job')}>
                        <div className={cx('general_information')}>
                            <div className={cx('text_general_information')}>Thông tin chung</div>
                            <div className={cx('list_items')}>
                                <div className={cx('item_infor')}>
                                    <div className={cx('circle_icon')}>
                                        <FontAwesomeIcon icon={faMoneyBillWave} className={cx('icon_item')} />
                                    </div>
                                    <div>
                                        <div className={cx('text_item')}>Mức lương</div>
                                        <div className={cx('value_item')}>{jobs.jobDescription?.salary}</div>
                                    </div>
                                </div>
                                <div className={cx('item_infor')}>
                                    <div className={cx('circle_icon')}>
                                        <FontAwesomeIcon icon={faUserGroup} className={cx('icon_item')} />
                                    </div>
                                    <div>
                                        <div className={cx('text_item')}>Số lượng</div>
                                        <div className={cx('value_item')}>{jobs.jobDescription?.number_candidates}</div>
                                    </div>
                                </div>
                                <div className={cx('item_infor')}>
                                    <div className={cx('circle_icon')}>
                                        <FontAwesomeIcon icon={faBriefcase} className={cx('icon_item')} />
                                    </div>
                                    <div>
                                        <div className={cx('text_item')}>Hình thức làm việc</div>
                                        <div className={cx('value_item')}>{jobs.jobDescription?.working_form}</div>
                                    </div>
                                </div>
                                <div className={cx('item_infor')}>
                                    <div className={cx('circle_icon')}>
                                        <FontAwesomeIcon icon={faMarsAndVenus} className={cx('icon_item')} />
                                    </div>
                                    <div>
                                        <div className={cx('text_item')}>Giới tính</div>
                                        <div className={cx('value_item')}>{jobs.jobDescription?.gender}</div>
                                    </div>
                                </div>
                                <div className={cx('item_infor')}>
                                    <div className={cx('circle_icon')}>
                                        <FontAwesomeIcon icon={faAddressCard} className={cx('icon_item')} />
                                    </div>
                                    <div>
                                        <div className={cx('text_item')}>Kinh nghiệm</div>
                                        <div className={cx('value_item')}>{jobs.jobDescription?.experience}</div>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('text_adress_work')}>Địa điểm làm việc</div>
                            <div className={cx('value_adress_work')}>{jobs.jobDescription?.address_work}</div>
                        </div>
                        <div className={cx('share_report')}>
                            <div className={cx('share')}>
                                <div className={cx('text_share')}>Chia sẻ tin tuyển dụng</div>
                                <div className={cx('text_copy')}>Sao chép đường dẫn</div>
                                <div className={cx('value_copy')}>
                                    <input
                                        type="text"
                                        value={currentPath}
                                        disabled
                                        name="link_job"
                                        className={cx('link_job')}
                                    />
                                    <div className={cx('circle_copy')}>
                                        <FontAwesomeIcon icon={faCopy} className={cx('icon_copy')} />
                                    </div>
                                </div>
                            </div>
                            {employer === false ? (
                                <div className={cx('report')}>
                                    <div className={cx('text_share')}>Báo cáo tin tuyển dụng</div>
                                    <div className={cx('text_report')}>
                                        Nếu bạn thấy rằng tin tuyển dụng này không đúng hoặc có một trong các dấu hiệu
                                        xấu, hãy phản ánh với chúng tôi.
                                    </div>
                                    <button
                                        className={cx('btn_report')}
                                        onClick={() => {
                                            setShowModalReport(true);
                                        }}
                                    >
                                        Báo cáo
                                    </button>
                                    <Modal
                                        className={cx('modal')}
                                        show={showModalReport}
                                        onHide={handleCloseReport}
                                        renderBackdrop={renderBackdropReport}
                                    >
                                        <div>
                                            <div className={cx('modal-header')}>
                                                <div className={cx('modal-title')}>
                                                    Báo cáo:&nbsp;<span className={cx('modal_name_job')}>Java</span>
                                                </div>
                                                <span className={cx('btn-close')} onClick={handleCloseReport}>
                                                    x
                                                </span>
                                            </div>
                                            <div className={cx('line')}></div>

                                            <div className={cx('modal-body')}>
                                                <div className={cx('label_report')}>Nội dung báo cáo:</div>
                                                <textarea
                                                    name="introduce"
                                                    className={cx('value_report')}
                                                    required
                                                ></textarea>
                                            </div>
                                            <div className="modal-footer">
                                                <button className={cx('secondary-button')} onClick={handleCloseReport}>
                                                    Hủy
                                                </button>
                                                <button className={cx('primary-button')} onClick={handleSaveReport}>
                                                    Gửi
                                                </button>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            ) : (
                                <div className={cx('report')}>
                                    <div className={cx('text_share')}>Quản lý hồ sơ ứng tuyển</div>
                                    <div className={cx('text_report')}>
                                        Danh sách hồ sơ ứng viên đã ứng tuyển vào công việc này đang chờ bạn xem xét
                                        đấy.
                                    </div>
                                    <button className={cx('btn_view_CV')}>Xem danh sách</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={cx('text_job_description')}>Mô tả công việc</div>
                    <ul className={cx('list_job_description')}>{jobs.jobDescription?.description}</ul>
                    <div className={cx('text_job_description')}>Yêu cầu ứng viên</div>
                    <ul className={cx('list_job_description')}>{jobs.jobDescription?.requirement}</ul>
                    <div className={cx('text_job_description')}>Quyền lợi</div>
                    <ul className={cx('list_job_description')}>{jobs.jobDescription?.benefits}</ul>
                </div>
            </div>
        </div>
    );
}

export default DetailJob;
