import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import UserService from '~/utils/request';
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
        
        UserService
            .searchJob(`job/search?text=&address=`, {
                params: {
                    q: debounced,
                    type: 'less',
                },
            })
            .then((res) => {
                console.log(res.data.data);
                setSearchResult(res.data);
            });
    }, [debounced]);

    const handleHideResult = () => {
        setShowResult(false);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('title_welcome')}>
                    Chào mừng bạn đến với <span className={cx('name_web')}>&nbsp;JORE&nbsp;</span> !
                </div>

                <div className={cx('inner-top')}>
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
                                type="search"
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
            </div>
        </div>
    );
}

export default Search;
