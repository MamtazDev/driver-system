import Image from 'next/image';
import './statisticsCard.scss'

interface StatisticsCardProps {
  title: string;
  hiredPercentage: number;
  hiredPercentageIcon: string;
  canceledPercentage: number;
  canceledPercentageIcon: string;
  pendingPercentage: number;
  pendingPercentageIcon: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ title, hiredPercentage, hiredPercentageIcon, canceledPercentage, canceledPercentageIcon, pendingPercentage, pendingPercentageIcon }) => {

    return (
        <div className='statistics-card'>
            <div className="upper">
                <h3>{title}</h3>
                <span className='p5'>Today</span>
            </div>
            <div className="lower">
                <div className="total">
                    <div className="title">
                        <div className="ellipse hired"></div>
                        Total Hired
                    </div>
                    <div className="percent">
                        {hiredPercentage}%
                        <Image src={hiredPercentageIcon} alt="Icon" />
                    </div>
                </div>
                <div className="total">
                    <div className="title">
                        <div className="ellipse canceled"></div>
                        Total Canceled
                    </div>
                    <div className="percent">
                        {canceledPercentage}%
                        <Image src={canceledPercentageIcon} alt="Icon" />
                    </div>
                </div>
                <div className="total">
                    <div className="title">
                        <div className="ellipse pending"></div>
                        Total Pending
                    </div>
                    <div className="percent">
                        {pendingPercentage}%
                        <Image src={pendingPercentageIcon} alt="Icon" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatisticsCard