import './table.scss'
import Image from 'next/image'
import Filter from '../../../public/assets/Filter.svg'
import { LiveCarStatusData } from '../../types/liveCarStatusData';

interface TableProps {
    tableTitle: string;
    colTitle1: string;
    colTitle2: string;
    colTitle3: string;
    colTitle4: string;
    colTitle5: string;
    colTitle6: string;
    data: LiveCarStatusData[];
}

const Table: React.FC<TableProps> = ({ tableTitle, data, colTitle1, colTitle2, colTitle3, colTitle4, colTitle5, colTitle6 }) => {  
    
    const statusImages: Record<string, string> = {
        Completed: 'Completed.svg',
        Pending: 'Pending.svg',
        'In Route': 'InRoute.svg',
    };
    
    return (
    <div className='table-component'>
        <div className="table-header">
            <h4>{tableTitle}</h4>
            <div className="filter">
                <Image src={Filter} alt="Icon" />
                Filter
            </div>
        </div>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>{colTitle1}</th>
                        <th>{colTitle2}</th>
                        <th>{colTitle3}</th>
                        <th>{colTitle4}</th>
                        <th>{colTitle5}</th>
                        <th>{colTitle6}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((liveCarStatsData, index) => (
                        <tr key={liveCarStatsData.id}>
                            <td className='p5'>{(index + 1).toString().padStart(2, '0')}</td>
                            <td><span className='carNo p5'>{liveCarStatsData.carNo}</span></td>
                            <td className='driver'>
                                <Image src={`/assets/${liveCarStatsData.profilePic}`} alt="Profile Pic" width={24} height={24} />
                                {liveCarStatsData.driver}
                                </td>
                            <td>
                                <div className="status p4">
                                    <Image src={`/assets/${statusImages[liveCarStatsData.status]}`} alt="Status icon" width={16} height={16} />
                                    {liveCarStatsData.status}
                                </div>
                            </td>
                            <td className='p4'>$ {liveCarStatsData.earning.toFixed(2)}</td>
                            <td className='details'><button>Details</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Table