import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faCheckToSlot, faFileMedical } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import UserService from '~/utils/request';
import { useState } from 'react';
import {
    PieChart,
    Pie,
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    ResponsiveContainer,
    Bar,
    Cell,
} from 'recharts';
const cx = classNames.bind(styles);

function Home() {
    const colors = ['#82ca9d', '#8884d8', '#FFBB28'];

    const user = localStorage.getItem('user');
    const [chart, setChart] = useState([]);
   
    useEffect(() => {
        const fetch = async () => {
            let response = await UserService.getUser('/employer/analys');
            console.log(response.data);
            var data = [];
            data.push({ name: 'Cần tuyển', value: response.data.vacancy });
            data.push({ name: 'Nộp hồ sơ', value: response.data.submited });
            data.push({ name: 'Trúng tuyển', value: response.data.passed });
            setChart(data);
        };
        fetch();
    }, [user]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <ResponsiveContainer width="70%" height="70%">
                    <BarChart className={cx("chart")}
                        width={500}
                        height={300}
                        data={chart}
                        margin={{
                            top: 0,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        barSize={40}
                    >
                        <XAxis dataKey="name" scale="point" padding={{ left: 150, right: 150 }} />
                        <YAxis label={{ value: 'Số nhân viên', angle: -90, position: 'insideLeft' }}/>
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" background={{ fill: '#eee' }}>
                            {chart.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
                <div className={cx("title_chart")}>Biểu đồ đánh giá hiệu quả tuyển dụng của công ty</div>
               
            </div>
        </div>
    );
}

export default Home;
