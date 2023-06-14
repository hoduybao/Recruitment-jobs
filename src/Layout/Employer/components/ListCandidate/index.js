import classNames from 'classnames/bind';
import styles from './ListCandidate.module.scss';
import Candidate from '../Candidate';
import Profile from '~/pages/Profile';
import { useEffect, useState } from 'react';
import UserService from '~/utils/request';
import { useLocation } from 'react-router-dom';
const cx = classNames.bind(styles);

function ListCandidate() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id_job = params.get('id_job');

    const [listCV, setListCV] = useState([]);
    const [candidate, setCandidate] = useState({});
    useEffect(() => {
        const fetch = async () => {
            let response = await UserService.getUser(`/employer/getCV?id=${id_job}`);
            console.log(response.data);
            if (response.status === 'ok') {
                setListCV(response.data);
                setCandidate({
                    avatar: response.data[0].avatarCandidate,
                    fullName: response.data[0].name,
                    cv: response.data[0].fileCV,
                    introduce: response.data[0].introLetter,
                });
            } else {
                setListCV([]);
                setCandidate();
            }
        };
        fetch();
    }, [id_job]);
    const handleClick = (id) => {
        const data = listCV[id];
        setCandidate({
            avatar: data.avatarCandidate,
            fullName: data.name,
            cv: data.fileCV,
            introduce: data.introLetter,
        });
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Candidate list={listCV} click={handleClick} />
                <Profile employer={true} inforCV={candidate} />
            </div>
        </div>
    );
}

export default ListCandidate;
