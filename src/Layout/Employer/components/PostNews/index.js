function PostNews() {
    return (
        <div id="content_edit_news_home_recruit">
            <div id="text_edit_news">Thêm tin tuyển dụng</div>
            <div id="please_enter_edit">Vui lòng nhập thông tin cần thiết</div>
            <form action="/employer/post_add_recruitment" method="POST">
                <div id="label_title">Tiêu đề</div>
                <input
                    type="text"
                    name="title_recruitment"
                    id="title_edit_news"
                    required
                    placeholder="Nhập tiêu đề tin tuyển dụng"
                />

                <div id="text_info_general">Thông tin chung</div>
                <div id="salary_edit_news">Mức lương</div>
                <input
                    type="number"
                    name="min_salary_recruitment"
                    id="min_salary_edit_news"
                    required
                    placeholder="Tối thiểu"
                />
                <div id="line_edit_news"></div>
                <input
                    type="number"
                    name="max_salary_recruitment"
                    id="max_salary_edit_news"
                    required
                    placeholder="Tối đa"
                />

                <div id="text_quantity_edit_news">Số lượng</div>
                <input
                    type="number"
                    name="quantity_recruitment"
                    id="quantity_edit_news"
                    required
                    placeholder="Số lượng"
                />

                <div id="text_method_word_edit_news">Hình thức làm việc</div>
                <select name="method_work_recruitment" id="method_work_edit_news" required="">
                    <option disabled selected value>
                        Hình thức làm việc
                    </option>
                    <option value="Full Time" class="op_select_method_work">
                        Full Time
                    </option>
                    <option value="Part Time" class="op_select_method_work">
                        Part Time
                    </option>
                    <option value="Remote" class="op_select_method_work">
                        Remote
                    </option>
                </select>

                <div id="text_sex_edit_news">Giới tính</div>
                <select name="sex_recruitment" id="sex_edit_news" required="">
                    <option disabled selected value>
                        Giới tính
                    </option>
                    <option value="Khác" class="op_select_method_work">
                        Không yêu cầu
                    </option>
                    <option value="Nam" class="op_select_method_work">
                        Nam
                    </option>
                    <option value="Nữ" class="op_select_method_work">
                        Nữ
                    </option>
                </select>

                <div id="text_experience_edit_news">Kinh nghiệm</div>

                <select name="experience_recruitment" id="experience_edit_news" required="">
                    <option disabled selected value>
                        Kinh nghiệm
                    </option>
                    <option value="0" class="op_select_method_work">
                        Không yêu cầu
                    </option>
                    <option value="1" class="op_select_method_work">
                        Ít nhất 1 năm
                    </option>
                    <option value="2" class="op_select_method_work">
                        Ít nhất 2 năm
                    </option>
                    <option value="3" class="op_select_method_work">
                        Ít nhất 3 năm
                    </option>
                </select>

                <div id="text_deadline_submit_record_edit_news">Hạn nộp hồ sơ</div>
                <input
                    type="date"
                    name="deadline_submit_record_recruitment"
                    id="deadline_submit_record_edit_news"
                    required
                    placeholder="Hạn nộp hồ sơ"
                />

                <div id="text_work_locatio_edit_news">Địa điểm làm việc</div>
                <input
                    type="text"
                    name="word_location_recruitment"
                    id="word_location_edit_news"
                    required
                    placeholder="Nhập địa điểm làm việc"
                />

                <div id="text_job_describe">Mô tả công việc</div>
                <textarea type="text" name="job_describe_recruitment" id="job_describe_edit_news" required></textarea>

                <div id="text_require_candidate_edit_news">Yêu cầu ứng viên</div>
                <textarea
                    type="text"
                    name="require_candidate_recruitment"
                    id="require_candidate_edit_news"
                    required
                ></textarea>

                <div id="text_benefit_edit_news">Quyền lợi</div>
                <textarea type="text" name="benefit_recruitment" id="benefit_edit_news" required></textarea>

                <input type="submit" id="submit_edit_news" value="Xác nhận tạo" />
            </form>
            <a id="cancle_edit_news" href="/employer/manage_recruitments">
                Hủy bỏ
            </a>
        </div>
    );
}

export default PostNews;
