import classNames from 'classnames/bind';
import styles from './Candidate.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Candidate( props ) {

    const handleClick=(data)=>{
        props.click(data);
    }
    const convertDate = (time) => {
        const dateTime = new Date(time);
        var date = dateTime.getDate();
        var month = dateTime.getMonth() + 1; // Months are zero-based, so we add 1
        if(month.toString().length===1)
        {
            month="0"+month;
        }
        if(date.toString().length===1)
        {
            date="0"+date;
        }
        const year = dateTime.getFullYear();
        return date + '-' + month + '-' + year;
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title_quantity')}>
                <span className={cx('quantity')}>{props.list.length}</span> hồ sơ đã nộp
            </div>
            <div className={cx('line')}></div>
            <div className={cx('d-flex', 'flex-wrap', 'card_company_home')}>
                {props.list.map((item, index) => (
                    <div className={cx('item_recruit_candidate')} onClick={()=>handleClick(index)} key={index}>
                        <img src={item.avatarCandidate} className={cx('avatar')} alt="avatar" />
                        <div className={cx('name')}>{item.name} </div>
                        <div className={cx('time')}>
                            <FontAwesomeIcon icon={faClock} style={{ marginRight: 5, color: '#00B4D8' }} />
                            {convertDate(item.dateCreated)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Candidate;
