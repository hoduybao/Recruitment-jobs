import classNames from 'classnames/bind';
import styles from './DetailJob.module.scss';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAddressCard,
    faBriefcase,
    faClockRotateLeft,
    faCopy,
    faMarsAndVenus,
    faMoneyBillWave,
    faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function DetailJob() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header_detail_job')}>
                    <div className={cx('header_left')}>
                        <img src={images.logo} alt="logo_company" className={cx('logo')} />
                        <div className={cx('block_info')}>
                            <div className={cx('name_job')}>Backend Java - Spring boot </div>
                            <Link to="/">
                                <div className={cx('name_company')}>VNG games</div>
                            </Link>

                            <div className={cx('deadline_submit')}>
                                <FontAwesomeIcon icon={faClockRotateLeft} style={{ marginRight: 10 }} />
                                Hạn nộp hồ sơ: 20-10-2002
                            </div>
                        </div>
                    </div>
                    <div className={cx('header_right')}>
                        <button
                            type="button"
                            className={cx('btn_apply')}
                            data-bs-toggle="modal"
                            data-bs-target="#modal_apply_company"
                        >
                            Ứng tuyển
                        </button>
                        <button type="button" className={cx('btn_save_job')}>
                            Lưu tin
                        </button>
                    </div>

                    {/* 
{{#if data.isApplied}}
<button type="button" className="btn_apply_to_company_detail_job" data-bs-toggle="modal"
    data-bs-target="#modal_apply_company" disabled>Đã ứng tuyển</button>
{{else}}
<button type="button" className="btn_apply_to_company_detail_job" data-bs-toggle="modal"
    data-bs-target="#modal_apply_company">Ứng tuyển</button>
{{/if}}
<button type="button" className="btn_save_job_detail_job">Lưu tin</button>
</div> */}
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
                                        <div className={cx('value_item')}>10 triệu</div>
                                    </div>
                                </div>
                                <div className={cx('item_infor')}>
                                    <div className={cx('circle_icon')}>
                                        <FontAwesomeIcon icon={faUserGroup} className={cx('icon_item')} />
                                    </div>
                                    <div>
                                        <div className={cx('text_item')}>Số lượng</div>
                                        <div className={cx('value_item')}>10 người</div>
                                    </div>
                                </div>
                                <div className={cx('item_infor')}>
                                    <div className={cx('circle_icon')}>
                                        <FontAwesomeIcon icon={faBriefcase} className={cx('icon_item')} />
                                    </div>
                                    <div>
                                        <div className={cx('text_item')}>Hình thức làm việc</div>
                                        <div className={cx('value_item')}>10 người</div>
                                    </div>
                                </div>
                                <div className={cx('item_infor')}>
                                    <div className={cx('circle_icon')}>
                                        <FontAwesomeIcon icon={faMarsAndVenus} className={cx('icon_item')} />
                                    </div>
                                    <div>
                                        <div className={cx('text_item')}>Giới tính</div>
                                        <div className={cx('value_item')}>Nam</div>
                                    </div>
                                </div>
                                <div className={cx('item_infor')}>
                                    <div className={cx('circle_icon')}>
                                        <FontAwesomeIcon icon={faAddressCard} className={cx('icon_item')} />
                                    </div>
                                    <div>
                                        <div className={cx('text_item')}>Kinh nghiệm</div>
                                        <div className={cx('value_item')}>1 năm</div>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('text_adress_work')}>Địa điểm làm việc</div>
                            <div className={cx('value_adress_work')}>Võ Văn Ngân , Thủ Đức , Hồ Chí Minh</div>
                        </div>
                        <div className={cx('share_report')}>
                            <div className={cx('share')}>
                                <div className={cx('text_share')}>Chia sẻ tin tuyển dụng</div>
                                <div className={cx('text_copy')}>Sao chép đường dẫn</div>
                                <div className={cx('value_copy')}>
                                    <input
                                        type="text"
                                        value="http://localhost:3032/candidate/detail_job/{{idDocRecruitment}}"
                                        disabled
                                        name="link_job"
                                        className={cx('link_job')}
                                    />
                                    <div className={cx('circle_copy')}>
                                        <FontAwesomeIcon icon={faCopy} className={cx('icon_copy')} />
                                    </div>
                                </div>
                            </div>
                            <div className={cx('report')}>
                                <div className={cx('text_share')}>Báo cáo tin tuyển dụng</div>
                                <div className={cx('text_report')}>
                                    Nếu bạn thấy rằng tin tuyển dụng này không đúng hoặc có một trong các dấu hiệu xấu,
                                    hãy phản ánh với chúng tôi.
                                </div>
                                <button className={cx('btn_report')}>Báo cáo</button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('text_job_description')}>Mô tả công việc</div>
                    <ul className={cx('list_job_description')}>
                        <li>công việc tốt</li>
                        <li>công việc tốt</li>
                    </ul>
                    <div className={cx('text_job_description')}>Yêu cầu ứng viên</div>
                    <ul className={cx('list_job_description')}>
                        <li>công việc tốt</li>
                        <li>công việc tốt</li>
                    </ul>
                    <div className={cx('text_job_description')}>Quyền lợi</div>
                    <ul className={cx('list_job_description')}>
                        <li>công việc tốt</li>
                        <li>công việc tốt</li>
                    </ul>
                </div>
               
            </div>
        </div>
    );
}

export default DetailJob;
