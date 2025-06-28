import React from "react";
import CustomPlanBuilder from "../components/CustomPlanBuilder";

const CustomPlanPage = () => {
  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Create Your Custom Plan
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Build a plan that fits your exact needs with our flexible options
          </p>
        </div>

        <CustomPlanBuilder />

        <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                How do custom plans work?
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Custom plans allow you to select the exact number of credits and
                features you need. You'll only pay for what you actually use,
                making it perfect for users with specific requirements.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Can I change my plan later?
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Yes! You can upgrade, downgrade, or modify your custom plan at
                any time. Changes will take effect at the start of your next
                billing cycle.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                What happens if I run out of credits?
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                You can purchase additional credit packs at any time without
                changing your plan. Alternatively, you can wait until your next
                billing cycle when your credits will refresh.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Is there a minimum commitment period?
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                No, all our plans including custom plans are billed monthly or
                yearly with no long-term commitment. You can cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPlanPage;
