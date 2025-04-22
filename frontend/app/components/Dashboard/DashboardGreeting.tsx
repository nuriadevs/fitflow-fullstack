// components/Dashboard/DashboardGreeting.tsx
type Props = {
    username: string
  }
  
  const DashboardGreeting = ({ username }: Props) => {
    return (
      <div className="px-4 py-6 sm:px-0 mt-20">
        <h1 className="text-2xl font-bold text-gray-900">
        Hello {username}, what would you like to do today?
        </h1>
      </div>
    )
  }
  
  export default DashboardGreeting
  