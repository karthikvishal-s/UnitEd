export function FeatureCard({ title, description, icon }) {
    return (
      <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
        <div className="text-indigo-600 mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-indigo-900 mb-3">{title}</h3>
        <p className="text-gray-600 text-center">{description}</p>
      </div>
    );
  }