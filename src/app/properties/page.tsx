"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import SearchFilters from "../../components/SearchFilters";
import PropertyGrid from "../../components/PropertyGrid";
import MobileBottomNav from "../../components/MobileBottomNav";
import Footer from "../../components/Footer";

const sampleProperties = [
  {
    id: 1,
    title: "Office Unit Rent",
    location: "Nirala",
    type: "Office",
    rent: 25000,
    rooms: 3,
    bathrooms: 2,
    area: "1200 sq ft",
    image:
      "https://readdy.ai/api/search-image?query=Modern%20luxury%20office%20space%20interior%20with%20spacious%20work%20areas%2C%20contemporary%20furniture%2C%20large%20windows%20with%20natural%20light%2C%20elegant%20conference%20room%20and%20reception%20area%2C%20premium%20finishes%20and%20sophisticated%20design%20elements%2C%20professional%20business%20photography&width=400&height=300&seq=prop-office-1&orientation=landscape",
    features: ["Conference Room", "Parking", "Security", "Generator"],
  },
  {
    id: 2,
    title: "Bachelor Apartment",
    location: "Sonadanga",
    type: "Bachelor",
    rent: 12000,
    rooms: 1,
    bathrooms: 1,
    area: "600 sq ft",
    image:
      "https://readdy.ai/api/search-image?query=Cozy%20bachelor%20studio%20apartment%20with%20modern%20minimalist%20design%2C%20compact%20living%20space%20with%20bed%2C%20study%20area%2C%20kitchenette%2C%20warm%20lighting%20and%20contemporary%20furniture%2C%20efficient%20space%20utilization%2C%20professional%20real%20estate%20photography&width=400&height=300&seq=prop-bach-2&orientation=landscape",
    features: ["Furnished", "WiFi", "AC", "Kitchen"],
  },
  {
    id: 3,
    title: "Family House Rent",
    location: "Khan Jahan Ali Road",
    type: "Family",
    rent: 45000,
    rooms: 4,
    bathrooms: 3,
    area: "2000 sq ft",
    image:
      "https://readdy.ai/api/search-image?query=Spacious%20family%20home%20interior%20with%20multiple%20bedrooms%2C%20large%20living%20room%2C%20modern%20kitchen%2C%20dining%20area%2C%20natural%20lighting%2C%20contemporary%20furniture%20and%20fixtures%2C%20comfortable%20family%20living%20space%2C%20professional%20real%20estate%20photography&width=400&height=300&seq=prop-fam-3&orientation=landscape",
    features: ["Garden", "Garage", "Rooftop", "Security Guard"],
  },
  {
    id: 4,
    title: "Shop Space Available",
    location: "Gollamari",
    type: "Shop",
    rent: 35000,
    rooms: 2,
    bathrooms: 1,
    area: "800 sq ft",
    image:
      "https://readdy.ai/api/search-image?query=Prime%20retail%20shop%20space%20with%20modern%20commercial%20interior%2C%20display%20windows%2C%20professional%20lighting%2C%20clean%20white%20walls%2C%20polished%20floors%2C%20excellent%20visibility%20for%20business%2C%20ready%20for%20retail%20setup&width=400&height=300&seq=prop-shop-4&orientation=landscape",
    features: ["Street Facing", "Display Window", "Storage", "High Traffic"],
  },
  {
    id: 5,
    title: "Office Space Downtown",
    location: "Doulatpur",
    type: "Office",
    rent: 30000,
    rooms: 3,
    bathrooms: 2,
    area: "1500 sq ft",
    image:
      "https://readdy.ai/api/search-image?query=Professional%20downtown%20office%20space%20with%20open%20floor%20plan%2C%20modern%20workstations%2C%20glass%20partitions%2C%20meeting%20rooms%2C%20contemporary%20office%20furniture%2C%20excellent%20lighting%20and%20air%20conditioning%2C%20business-ready%20environment&width=400&height=300&seq=prop-office-5&orientation=landscape",
    features: ["Elevator", "Parking", "24/7 Security", "Conference Room"],
  },
  {
    id: 6,
    title: "Bachelor Studio",
    location: "Khalishpur",
    type: "Bachelor",
    rent: 15000,
    rooms: 1,
    bathrooms: 1,
    area: "750 sq ft",
    image:
      "https://readdy.ai/api/search-image?query=Modern%20bachelor%20studio%20with%20stylish%20contemporary%20design%2C%20comfortable%20bedroom%2C%20living%20area%2C%20modern%20bathroom%2C%20kitchenette%2C%20trendy%20furniture%2C%20excellent%20natural%20lighting%20and%20urban%20apartment%20aesthetic&width=400&height=300&seq=prop-bach-6&orientation=landscape",
    features: ["Balcony", "Semi-Furnished", "Internet Ready", "Gym Access"],
  },
  {
    id: 7,
    title: "Family Apartment",
    location: "Boyra",
    type: "Family",
    rent: 28000,
    rooms: 3,
    bathrooms: 2,
    area: "1300 sq ft",
    image:
      "https://readdy.ai/api/search-image?query=Beautiful%20family%20apartment%20with%20spacious%20living%20areas%2C%20modern%20kitchen%2C%20comfortable%20bedrooms%2C%20balcony%20with%20city%20view%2C%20contemporary%20interior%20design%2C%20natural%20lighting%20and%20premium%20finishes&width=400&height=300&seq=prop-fam-7&orientation=landscape",
    features: ["Balcony", "Parking", "Security", "Generator"],
  },
  {
    id: 8,
    title: "Commercial Shop",
    location: "Phultala",
    type: "Shop",
    rent: 20000,
    rooms: 1,
    bathrooms: 1,
    area: "500 sq ft",
    image:
      "https://readdy.ai/api/search-image?query=Commercial%20shop%20space%20with%20modern%20storefront%2C%20large%20display%20windows%2C%20clean%20interior%2C%20professional%20lighting%2C%20tiled%20floors%2C%20perfect%20for%20retail%20business%2C%20high%20visibility%20location&width=400&height=300&seq=prop-shop-8&orientation=landscape",
    features: ["Corner Location", "Display Window", "AC", "Parking"],
  },
  {
    id: 9,
    title: "Studio Apartment",
    location: "Rupsha",
    type: "Studio",
    rent: 18000,
    rooms: 1,
    bathrooms: 1,
    area: "650 sq ft",
    image:
      "https://readdy.ai/api/search-image?query=Modern%20studio%20apartment%20with%20open%20floor%20plan%2C%20stylish%20furnishings%2C%20kitchenette%2C%20comfortable%20sleeping%20area%2C%20contemporary%20bathroom%2C%20excellent%20natural%20lighting%20and%20minimalist%20design&width=400&height=300&seq=prop-studio-9&orientation=landscape",
    features: ["Furnished", "Balcony", "WiFi", "AC"],
  },
  {
    id: 10,
    title: "Office Complex",
    location: "Digholia",
    type: "Office",
    rent: 40000,
    rooms: 5,
    bathrooms: 3,
    area: "1800 sq ft",
    image:
      "https://readdy.ai/api/search-image?query=Large%20office%20complex%20with%20multiple%20rooms%2C%20professional%20interior%20design%2C%20conference%20facilities%2C%20reception%20area%2C%20modern%20workstations%2C%20glass%20partitions%2C%20executive%20offices%20and%20collaborative%20spaces&width=400&height=300&seq=prop-office-10&orientation=landscape",
    features: ["Reception Area", "Conference Room", "Parking", "Security"],
  },
  {
    id: 11,
    title: "Family Villa",
    location: "Nirala",
    type: "Family",
    rent: 55000,
    rooms: 5,
    bathrooms: 4,
    area: "2500 sq ft",
    image:
      "https://readdy.ai/api/search-image?query=Luxury%20family%20villa%20with%20spacious%20rooms%2C%20modern%20kitchen%2C%20dining%20area%2C%20living%20room%2C%20master%20bedroom%2C%20garden%20space%2C%20contemporary%20architecture%20and%20premium%20interior%20finishes&width=400&height=300&seq=prop-villa-11&orientation=landscape",
    features: ["Garden", "Garage", "Rooftop", "Swimming Pool"],
  },
  {
    id: 12,
    title: "Bachelor Room",
    location: "Sonadanga",
    type: "Bachelor",
    rent: 10000,
    rooms: 1,
    bathrooms: 1,
    area: "400 sq ft",
    image:
      "https://readdy.ai/api/search-image?query=Affordable%20bachelor%20room%20with%20basic%20furnishing%2C%20comfortable%20bed%2C%20study%20desk%2C%20wardrobe%2C%20attached%20bathroom%2C%20simple%20interior%20design%20perfect%20for%20single%20occupancy&width=400&height=300&seq=prop-bach-12&orientation=landscape",
    features: ["Furnished", "WiFi", "Shared Kitchen", "Laundry"],
  },
];

export default function PropertiesPage() {
  const [filteredLocation, setFilteredLocation] = useState("All Areas");
  const [filteredType, setFilteredType] = useState("All Types");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [properties, setProperties] = useState([]);
  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange({ min, max });
  };
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        "https://place-arena-backend.vercel.app/api/v1/property"
      );
      const data = await res.json();
      setProperties(data);
    }
    fetchData();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 md:pb-0 flex flex-col">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-8">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
            Browse All Properties
          </h1>
          <p className="text-sm md:text-lg text-purple-100">
            Find your perfect rental home in Khulna
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <SearchFilters
          onLocationChange={setFilteredLocation}
          onTypeChange={setFilteredType}
          onPriceRangeChange={handlePriceRangeChange}
        />
      </div>

      <section className="py-8 md:py-16 flex-1">
        <div className="max-w-7xl mx-auto px-3 md:px-6">
          <PropertyGrid
            properties={properties}
            filteredLocation={filteredLocation}
            filteredType={filteredType}
            priceRange={priceRange}
          />
        </div>
      </section>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
