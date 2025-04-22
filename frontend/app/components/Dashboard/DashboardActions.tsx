'use client'

import Link from 'next/link'
import Card from '../ui/Card/Card'

const DashboardActions = () => {
  const actions = [
    {
      href: '/exercises',
      title: 'My Workouts',
      description: 'View and manage your workouts',
    },
    {
      href: '/chat',
      title: 'Chat with AI',
      description: 'Get personalized tips',
    },
    {
      href: '/profile',
      title: 'My Profile',
      description: 'View and edit your profile',
    },
  ]
  

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map(({ href, title, description }) => (
          <Card
            key={href}
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <Link href={href}>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                <p className="mt-1 text-sm text-gray-500">{description}</p>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default DashboardActions
