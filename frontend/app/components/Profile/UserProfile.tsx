type UserProfileProps = {
    username: string
    email: string
  }
  
  const UserProfile = ({ username, email }: UserProfileProps) => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <p className="mt-1 text-lg text-gray-900">{username}</p>
      </div>
  
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <p className="mt-1 text-lg text-gray-900">{email}</p>
      </div>
    </div>
  )
  
  export default UserProfile
  