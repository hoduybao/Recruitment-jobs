import classNames from 'classnames/bind';
import styles from './ViewCompany.module.scss';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faLocationDot, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import ListJobs from '~/Layout/components/ListJobs';
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
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id_company = params.get('id');

    const [classJob, setClassJob] = useState(['active']);
    const [classReview, setClassReview] = useState([]);
    const [isListJob, setIsListJob] = useState(true);
    var classesJob = cx('item_navi', ...classJob);
    var classesReview = cx('item_navi', ...classReview);

    const [showModalReport, setShowModalReport] = useState(false);
    var handleCloseReport = () => setShowModalReport(false);

    var handleSaveReport = (event) => {
        event.preventDefault();

        const fetch = async () => {
            let response = await UserService.reportJob(`candidate/rating/${id_company}`, {
                rate: review.rate,
                content: review.content,
            });
            handleCloseReport();

            if (response.status === 'ok') {
                notify('success', 'Đánh giá thành công!');
            }
            else{
                notify('success', 'Bạn đã đánh giá trước đó!');

            }
        };
        fetch();
    };
    const renderBackdropReport = (props) => <div className={cx('backdrop')} {...props} />;

    const [companies, setCompanies] = useState([]);
    const [listJobs, setListJobs] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            let response = await UserService.GetCompany(`company/${id_company}`);
            let response1 = await UserService.GetCompany(`company/job/${id_company}`);
            console.log(response.data);
            setCompanies(response.data);
            setListJobs(response1.data);
        };
        fetch();
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

    return (
        <div className={cx('wrapper')}>
            <Toast />
            <div className={cx('inner')}>
                <div className={cx('header_detail_job')}>
                    <div className={cx('header_left')}>
                        <img src={images.logo} alt="logo_company" className={cx('logo')} />
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
                        <button
                            type="button"
                            className={cx('btn_apply')}
                            data-bs-toggle="modal"
                            data-bs-target="#modal_apply_company"
                            onClick={() => {
                                setShowModalReport(true);
                            }}
                        >
                            Đánh giá
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
                                        Đánh giá:&nbsp;<span className={cx('modal_name_job')}>{companies.name}</span>
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
                                        Gửi
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
                        Việc làm
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
                            {listJobs != null && <ListJobs ListJobs={listJobs} />}
                            <IntroCompany companies={companies.description} />
                        </div>
                    ) : (
                        <div className={cx('side_left')}>
                            {companies.ratingCompanies != null && <DetailReview rating={companies.ratingCompanies} />}
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
        </div>
    );
}

export default ViewCompany;
