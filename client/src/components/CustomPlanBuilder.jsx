import React, { useState } from "react";

const CustomPlanBuilder = () => {
  const [credits, setCredits] = useState(50);
  const [planName, setPlanName] = useState("My Custom Plan");
  const [selectedFeatures, setSelectedFeatures] = useState([
    "background-removal",
    "hd-quality",
  ]);
  const [totalPrice, setTotalPrice] = useState(5);

  // Available features
  const features = [
    {
      id: "background-removal",
      name: "Background Removal",
      description: "Remove backgrounds from images",
      included: true,
      price: 0,
    },
    {
      id: "hd-quality",
      name: "HD Quality",
      description: "Process images in high definition",
      included: true,
      price: 0,
    },
    {
      id: "batch-processing",
      name: "Batch Processing",
      description: "Process multiple images at once",
      included: false,
      price: 3,
    },
    {
      id: "background-replacement",
      name: "Background Replacement",
      description: "Replace with custom backgrounds",
      included: false,
      price: 2,
    },
    {
      id: "api-access",
      name: "API Access",
      description: "Integrate with your applications",
      included: false,
      price: 10,
    },
  ];

  // Credit packages
  const creditOptions = [
    { amount: 10, price: 1.99 },
    { amount: 50, price: 5.99 },
    { amount: 100, price: 9.99 },
    { amount: 250, price: 19.99 },
    { amount: 500, price: 34.99 },
    { amount: 1000, price: 59.99 },
  ];

  const handleCreditChange = (e) => {
    const creditAmount = parseInt(e.target.value);
    setCredits(creditAmount);
    calculatePrice(creditAmount, selectedFeatures);
  };

  const toggleFeature = (featureId) => {
    let newFeatures;
    if (selectedFeatures.includes(featureId)) {
      newFeatures = selectedFeatures.filter((id) => id !== featureId);
    } else {
      newFeatures = [...selectedFeatures, featureId];
    }
    setSelectedFeatures(newFeatures);
    calculatePrice(credits, newFeatures);
  };

  const calculatePrice = (creditsAmount, features) => {
    // Find closest credit package
    const basePackage = creditOptions.reduce((prev, curr) =>
      Math.abs(curr.amount - creditsAmount) <
      Math.abs(prev.amount - creditsAmount)
        ? curr
        : prev
    );

    // Calculate price for additional features
    const featuresPrice = features
      .filter((id) => !["background-removal", "hd-quality"].includes(id))
      .reduce((total, id) => {
        const feature = findFeatureById(id);
        return total + (feature ? feature.price : 0);
      }, 0);

    setTotalPrice((basePackage.price + featuresPrice).toFixed(2));
  };

  const findFeatureById = (id) => {
    return features.find((feature) => feature.id === id);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Create Your Custom Plan
      </h2>

      <div className="mb-6">
        <label
          htmlFor="planName"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Plan Name
        </label>
        <input
          type="text"
          id="planName"
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          aria-label="Plan name"
        />
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
          Choose Credits
        </h3>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">
              Credits: {credits}
            </span>
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              $
              {creditOptions
                .find((option) => option.amount >= credits)
                ?.price.toFixed(2) ||
                creditOptions[creditOptions.length - 1].price.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="1000"
            step="10"
            value={credits}
            onChange={handleCreditChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>10</span>
            <span>250</span>
            <span>500</span>
            <span>1000</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
          Select Features
        </h3>
        <div className="space-y-3">
          {features.map((feature) => (
            <div key={feature.id} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={feature.id}
                  type="checkbox"
                  checked={selectedFeatures.includes(feature.id)}
                  onChange={() => toggleFeature(feature.id)}
                  disabled={feature.included}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor={feature.id}
                  className="font-medium text-gray-700 dark:text-gray-300"
                >
                  {feature.name}{" "}
                  {feature.included && (
                    <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded ml-2">
                      Included
                    </span>
                  )}
                  {!feature.included && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                      +${feature.price}/mo
                    </span>
                  )}
                </label>
                <p className="text-gray-500 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Total Monthly Price:
          </h3>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ${totalPrice}
          </span>
        </div>
      </div>

      <button
        type="button"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
      >
        Subscribe to Custom Plan
      </button>
    </div>
  );
};

export default CustomPlanBuilder;
