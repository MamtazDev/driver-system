import Link from 'next/link'
interface BreadCrumbProps {
  title1: string;
  title2: string;
}
const BreadCrumb: React.FC<BreadCrumbProps> = ({ title1, title2 }) => {
  return (
    <div className='flex items-center gap-3 mb-5'>
      <Link href="/dashboard">
        dashboard
      </Link>
      <p> &gt; </p>
      <Link href="/dashboard/drivers">
        {title1}
      </Link>
      <p> &gt; </p>
      <Link href="/">
        {title2}
      </Link>
    </div>
  )
}

export default BreadCrumb
