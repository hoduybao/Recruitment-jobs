import Header from '../components/Header';
import Footer from '../components/Footer';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Search from '../components/Search';
const cx = classNames.bind(styles);

const searchKeywords = [
    'Lập trình viên',
    'Phân tích viên',
    'Quản trị hệ thống',
    'Quản lý dự án',
    'Kỹ sư phần mềm',
    'Kiểm thử viên',
    'Quản trị cơ sở dữ liệu',
    'Quản lý mạng',
    'Thiết kế giao diện',
    'Chuyên gia bảo mật',
    'Kỹ sư trí tuệ nhân tạo',
    'Phát triển ứng dụng di động',
    'Quản lý dữ liệu',
    'Quản lý hệ thống',
    'Chuyên viên mạng',
    'Phát triển web',
    'Chuyên viên an toàn thông tin',
    'Quản lý dự án Agile',
    'Quản lý sản phẩm',
    'Chuyên viên truyền thông kỹ thuật',
    'Chuyên viên UX/UI',
    'Chuyên viên phân tích dữ liệu',
    'Quản lý chất lượng phần mềm',
    'Chuyên gia blockchain',
    'Quản lý cơ sở hạ tầng',
    'Chuyên gia IoT',
    'Quản lý quy trình phần mềm',
    'Chuyên gia DevOps',
    'Kỹ sư an ninh mạng',
    'JavaScript',
    'Python',
    'Java',
    'C++',
    'C#',
    'Ruby',
    'PHP',
    'Swift',
    'TypeScript',
    'Go',
    'Kotlin',
    'Rust',
    'Scala',
    'Perl',
    'Objective-C',
    'Lua',
    'MATLAB',
    'Haskell',
    'Shell',
    'HTML',
    'CSS',
    'Front-end',
    'Back-end',
    'Full Stack',
    'UI/UX Designer',
    'Web Designer',
    'Web',
    'JavaScript',
    'React',
    'Angular',
    'Vue.js',
    'Node.js',
    'PHP',
    'WordPress',
    'Shopify',
    'Magento',
    'E-commerce',
    'Ruby on Rails',
    'Python Web',
    'ASP.NET',
    'Java Web',
    'Mobile Web',
    'Web Application',
    'CMS',
    'Front-end',
    'Back-end',
    'Web Architect',
];
function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <Search lang={searchKeywords}/>
            {children}
            <Footer/>
        </div>
    );
}

export default DefaultLayout;
