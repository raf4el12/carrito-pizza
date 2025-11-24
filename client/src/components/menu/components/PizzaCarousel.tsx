import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const carouselItems = [
    {
        id: 1,
        title: "Pizza Pepperoni Clásica",
        description: "La favorita de todos, con pepperoni de alta calidad y queso mozzarella derretido.",
        image: "/images/pizzas/pizza-peperoni.png",
        price: "S/ 29.90"
    },
    {
        id: 2,
        title: "Pizza Vegetariana Suprema",
        description: "Una explosión de sabor con pimientos, cebolla, champiñones y aceitunas negras.",
        image: "/images/pizzas/pizza-vegeteriana.png",
        price: "S/ 32.90"
    },
    {
        id: 3,
        title: "Pizza Hawaiana",
        description: "La combinación perfecta de dulce y salado con piña fresca y jamón.",
        image: "/images/pizzas/pizzaHawaiana.png",
        price: "S/ 30.90"
    }
];

const PizzaCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isAutoPlaying) {
            interval = setInterval(nextSlide, 5000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide]);

    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        Nuestras Estrellas
                    </h2>
                    <p className="mt-4 text-xl text-gray-600">
                        Descubre las pizzas que están conquistando paladares.
                    </p>
                </div>

                <div
                    className="relative group"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    {/* Main Carousel Content */}
                    <div className="relative h-[500px] w-full overflow-hidden rounded-2xl shadow-2xl bg-gray-50">
                        {carouselItems.map((item, index) => (
                            <div
                                key={item.id}
                                className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out transform ${index === currentIndex ? 'opacity-100 translate-x-0' :
                                    index < currentIndex ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'
                                    }`}
                            >
                                <div className="flex flex-col md:flex-row h-full">
                                    {/* Image Section */}
                                    <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover transform hover:scale-110 transition duration-700"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Pizza+Image';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10"></div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
                                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                            {item.title}
                                        </h3>
                                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                            {item.description}
                                        </p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="text-3xl font-bold text-red-600">
                                                {item.price}
                                            </span>
                                            <Link
                                                to="/menu"
                                                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 transition-colors duration-300"
                                            >
                                                Ordenar Ahora
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 focus:outline-none"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 focus:outline-none"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Indicators */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                        {carouselItems.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-red-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PizzaCarousel;
