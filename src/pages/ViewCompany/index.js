import classNames from 'classnames/bind';
import styles from './ViewCompany.module.scss';
import images from '~/assets/images';
import Loading from '~/Layout/components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarDays,
    faCamera,
    faCircleNotch,
    faLocationDot,
    faPenToSquare,
    faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import ListJobs from '~/Layout/components/ListJobs';
import InfoEmployer from '~/Layout/Employer/components/InfoEmloyer';
import IntroCompany from '~/Layout/components/IntroCompany';
import DetailReview from '~/Layout/components/DetailReview';
import TotalReview from '~/Layout/components/TotalReview';
import { Rate } from 'antd';
import React, { useState, useEffect } from 'react';
import UserService from '~/utils/request';
import { useLocation } from 'react-router-dom';
import Toast from '~/Layout/components/Toast';
import notify from '~/utils/toast';
import Modal from 'react-overlays/Modal';

const cx = classNames.bind(styles);

function ViewCompany() {
    const [loading, setLoading] = useState(false);
    const user = localStorage.getItem('user');
    const em = localStorage.getItem('is_employer');
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id_company = params.get('id');
    var navi1 = 'Việc làm';
    var classWrapper = cx('wrapper');
    if (!id_company) {
        classWrapper = cx('employer');
        navi1 = 'Thông tin';
    }

    const [classJob, setClassJob] = useState(['active']);
    const [classReview, setClassReview] = useState([]);
    const [isListJob, setIsListJob] = useState(true);
    var classesJob = cx('item_navi', ...classJob);
    var classesReview = cx('item_navi', ...classReview);

    const [showModalReport, setShowModalReport] = useState(false);
    var handleCloseReport = () => setShowModalReport(false);

    var handleSaveReport = (event) => {
        event.preventDefault();
        setLoading(true);

        const fetch = async () => {
            let response = await UserService.reportJob(`candidate/rating/${id_company}`, {
                rate: review.rate,
                content: review.content,
            });

            setLoading(false);
            handleCloseReport();

            if (response.status === 'ok') {
                notify('success', 'Đánh giá thành công!');
            } else {
                notify('success', 'Bạn đã đánh giá trước đó!');
            }

            var newCompany = companies;
            newCompany.rate =
                (newCompany.rate * newCompany.ratingCompanies.length + review.rate) /
                (newCompany.ratingCompanies.length + 1);
            newCompany.ratingCompanies.push({
                rate: review.rate,
                content: review.content,
                createdDate: new Date(),
            });

            setCompanies(newCompany);
        };

        fetch();
    };
    const renderBackdropReport = (props) => <div className={cx('backdrop')} {...props} />;

    const [companies, setCompanies] = useState(null);
    const [update, setUpdate] = useState(null);
    const [avatar, setAvatar] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const [errors, setErrors] = useState({
        name: '',
        phone: '',
        taxCode: '',
        address: '',
        domain: '',
        companySize: '',
        workTime: '',
        description: '',
    });
    const handleClose = () => {
        setShowModal(false);
    };
    const [listJobs, setListJobs] = useState([]);

    useEffect(() => {
        if (id_company) {
            const fetch = async () => {
                let response = await UserService.GetCompany(`company/${id_company}`);
                let response1 = await UserService.GetCompany(`company/job/${id_company}`);
                console.log(response1.data);
                setCompanies(response.data);
                setListJobs(response1.data);
            };
            fetch();
        } else {
            const fetch = async () => {
                let response1 = await UserService.getUser(`employer/myInfo`);
                console.log(response1.data);
                setListJobs(response1.data);
                setCompanies(response1.data.company);
                setAvatar(response1.data.logo);
                response1 = response1.data;
                setUpdate({
                    file: null,
                    name: response1.company.name,
                    phone: response1.phone,
                    taxCode: null,
                    address: response1.company.address,
                    domain: response1.company.domain,
                    companySize: response1.company.companySize,
                    workTime: response1.company.workTime,
                    description: response1.company.description,
                });
            };
            fetch();
        }
    }, [id_company]);

    const [review, setReview] = useState({
        rate: 5,
        content: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setReview((prevInputs) => ({ ...prevInputs, [name]: value }));
    };
    const handleChangeRate = (value) => {
        setReview((prevInputs) => ({ ...prevInputs, rate: value }));
    };
    const handleChangeUpdate = (event) => {
        const { name, value } = event.target;
        if (name === 'file') {
            let value2 = event.target.files[0];
            setAvatar(URL.createObjectURL(value2));
            setUpdate((prevInputs) => ({ ...prevInputs, [name]: value2 }));
        } else {
            setUpdate((prevInputs) => ({ ...prevInputs, [name]: value }));
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }
    };
    const handleSubmitInfo = (event) => {
        event.preventDefault();
        console.log(update);

        let success = true;
        // Validate inputs
        const newErrors = {};
        if (!update.name) {
            newErrors.name = 'Tên công ty không thể trống';
            success = false;
        }
        if (!update.phone) {
            newErrors.phone = 'Số điện thoại không thể trống';
            success = false;
        }
        if (!update.companySize) {
            newErrors.companySize = 'Quy mô không thể trống';
            success = false;
        }
        if (!update.workTime) {
            newErrors.workTime = 'Thời gian làm việc không thể trống';
            success = false;
        }
        setErrors(newErrors);

        if (success) {
            setLoading(true);
            var formdata = new FormData();
            formdata.append('file', update.file);
            formdata.append('name', update.name);
            formdata.append('phone', update.phone);
            formdata.append('taxCode', update.taxCode);
            formdata.append('address', update.address);
            formdata.append('domain', update.domain);
            formdata.append('companySize', update.companySize);
            formdata.append('workTime', update.workTime);
            formdata.append('description', update.description);

            const fetch = async () => {
                let response = await UserService.updateCandidate('employer/updateInfoEmployer', formdata);
                if (response.status === 'ok') {
                    notify('success', 'Cập nhật thành công!');
                    setLoading(false);
                    window.location.href = '/employer/profile';
                }
                // if (response.status === 'ok') {
                //   //  notify('success', 'Báo cáo thành công!');
                // }
                //  handleClose();
            };
            fetch();
        } else {
            setErrors(newErrors);
        }
    };
    const renderBackdrop = (props) => <div className={cx('backdrop')} {...props} />;

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
    }, []);
    return (
        <div className={classWrapper}>
            <Toast />
            {companies === null ? (
                <Loading />
            ) : (
                <div className={cx('inner')}>
                    <div className={cx('header_detail_job')}>
                        <div className={cx('header_left')}>
                            <div className={cx('wrapper_logo')}>
                                <img src={listJobs.logo || companies.logo} alt="logo_company" className={cx('logo')} />
                                {!id_company && (
                                    <button
                                        className={cx('btn_edit')}
                                        onClick={() => {
                                            setShowModal(true);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} className={cx('icon_edit')} />
                                        Chỉnh sửa
                                    </button>
                                )}
                                {update !== null && (
                                    <Modal
                                        className={cx('modal_update')}
                                        show={showModal}
                                        onHide={handleClose}
                                        renderBackdrop={renderBackdrop}
                                    >
                                        <div>
                                            <div className={cx('modal-header')}>
                                                <div className={cx('modal-title')}>Chỉnh sửa thông tin cá nhân</div>
                                                <span className={cx('btn-close')} onClick={handleClose}>
                                                    x
                                                </span>
                                            </div>
                                            <div className={cx('line')}></div>
                                            <div className={cx('modal-body')}>
                                                <div className={cx('wrapper_update_avatar')}>
                                                    <img src={avatar} className={cx('avatar_update')} alt="avatar" />
                                                    <input
                                                        id="upload"
                                                        type="file"
                                                        accept=".jpg,.png"
                                                        onChange={handleChangeUpdate}
                                                        className={cx('input_avatar')}
                                                        name="file"
                                                    />
                                                    <label for="upload" className={cx('label_update_camera')}>
                                                        <FontAwesomeIcon
                                                            icon={faCamera}
                                                            className={cx('icon_camera')}
                                                        />
                                                    </label>
                                                </div>
                                                <div className={cx('wrapper_name_CV')}>
                                                    <div className={cx('text_fullname_CV')}>Tên công ty:</div>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={update.name}
                                                        onChange={handleChangeUpdate}
                                                        className={cx('fullname_cv')}
                                                        required
                                                    />
                                                </div>
                                                {errors.name && <span className={cx('error')}>{errors.name}</span>}

                                                <div className={cx('wrapper_name_CV')}>
                                                    <div className={cx('text_fullname_CV')}>Số điện thoại:</div>
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        value={update.phone}
                                                        onChange={handleChangeUpdate}
                                                        className={cx('fullname_cv')}
                                                    />
                                                </div>
                                                {errors.phone && <span className={cx('error')}>{errors.phone}</span>}
                                                <div className={cx('wrapper_name_CV')}>
                                                    <div className={cx('text_fullname_CV')}>Địa chỉ:</div>

                                                    <select
                                                        name="address"
                                                        value={update.address}
                                                        onChange={handleChangeUpdate}
                                                        className={cx('fullname_cv')}
                                                        required=""
                                                    >
                                                        {provinces.map((province) => (
                                                            <option value={province.name}>{province.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {errors.address && (
                                                    <span className={cx('error')}>{errors.address}</span>
                                                )}
                                                <div className={cx('wrapper_name_CV')}>
                                                    <div className={cx('text_fullname_CV')}>Quy mô:</div>
                                                    <input
                                                        type="text"
                                                        name="companySize"
                                                        value={update.companySize}
                                                        onChange={handleChangeUpdate}
                                                        className={cx('fullname_cv')}
                                                        placeholder="20-50 nhân viên"
                                                    />
                                                </div>
                                                {errors.companySize && (
                                                    <span className={cx('error')}>{errors.companySize}</span>
                                                )}
                                                <div className={cx('wrapper_name_CV')}>
                                                    <div className={cx('text_fullname_CV')}>Thời gian:</div>
                                                    <input
                                                        type="text"
                                                        name="workTime"
                                                        value={update.workTime}
                                                        onChange={handleChangeUpdate}
                                                        className={cx('fullname_cv')}
                                                        placeholder="Thứ Hai - Thứ Bảy"
                                                    />
                                                </div>
                                                {errors.workTime && (
                                                    <span className={cx('error')}>{errors.workTime}</span>
                                                )}
                                                <div className={cx('wrapper_name_CV')}>
                                                    <div className={cx('text_fullname_CV')}>Trang web:</div>
                                                    <input
                                                        type="text"
                                                        name="domain"
                                                        value={update.domain}
                                                        onChange={handleChangeUpdate}
                                                        className={cx('fullname_cv')}
                                                        placeholder="www.trangweb.com"
                                                    />
                                                </div>
                                                <div className={cx('wrapper_name_CV')}>
                                                    <div className={cx('text_fullname_CV')}>Giới thiệu:</div>
                                                    <textarea
                                                        type="text"
                                                        name="description"
                                                        value={update.description}
                                                        onChange={handleChangeUpdate}
                                                        className={cx('introduce_update')}
                                                        placeholder="Giới thiệu tổng quan công ty"
                                                    />
                                                </div>
                                                {errors.description && (
                                                    <span className={cx('error')}>{errors.description}</span>
                                                )}
                                            </div>
                                            <div className="modal-footer">
                                                <button className={cx('secondary-button')} onClick={handleClose}>
                                                    Đóng
                                                </button>
                                                <button className={cx('primary-button')} onClick={handleSubmitInfo}>
                                                    {loading ? (
                                                        <FontAwesomeIcon icon={faCircleNotch} spin />
                                                    ) : (
                                                        'Hoàn thành'
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </Modal>
                                )}
                            </div>

                            <div className={cx('block_info')}>
                                <div className={cx('name_company')}>{companies.name}</div>
                                <div className={cx('item_header')}>
                                    <FontAwesomeIcon icon={faUserGroup} className={cx('icon_item_header')} />
                                    <div className={cx('deadline_submit')}>{companies.companySize}</div>
                                </div>
                                <div className={cx('item_header')}>
                                    <FontAwesomeIcon icon={faCalendarDays} className={cx('icon_item_header')} />
                                    <div className={cx('deadline_submit')}>{companies.workTime}</div>
                                </div>
                                <div className={cx('item_header')}>
                                    <FontAwesomeIcon icon={faLocationDot} className={cx('icon_item_header')} />
                                    <div className={cx('deadline_submit')}>{companies.address}</div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('header_right')}>
                            {id_company && (
                                <button
                                    type="button"
                                    className={cx('btn_apply')}
                                    data-bs-toggle="modal"
                                    data-bs-target="#modal_apply_company"
                                    onClick={() => {
                                        if (user && !em) {
                                            setShowModalReport(true);
                                        } else {
                                            window.localStorage.setItem('back', 'back');
                                            window.location.href = '/sign-in';
                                        }
                                    }}
                                >
                                    Đánh giá
                                </button>
                            )}

                            <Modal
                                className={cx('modal')}
                                show={showModalReport}
                                onHide={handleCloseReport}
                                renderBackdrop={renderBackdropReport}
                            >
                                <div>
                                    <div className={cx('modal-header')}>
                                        <div className={cx('modal-title')}>
                                            Đánh giá:&nbsp;
                                            <span className={cx('modal_name_job')}>{companies.name}</span>
                                        </div>
                                        <span className={cx('btn-close')} onClick={handleCloseReport}>
                                            x
                                        </span>
                                    </div>
                                    <div className={cx('line')}></div>

                                    <div className={cx('modal-body')}>
                                        <span className={cx('label_start')}>Đánh giá: </span>
                                        <Rate
                                            className={cx('rating_company')}
                                            name="rate"
                                            defaultValue={review.rate}
                                            onChange={handleChangeRate}
                                            allowHalf
                                        />

                                        <div className={cx('label_report')}>Nội dung:</div>
                                        <textarea
                                            name="content"
                                            value={review.content}
                                            onChange={handleChange}
                                            className={cx('value_report')}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="modal-footer">
                                        <button className={cx('secondary-button')} onClick={handleCloseReport}>
                                            Hủy
                                        </button>
                                        <button className={cx('primary-button')} onClick={handleSaveReport}>
                                            {loading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : 'Gửi'}
                                        </button>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    </div>
                    <div className={cx('navigation')}>
                        <div
                            className={classesJob}
                            onClick={(e) => {
                                setClassJob(['active']);
                                setClassReview([]);
                                setIsListJob(true);
                            }}
                        >
                            {navi1}
                        </div>
                        <div
                            className={classesReview}
                            onClick={(e) => {
                                setClassReview(['active']);
                                setClassJob([]);
                                setIsListJob(false);
                            }}
                        >
                            Đánh giá
                        </div>
                    </div>
                    <div className={cx('content')}>
                        {classJob.length > 0 ? (
                            <div className={cx('side_left')}>
                                {listJobs != null && id_company && (
                                    <ListJobs logo={companies.logo} ListJobs={listJobs} />
                                )}
                                {listJobs != null && !id_company && <InfoEmployer info={listJobs} />}
                                <IntroCompany companies={companies.description} />
                            </div>
                        ) : (
                            <div className={cx('side_left')}>
                                {companies.ratingCompanies != null && (
                                    <DetailReview rating={companies.ratingCompanies} />
                                )}
                                <IntroCompany companies={companies.description} />
                            </div>
                        )}
                        <div className={cx('side_right')}>
                            <TotalReview
                                rate={companies.rate}
                                isListJob={isListJob}
                                onClick={() => {
                                    setClassReview(['active']);
                                    setClassJob([]);
                                    setIsListJob(false);
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewCompany;
