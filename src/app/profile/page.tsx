/* eslint-disable @next/next/no-img-element */

"use client";

import { useState } from "react";
import Header from "../../components/Header";
import MobileBottomNav from "../../components/MobileBottomNav";

export default function Profile() {
  const [user] = useState({
    name: "Ahmed Rahman",
    email: "ahmed.rahman@email.com",
    phone: "+880 1712-345678",
    location: "Khulna, Bangladesh",
    joinDate: "January 2024",
    avatar:
      "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20young%20Bangladeshi%20man%20in%20business%20attire%2C%20friendly%20smile%2C%20modern%20portrait%20photography%2C%20clean%20background&width=200&height=200&seq=profile-avatar&orientation=squarish",
  });

  const [myProperties] = useState([
    {
      id: 1,
      title: "Modern Family Apartment",
      location: "Nirala",
      rent: 25000,
      status: "Available",
      image:
        "https://readdy.ai/api/search-image?query=Modern%20family%20apartment%20living%20room%20with%20contemporary%20furniture%20and%20decor&width=300&height=200&seq=my-prop-1&orientation=landscape",
    },
    {
      id: 2,
      title: "Bachelor Studio",
      location: "Sonadanga",
      rent: 15000,
      status: "Rented",
      image:
        "https://readdy.ai/api/search-image?query=Cozy%20bachelor%20studio%20apartment%20interior%20design&width=300&height=200&seq=my-prop-2&orientation=landscape",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 md:pb-0">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-12">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
              <img
                src={user.avatar}
                alt="Profile"
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {user.name}
              </h1>
              <div className="space-y-2 text-gray-600 dark:text-gray-400">
                <div className="flex items-center justify-center md:justify-start">
                  <i className="ri-mail-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <i className="ri-phone-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  <span className="text-sm">{user.phone}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  <span className="text-sm">{user.location}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <i className="ri-calendar-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  <span className="text-sm">Joined {user.joinDate}</span>
                </div>
              </div>
            </div>

            <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 cursor-pointer whitespace-nowrap">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
              2
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Properties
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
              1
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Rented
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              1
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Available
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
              15k
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Avg Rent
            </div>
          </div>
        </div>

        {/* My Properties */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              My Properties
            </h2>
            <button className="px-4 py-2 bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/40 transition-colors cursor-pointer whitespace-nowrap">
              Add New
            </button>
          </div>

          <div className="space-y-4">
            {myProperties.map((property) => (
              <div
                key={property.id}
                className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="w-full md:w-32 h-32 md:h-24 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {property.title}
                  </h3>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <div className="flex items-center">
                      <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center mr-1"></i>
                      <span>{property.location}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-money-dollar-circle-line w-4 h-4 flex items-center justify-center mr-1"></i>
                      <span>৳{property.rent.toLocaleString()}/month</span>
                    </div>
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        property.status === "Available"
                          ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                          : "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                      }`}
                    >
                      {property.status}
                    </span>
                  </div>
                </div>

                <div className="flex md:flex-col gap-2">
                  <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer whitespace-nowrap">
                    Edit
                  </button>
                  <button className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors cursor-pointer whitespace-nowrap">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
