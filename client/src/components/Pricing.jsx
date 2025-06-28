import React, { useState } from "react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      name: "Free",
      description: "Perfect for trying out our background removal tool",
      monthlyPrice: 0,
      yearlyPrice: 0,
      credits: 3,
      features: [
        { name: "Background removal", included: true },
        { name: "Standard quality exports", included: true },
        { name: "Maximum file size: 4MB", included: true },
        { name: "Credits expire after 30 days", included: true },
        { name: "HD exports", included: false },
        { name: "Batch processing", included: false },
      ],
      ctaText: "Start Free",
      popular: false,
    },
    {
      name: "Basic",
      description: "For individuals with regular background removal needs",
      monthlyPrice: 9.99,
      yearlyPrice: 99.99,
      credits: 50,
      features: [
        { name: "Background removal", included: true },
        { name: "HD quality exports", included: true },
        { name: "Maximum file size: 15MB", included: true },
        { name: "Credits rollover for 60 days", included: true },
        { name: "Batch processing (up to 5 images)", included: true },
        { name: "API access", included: false },
      ],
      ctaText: "Subscribe Now",
      popular: true,
    },
    {
      name: "Pro",
      description: "For professionals with advanced imaging needs",
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      credits: 150,
      features: [
        { name: "Background removal", included: true },
        { name: "Ultra HD quality exports", included: true },
        { name: "Maximum file size: 30MB", included: true },
        { name: "Credits rollover for 90 days", included: true },
        { name: "Batch processing (unlimited)", included: true },
        { name: "API access with 10,000 requests/mo", included: true },
      ],
      ctaText: "Get Pro",
      popular: false,
    },
  ];

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Choose the perfect plan for your background removal needs
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="relative bg-white dark:bg-gray-800 rounded-lg p-1 flex">
            <button
              type="button"
              className={`${
                billingCycle === "monthly"
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400"
              } rounded-md py-2 px-4 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly billing
            </button>
            <button
              type="button"
              className={`${
                billingCycle === "yearly"
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400"
              } ml-1 rounded-md py-2 px-4 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10`}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly billing
              <span className="ml-1.5 py-0.5 px-2 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Save 16%
              </span>
            </button>
          </div>
        </div>

        <div className="mt-12 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm divide-y divide-gray-200 dark:divide-gray-700 ${
                plan.popular
                  ? "border-blue-500 dark:border-blue-500 ring-2 ring-blue-500"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute inset-x-0 top-0 transform -translate-y-1/2">
                  <div className="inline-block px-4 py-1 text-sm font-semibold tracking-wider uppercase bg-blue-600 text-white rounded-full">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {plan.description}
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                    $
                    {billingCycle === "monthly"
                      ? plan.monthlyPrice
                      : plan.yearlyPrice}
                  </span>
                  <span className="text-base font-medium text-gray-500 dark:text-gray-400">
                    {plan.monthlyPrice > 0
                      ? `/${billingCycle === "monthly" ? "mo" : "year"}`
                      : ""}
                  </span>
                </p>
                <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">
                  {plan.credits} credits{" "}
                  {billingCycle === "monthly" ? "per month" : "per month (x12)"}
                </p>
                <Link
                  to={plan.name === "Free" ? "/sign-up" : "/checkout"}
                  className={`mt-8 block w-full py-3 px-6 rounded-md shadow text-center text-sm font-medium ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                  }`}
                >
                  {plan.ctaText}
                </Link>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  What's included
                </h4>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex">
                      {feature.included ? (
                        <svg
                          className="flex-shrink-0 h-5 w-5 text-green-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="flex-shrink-0 h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      <span
                        className={`ml-3 text-sm ${
                          feature.included
                            ? "text-gray-700 dark:text-gray-300"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-base text-gray-500 dark:text-gray-400">
            Need a custom solution?
          </p>
          <Link
            to="/custom-plan"
            className="mt-2 inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
          >
            <span>Build your own custom plan</span>
            <svg
              className="ml-2 w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
