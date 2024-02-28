import AddDriver from '@/components/AddDriver/AddDriver'
import RequireAuth from '@/hooks/RequireAuth'

const addDriver = () => {
  return (
    <><AddDriver /></>
  )
}

export default RequireAuth(addDriver)