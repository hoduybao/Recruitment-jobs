import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('intro')}>
                    <img className={cx('logo_web_footer')} src={images.logo} alt="logoweb" />
                    <p className={cx('text_info_footer')}>
                        Chúng tôi là JORE hệ thống tìm kiếm và tuyển dụng việc làm uy tính tại Việt Nam
                    </p>
                </div>
                <div className={cx('about')}>
                    <div className={cx('about_us')}>Về chúng tôi</div>
                    <div className={cx('leadership_team')}>Đội ngũ quản trị viên</div>
                    <div className={cx('blog')}>Blog</div>
                    <div className={cx('terms_of_use')}>Điều khoản sử dụng</div>
                </div>
                <div className={cx('contact')}>
                    <div className={cx('text_contact')}>Liên hệ</div>
                    <img src={images.facebook} alt="facebook" className={cx('facebook')} />
                    <div className={cx('contact_footer')}>Email: hoduybaoo@gmail.com</div>
                    <div className={cx('text_version_footer')}>©️2023 JORE. All rights reversed.</div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
