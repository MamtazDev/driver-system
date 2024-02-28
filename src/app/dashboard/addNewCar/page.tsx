import AddNewCar from '@/components/AddNewCar/AddNewCar'
import RequireAuth from '@/hooks/RequireAuth'

const addNewCar = () => {
    return (
        <><AddNewCar /></>
    )
}

export default RequireAuth(addNewCar)