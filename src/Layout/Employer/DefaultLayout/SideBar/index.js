import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faFile, faFileLines, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { useState } from 'react';
const cx = classNames.bind(styles);


function SideBar() {


      const [classes1,setClasses1]=useState(["selected"]);
      const [classes2,setClasses2]=useState(["not_selected"]);
      const [classes3,setClasses3]=useState(["not_selected"]);

    return (
        <aside className={cx('wrapper')}>
            <div className={cx('header')}>
                <img src={images.logo} alt="avatar" className={cx('avatar')} />
                <div>
                    <div className={cx('name_employer')}>
                        Dương Minh Hiếu
                        <FontAwesomeIcon icon={faCircleCheck} style={{ marginLeft: 5, color: '#00B4D8' }} />
                    </div>
                    <div className={cx('text_info')}>Business</div>
                    <div className={cx('text_info')}>
                        Tài khoản đã được<span style={{ color: '#00B4D8' }}> JORE </span>xác nhận
                    </div>
                </div>
            </div>
            <div className={cx('menu')}>
                <Link className={cx('item',...classes1)} to="/employer" onClick={()=>{
                    setClasses1(["selected"]);
                    setClasses2(["not_selected"]);
                    setClasses3(["not_selected"]);

                }}>
                    <FontAwesomeIcon
                        icon={faSquarePollVertical}
                        style={{ marginRight: 20 }}
                        className={cx('icon_menu')}
                    />
                    <span className={cx('name_item')}>Bảng tin</span>
                </Link>
                <Link className={cx('item',...classes2)} to="/employer/jobs" onClick={()=>{
                     setClasses2(["selected"]);
                     setClasses1(["not_selected"]);
                     setClasses3(["not_selected"]);
 

                }}>
                    <FontAwesomeIcon icon={faFileLines} style={{ marginRight: 20 }} className={cx('icon_menu')} />
                    <span className={cx('name_item')}>Quản lý tin tuyển dụng</span>
                </Link>
                <Link className={cx('item',...classes3)} onClick={()=>{
                     setClasses3(["selected"]);
                     setClasses2(["not_selected"]);
                     setClasses1(["not_selected"]);
 

                }}>
                    <FontAwesomeIcon
                        icon={faFacebookMessenger}
                        style={{ marginRight: 20 }}
                        className={cx('icon_menu')}
                    />
                    <span className={cx('name_item')}>Tin nhắn</span>
                </Link>
            </div>
        </aside>
    );
}

export default SideBar;
