import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Section1 = () => {
  return (
    <section className="relative w-full h-[90vh] text-white overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        className="w-full h-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div
            className="w-full h-full bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage:
                "url('https://plus.unsplash.com/premium_photo-1683121716061-3faddf4dc504?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            }}
          >
            <div className="bg-black/50 p-8 rounded-xl text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Latest Smartphones
              </h1>
              <p className="text-lg md:text-xl mb-6">
                Discover the newest arrivals in our smartphone collection.
              </p>
              <a
                href="/products"
                className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
              >
                Shop Now
              </a>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="w-full h-full bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2101&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            }}
          >
            <div className="bg-black/50 p-8 rounded-xl text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Smart Home Devices
              </h1>
              <p className="text-lg md:text-xl mb-6">
                Control your home with our latest smart gadgets.
              </p>
              <a
                href="/products"
                className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
              >
                Explore
              </a>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div
            className="w-full h-full bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            }}
          >
            <div className="bg-black/50 p-8 rounded-xl text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Latest Laptops & PCs
              </h1>
              <p className="text-lg md:text-xl mb-6">
                Power up your work and play with cutting-edge devices.
              </p>
              <a
                href="/products"
                className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
              >
                Browse Now
              </a>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Section1;