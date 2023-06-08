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

    var handleSaveReport = () => {
        console.log('success');
    };
    const renderBackdropReport = (props) => <div className={cx('backdrop')} {...props} />;

    const [companies, setCompanies] = useState([]);

    // useEffect(() => {
    //     UserService.GetCompany(`company/${id_company}`, {}).then((res) => {
    //         setCompanies(res.data);
    //     });
    // }, [id_company]);
    useEffect(() => {
        const fetch = async () => {
            let response = await UserService.GetCompany(`company/${id_company}`);
            setCompanies(response.data);
        };
        fetch();
    }, [id_company]);
    
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header_detail_job')}>
                    <div className={cx('header_left')}>
                        <img src={images.logo} alt="logo_company" className={cx('logo')} />
                        <div className={cx('block_info')}>
                            <div className={cx('name_company')}>{companies.name}</div>
                            <div className={cx('item_header')}>
                                <FontAwesomeIcon icon={faUserGroup} className={cx('icon_item_header')} />
                                <div className={cx('deadline_submit')}>10-20 người</div>
                            </div>
                            <div className={cx('item_header')}>
                                <FontAwesomeIcon icon={faCalendarDays} className={cx('icon_item_header')} />
                                <div className={cx('deadline_submit')}>Thứ 2 - Thứ 7</div>
                            </div>
                            <div className={cx('item_header')}>
                                <FontAwesomeIcon icon={faLocationDot} className={cx('icon_item_header')} />
                                <div className={cx('deadline_submit')}>
                                    {companies.address}
                                </div>
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
                                        Đánh giá:&nbsp;<span className={cx('modal_name_job')}>Java</span>
                                    </div>
                                    <span className={cx('btn-close')} onClick={handleCloseReport}>
                                        x
                                    </span>
                                </div>
                                <div className={cx('line')}></div>

                                <div className={cx('modal-body')}>
                                    <span className={cx('label_start')}>Đánh giá: </span>
                                    <Rate className={cx('rating_company')} defaultValue={5} allowHalf />

                                    <div className={cx('label_report')}>
                                        Nội dung:
                                    </div>
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
                </div>
                <div className={cx('navigation')}>
                    <Link
                        className={classesJob}
                        onClick={(e) => {
                            setClassJob(['active']);
                            setClassReview([]);
                            setIsListJob(true);
                        }}
                        to=""

                    >
                        Việc làm
                    </Link>
                    <Link
                        className={classesReview}
                        onClick={(e) => {
                            setClassReview(['active']);
                            setClassJob([]);
                            setIsListJob(false);
                        }}
                        to=""
                    >
                        Đánh giá
                    </Link>
                </div>
                <div className={cx('content')}>
                    {classJob.length > 0 ? (
                        <div className={cx('side_left')}>
                            {companies.jobPostingList != null &&<ListJobs companies={companies.jobPostingList}/>}
                            <IntroCompany companies={companies.description}/>
                        </div>
                    ) : (
                        <div className={cx('side_left')}>
                            <DetailReview />
                        </div>
                    )}
                    <div className={cx('side_right')}>
                        <TotalReview isListJob={isListJob} onClick={() => {
                            setClassReview(['active']);
                            setClassJob([]);
                            setIsListJob(false);
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewCompany;