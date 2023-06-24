import classNames from 'classnames/bind';
import styles from './ListCandidate.module.scss';
import Candidate from '../Candidate';
import Profile from '~/pages/Profile';
import { useEffect, useState } from 'react';
import UserService from '~/utils/request';
import { useLocation } from 'react-router-dom';
import Loading from '~/Layout/components/Loading';
const cx = classNames.bind(styles);

function ListCandidate() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id_job = params.get('id_job');

    const [listCV, setListCV] = useState([]);
    const [candidate, setCandidate] = useState({});
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const fetch = async () => {
            let response = await UserService.getUser(`/employer/getCV?id=${id_job}`);
            console.log(response.data);
            if (response.status === 'ok') {
                setListCV(response.data);
                setCandidate({
                    id: response.data[0].id,
                    avatar: response.data[0].avatarCandidate,
                    fullName: response.data[0].name,
                    cv: response.data[0].fileCV,
                    introduce: response.data[0].introLetter,
                });
                setLoading(false);
            } else {
                setListCV([]);
                setCandidate({});
                setLoading(false);
            }
        };
        fetch();
    }, [id_job]);
    const handleClick = (id) => {
        const data = listCV[id];
        setCandidate({
            id: data.id,
            avatar: data.avatarCandidate,
            fullName: data.name,
            cv: data.fileCV,
            introduce: data.introLetter,
        });
    };
    const handleAccept = () => {
        console.log(candidate.id);
        const fetch = async () => {
            let response = await UserService.setStatusCV(`employer/setStatusCV?status=pass&id=${candidate.id}`);
            console.log(response);
        };
        fetch();
    };
    const handleReject = () => {
        const fetch = async () => {
            let response = await UserService.setStatusCV(`employer/setStatusCV?status=reject&id=${candidate.id}`);
            console.log(response);
        };
        fetch();    };
    return (
        <div className={cx('wrapper')}>
            {isLoading ? (
                <Loading name="load" />
            ) : listCV.length > 0 ? (
                <div className={cx('inner')}>
                    <Candidate list={listCV} click={handleClick} />
                    <Profile employer={true} inforCV={candidate} accept={handleAccept} reject={handleReject} />
                </div>
            ) : (
                <div className={cx('not_cv')}>Chưa có ứng viên nào ứng tuyển</div>
            )}
        </div>
    );
}

export default ListCandidate;
