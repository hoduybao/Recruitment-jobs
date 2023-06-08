import classNames from 'classnames/bind';
import styles from './IntroCompany.module.scss';

const cx = classNames.bind(styles);

function IntroCompany(companies) {
    return (
        <div className={cx('inner')}>
            <div className={cx('text_intro_company')}>Giới thiệu công ty</div>
            {companies.companies}
        </div>
    );
}

export default IntroCompany;
