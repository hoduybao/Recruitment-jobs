import { FadeLoader } from 'react-spinners';
import classNames from 'classnames/bind';
import styles from './Loading.module.scss'

const cx=classNames.bind(styles);
function Loading({name}) {
    return (
        <div className={cx("loading-spinner",name)}>
            <FadeLoader color="#21c2e2" height={10} width={4} />
        </div>
    );
}

export default Loading;
