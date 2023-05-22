import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faHouseLaptop, faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import * as request from '~/utils/request';
import { useEffect, useState } from 'react';
import { useDebounce } from '../hooks';
import { Wrapper as PopperWrapper } from '~/Layout/components/Popper';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);

    const debounced = useDebounce(searchValue, 400);
    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }
        request
            .get(`users/search`, {
                params: {
                    q: debounced,
                    type: 'less',
                },
            })
            .then((res) => {
                //  console.log(res.data.data)
                setSearchResult(res.data);
            });
    }, [debounced]);

    const handleHideResult = () => {
        setShowResult(false);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('inner-top')}>
                    {/* <div className={cx('search-input')}>
                        <input placeholder="Tìm công việc" spellCheck={false} />
                        <div className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                    </div> */}

                    <HeadlessTippy
                        interactive //select
                        visible={showResult && searchResult.length > 0} //ẩn hiện
                        render={(attrs) => (
                            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                    <h3 className={cx('search-title')}>Việc làm</h3>
                                    {searchResult.map((result) => (
                                        <div className={cx('item_result')}>{result.id}</div>
                                    ))}
                                </PopperWrapper>
                            </div>
                        )}
                        onClickOutside={handleHideResult}
                    >
                        <div className={cx('search-input')}>
                            <input
                            type='search'
                                placeholder="Tìm công việc"
                                spellCheck={false}
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onFocus={() => setShowResult(true)}
                            />
                            <div className={cx('search-btn')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </div>
                        </div>
                    </HeadlessTippy>

                    <div className={cx('search-province')}>
                        <FontAwesomeIcon className={cx('icon-province')} icon={faLocationDot} />
                        <select name="select_province" className={cx('select_province_candidate')}>
                            <option value="" disabled selected>
                                Địa điểm
                            </option>
                            <option value="0">Tất cả</option>
                            <option value="1">Hồ Chí Minh</option>
                            <option value="2">Hà Nội</option>
                            <option value="3">Đà Nẵng</option>
                        </select>
                    </div>
                    <button className={cx('btn_search_candidate')} onclick="search()">
                        Tìm kiếm
                    </button>
                </div>

                <div className={cx('inner-bottom')}>
                    <div className={cx('search-province')}>
                        <FontAwesomeIcon className={cx('icon-province')} icon={faHouseLaptop} />
                        <select name="select_province" className={cx('select_work_form_candidate')}>
                            <option value="" disabled selected>
                                Hình thức làm việc
                            </option>
                            <option value="0">Tất cả</option>
                            <option value="1">Remote</option>
                            <option value="2">At office </option>
                            <option value="3">Hybrid</option>
                        </select>
                    </div>
                    <div className={cx('search-province')}>
                        <FontAwesomeIcon className={cx('icon-province')} icon={faBriefcase} />
                        <select name="select_experience" className={cx('select_experience')}>
                            <option value="100" disabled selected>
                                Kinh nghiệm
                            </option>
                            <option value="0">Chưa có</option>
                            <option value="1">1 năm</option>
                            <option value="2">2 năm</option>
                            <option value="3">3 năm</option>
                            <option value="4">Hơn 3 năm</option>
                        </select>
                    </div>
                    <div className={cx('search-province')}>
                        <FontAwesomeIcon className={cx('icon-province')} icon={faBriefcase} />
                        <select name="select_salary" className={cx('select_salary')}>
                            <option value="100" disabled selected>
                                Mức lương
                            </option>
                            <option value="5">&#8805; 5 triệu</option>
                            <option value="10">&#8805; 10 triệu</option>
                            <option value="15">&#8805; 15 triệu</option>
                            <option value="20">&#8805; 20 triệu</option>
                            <option value="100">Tất cả</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
