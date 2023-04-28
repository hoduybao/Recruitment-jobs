import classNames from 'classnames/bind';
import styles from './IntroCompany.module.scss';

const cx = classNames.bind(styles);

function IntroCompany() {
    return (
        <div className={cx('inner')}>
            <div className={cx('text_intro_company')}>Giới thiệu công ty</div>
            <p>
                We’re building a startupat ACB to serve our millions of customers. We’re looking for exceptional talent
                to drive growth. Shape the management team that will deliver world-class technology to acquire the next
                million customers.{' '}
            </p>
            <p>We’re thinkers and doers, and like people who can be both player and coach.</p>
            <p>
                As one of the largest consumer banks in Asia, we’re investing in the leading people, technologies and
                practices to improve each customer’s financial lives. Join the 11,000 team members at ACB and build the
                fintech company of the future.
            </p>
        </div>
    );
}

export default IntroCompany;
