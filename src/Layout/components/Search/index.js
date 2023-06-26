import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '../hooks';
import { Wrapper as PopperWrapper } from '~/Layout/components/Popper';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import React from 'react';
const cx = classNames.bind(styles);

function Search({ lang }) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [widthTip, setWidthTip] = useState('');
    const [address, setAddress] = useState('');
    const debounced = useDebounce(searchValue, 400);
    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        } else {
            var text = debounced.trim();
            let suggestion = [];
            suggestion = lang.sort().filter((e) => e.toLowerCase().includes(text.toLowerCase()));

            setSearchResult(suggestion.slice(0, 5));
        }
    }, [debounced, lang]);

    const handleHideResult = () => {
        setShowResult(false);
    };
    const contentRef = useRef(null);

    useEffect(() => {
        const targetElement = contentRef.current;
        // Access the target element here and perform actions
        //console.log(targetElement.offsetWidth);

        // Example: Start observing the target element for width changes
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const newWidth = entry.contentRect.width + 18;
                var width = newWidth + 'px';

                setWidthTip(width);
                // container.styles.widt
                // Perform additional actions based on the width change
            }
        });
        resizeObserver.observe(targetElement);

        // Clean up
        return () => {
            resizeObserver.unobserve(targetElement);
        };
    }, []);
    const search = () => {
        var text = debounced.trim();
        window.location.href = `/search-job?text=${text}&address=${address}`;
    };
    const handleClickSearch = (value) => {
        window.location.href = `/search-job?text=${value}&address=${address}`;
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            search();
        }
    };
    const urlProvice = 'https://provinces.open-api.vn/api/';
    const [provinces, setProvinces] = useState([]);
    useEffect(() => {
        fetch(urlProvice)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setProvinces(data);
            })
            .catch(function (error) {
                console.log(error);
            });
    });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('title_welcome')}>
                    Chào mừng bạn đến với <span className={cx('name_web')}>&nbsp;JORE&nbsp;</span> !
                </div>

                <div className={cx('inner-top')}>
                    <HeadlessTippy
                        interactive
                        placement="bottom"
                        visible={showResult && searchResult.length > 0} //ẩn hiện
                        render={(attrs) => (
                            <div className={cx('search-result')} style={{ width: widthTip }} tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                    <h3 className={cx('search-title')}>Việc làm</h3>
                                    {searchResult.map((result, index) => (
                                        <div
                                            key={index}
                                            className={cx('item_result')}
                                            onClick={() => handleClickSearch(result)}
                                        >
                                            {result}
                                        </div>
                                    ))}
                                </PopperWrapper>
                            </div>
                        )}
                        onClickOutside={handleHideResult}
                    >
                        <div className={cx('search-input')} ref={contentRef}>
                            <input
                                type="search"
                                placeholder="Tìm công việc"
                                spellCheck={false}
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onFocus={(e) => {
                                    setShowResult(true);
                                }}
                                onKeyPress={handleKeyPress}
                            />

                            <div className={cx('search-btn')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </div>
                        </div>
                    </HeadlessTippy>

                    <div className={cx('search-province')}>
                        <FontAwesomeIcon className={cx('icon-province')} icon={faLocationDot} />
                        <select
                            name="select_province"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className={cx('select_province_candidate')}
                        >
                            <option value="">Tất cả</option>

                            {provinces.map((province) => (
                                <option value={province.name}>{province.name}</option>
                            ))}
                        </select>
                    </div>
                    <button className={cx('btn_search_candidate')} onClick={search}>
                        Tìm kiếm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Search);
