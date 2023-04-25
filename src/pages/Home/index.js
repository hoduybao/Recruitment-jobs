import classNames  from "classnames/bind";
import styles from './Home.module.scss'

const cx=classNames.bind(styles);

function Home() {
    return (
            <div className={cx("wrapper")}>
                <div className={cx("inner")}>
                    <div className={cx("text_top_job")}>
                        Top nhà tuyển dụng được quan tâm nhất
                    </div>
                   

                    <div class="d-flex flex-wrap card_company_searched_candidate">

                    </div>
                </div>
            </div>
    );
}

export default Home;
