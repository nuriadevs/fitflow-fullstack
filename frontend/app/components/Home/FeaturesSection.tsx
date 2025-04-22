// components/Home/FeaturesSection.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faRobot, faChartBar } from '@fortawesome/free-solid-svg-icons';

const FeaturesSection = () => {
 return (
  <section className="py-12 bg-white">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">
     <h2 className="text-3xl font-extrabold text-[#545454] sm:text-4xl">App Features</h2>
     <p className="mt-4 text-lg text-gray-500">Everything you need for your fitness journey</p>
    </div>

    <div className="mt-10">
     <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {/* Feature 1 */}
      <div className="bg-gray-50 p-6 rounded-lg">
       <div className="text-4xl mb-4 text-[#ff5757]">
        <FontAwesomeIcon icon={faDumbbell} />
       </div>
       <h3 className="text-lg font-medium text-gray-900">Personalized Workouts</h3>
       <p className="mt-2 text-gray-500">
        Get exercise recommendations based on your goals and fitness level.
       </p>
      </div>

      {/* Feature 2 */}
      <div className="bg-gray-50 p-6 rounded-lg">
       <div className="text-4xl mb-4 text-[#ff5757]">
        <FontAwesomeIcon icon={faRobot} />
       </div>
       <h3 className="text-lg font-medium text-gray-900">AI Assistant</h3>
       <p className="mt-2 text-gray-500">
        Chat with our AI assistant for tips and answers to your fitness questions.
       </p>
      </div>

      {/* Feature 3 */}
      <div className="bg-gray-50 p-6 rounded-lg">
       <div className="text-4xl mb-4 text-[#ff5757]">
        <FontAwesomeIcon icon={faChartBar} />
       </div>
       <h3 className="text-lg font-medium text-gray-900">Progress Tracking</h3>
       <p className="mt-2 text-gray-500">
        Log and visualize your progress over time to stay motivated.
       </p>
      </div>
     </div>
    </div>
   </div>
  </section>
 );
};

export default FeaturesSection;
