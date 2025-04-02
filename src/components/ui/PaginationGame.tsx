import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "../../assets/swiperStyle.css";

import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

interface IPost {
  id: string | null | undefined;
  title: string;
  description: string;
  file?: string | null;
}

const PaginationGame = ({ data }: { data: IPost[] }) => {
  const navigate = useNavigate();

  const handleClick = (id: string | null | undefined) => {
    if (id) {
      navigate(`/game/${id}`);
    }
  };
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={3}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className="swiper"
    >
      {data && data.length > 0 ? (
        data.map((post) => (
          <SwiperSlide
            key={post.id}
            className="relative group overflow-hidden rounded-lg shadow-2xl shadow-gray-700 border-[0.25px] border-gray-600 transform hover:scale-105 transition-all duration-300"
            onClick={() => handleClick(post.id)}
          >
            <img
              src={
                post.file
                  ? `http://localhost:8080/${post.file.replace(/\\/g, "/")}`
                  : "https://via.placeholder.com/400x300"
              }
              alt={post.title || "Post image"}
              className="w-full h-72 object-cover transition-opacity duration-300 opacity-100"
            />

            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-center text-lg font-semibold p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              {post.title}
            </div>
          </SwiperSlide>
        ))
      ) : (
        <p className="text-center text-gray-500">No posts available</p>
      )}
    </Swiper>
  );
};

export default PaginationGame;
