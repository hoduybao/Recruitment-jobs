import classNames from 'classnames/bind';
import styles from './InfoEmployer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faGlobe, faPhone } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function InfoEmployer({ info }) {
    console.log(info);
    return (
        <div className={cx('inner')}>
            <div className={cx('text_intro_company')}>Thông tin liên lạc</div>

            <div className={cx('email')}>
                <FontAwesomeIcon icon={faEnvelope} className={cx('icon_infor')} />
                {info.email}
            </div>
            <div className={cx('email')}>
                <FontAwesomeIcon icon={faPhone} className={cx('icon_infor')} />
                {info.phone}
            </div>
            {info.company.domain && (
                <div className={cx('email')}>
                    <FontAwesomeIcon icon={faGlobe} className={cx('icon_infor')} />
                    {info.company.domain}
                </div>
            )}
        </div>
    );
}

export default InfoEmployer;
