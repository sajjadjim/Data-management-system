import { Smartphone, Laptop, Watch, Headphones } from "lucide-react";

const Section2 = () => {
  const categories = [
    {
      name: "Smartphones",
      icon: <Smartphone size={36} className="text-blue-600" />,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
      description: "Latest flagship & budget-friendly phones.",
    },
    {
      name: "Laptops",
      icon: <Laptop size={36} className="text-blue-600" />,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      description: "Powerful laptops for work & gaming.",
    },
    {
      name: "Smart Gadgets",
      icon: <Watch size={36} className="text-blue-600" />,
      image:
        "https://images.unsplash.com/photo-1593876557681-bb9f2e7a3b3d?auto=format&fit=crop&w=800&q=80",
      description: "Smartwatches, speakers, and more.",
    },
    {
      name: "Accessories",
      icon: <Headphones size={36} className="text-blue-600" />,
      image:
        "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80",
      description: "Headphones, chargers, and daily essentials.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Explore Our Categories
          </h2>
          <p className="mt-3 text-gray-600">
            Find everything you need in one place — top electronics at your
            fingertips.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-40 object-cover rounded-t-xl"
              />
              <div className="p-5 text-center">
                <div className="flex justify-center mb-3">{cat.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-600 mt-2">{cat.description}</p>
                <a
                  href="/products"
                  className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                  Shop Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section2;