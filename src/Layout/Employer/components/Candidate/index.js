import classNames from 'classnames/bind';
import styles from './Candidate.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Candidate() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title_quantity')}>
                <span className={cx('quantity')}>15</span> hồ sơ đã nộp
            </div>
            <div className={cx('line')}></div>
            <div className={cx('d-flex', 'flex-wrap', 'card_company_home')}>
                <div className={cx('item_recruit_candidate')}>
                    <img src={images.logo} className={cx('avatar')} alt="avatar" />
                    <div className={cx('name')}>Hồ Duy Bảo</div>
                    <div className={cx('time')}>
                        <FontAwesomeIcon icon={faClock} style={{ marginRight: 5,color:"#00B4D8" }} />
                        2023-04-20
                    </div>
                </div>
                <div className={cx('item_recruit_candidate')}>
                    <img src={images.logo} className={cx('avatar')} alt="avatar" />
                    <div className={cx('name')}>Hồ Duy Bảo</div>
                    <div className={cx('time')}>
                        <FontAwesomeIcon icon={faClock} style={{ marginRight: 5,color:"#00B4D8" }} />
                        2023-04-20
                    </div>
                </div>
                <div className={cx('item_recruit_candidate')}>
                    <img src={images.logo} className={cx('avatar')} alt="avatar" />
                    <div className={cx('name')}>Hồ Duy Bảo</div>
                    <div className={cx('time')}>
                        <FontAwesomeIcon icon={faClock} style={{ marginRight: 5,color:"#00B4D8" }} />
                        2023-04-20
                    </div>
                </div>
                <div className={cx('item_recruit_candidate')}>
                    <img src={images.logo} className={cx('avatar')} alt="avatar" />
                    <div className={cx('name')}>Hồ Duy Bảo</div>
                    <div className={cx('time')}>
                        <FontAwesomeIcon icon={faClock} style={{ marginRight: 5,color:"#00B4D8" }} />
                        2023-04-20
                    </div>
                </div>
                <div className={cx('item_recruit_candidate')}>
                    <img src={images.logo} className={cx('avatar')} alt="avatar" />
                    <div className={cx('name')}>Hồ Duy Bảo</div>
                    <div className={cx('time')}>
                        <FontAwesomeIcon icon={faClock} style={{ marginRight: 5,color:"#00B4D8" }} />
                        2023-04-20
                    </div>
                </div>
                <div className={cx('item_recruit_candidate')}>
                    <img src={images.logo} className={cx('avatar')} alt="avatar" />
                    <div className={cx('name')}>Hồ Duy Bảo</div>
                    <div className={cx('time')}>
                        <FontAwesomeIcon icon={faClock} style={{ marginRight: 5,color:"#00B4D8" }} />
                        2023-04-20
                    </div>
                </div>
                <div className={cx('item_recruit_candidate')}>
                    <img src={images.logo} className={cx('avatar')} alt="avatar" />
                    <div className={cx('name')}>Hồ Duy Bảo</div>
                    <div className={cx('time')}>
                        <FontAwesomeIcon icon={faClock} style={{ marginRight: 5,color:"#00B4D8" }} />
                        2023-04-20
                    </div>
                </div>
                <div className={cx('item_recruit_candidate')}>
                    <img src={images.logo} className={cx('avatar')} alt="avatar" />
                    <div className={cx('name')}>Hồ Duy Bảo</div>
                    <div className={cx('time')}>
                        <FontAwesomeIcon icon={faClock} style={{ marginRight: 5,color:"#00B4D8" }} />
                        2023-04-20
                    </div>
                </div>
                <div className={cx('item_recruit_candidate')}>
                    <img src={images.logo} className={cx('avatar')} alt="avatar" />
                    <div className={cx('name')}>Hồ Duy Bảo</div>
                    <div className={cx('time')}>
                        <FontAwesomeIcon icon={faClock} style={{ marginRight: 5,color:"#00B4D8" }} />
                        2023-04-20
                    </div>
                </div>
                <div className={cx('item_recruit_candidate')}>
                    <img src={images.logo} className={cx('avatar')} alt="avatar" />
                    <div className={cx('name')}>Hồ Duy Bảo</div>
                    <div className={cx('time')}>
                        <FontAwesomeIcon icon={faClock} style={{ marginRight: 5,color:"#00B4D8" }} />
                        2023-04-20
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Candidate;
