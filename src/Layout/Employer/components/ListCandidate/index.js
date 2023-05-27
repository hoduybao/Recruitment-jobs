import classNames from 'classnames/bind';
import styles from './ListCandidate.module.scss';
import Candidate from '../Candidate';
import Profile from '~/pages/Profile';
const cx = classNames.bind(styles);

function ListCandidate() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Candidate/>
                <Profile employer={true}/>
            </div>
        </div>
    );
}

export default ListCandidate;
