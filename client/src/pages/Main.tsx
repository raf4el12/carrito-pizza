import { Link } from 'react-router-dom';
import useAuthContext from '../context/AuthContext';
import PizzaCarousel from '../components/menu/components/PizzaCarousel';

const PizzaIcon = () => (
  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
);
const ClockIcon = () => (
  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);
const MapPinIcon = () => (
  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
);


const features = [
  {
    title: 'Crea tu Pizza Perfecta',
    description: 'Elige tu masa, tamaño, y todos los ingredientes que amas. ¡Personalización total a tu gusto!',
    icon: <PizzaIcon />,
  },
  {
    title: 'Ordena en Segundos',
    description: 'Nuestro menú intuitivo y proceso de pago rápido te ahorran tiempo. Menos clics, más pizza.',
    icon: <ClockIcon />,
  },
  {
    title: 'Seguimiento en Tiempo Real',
    description: 'Mira cómo tu pedido pasa de "En Cocina" a "En Camino" y llega directo a tu puerta.',
    icon: <MapPinIcon />,
  },
];

const testimonials = [
  {
    quote: "¡La mejor pizza que he probado en años! El servicio fue rápido y el seguimiento del pedido es una maravilla.",
    author: "Ana García",
    image: "/images/testimonials/avatar-chica.jpg"
  },
  {
    quote: "Me encanta la opción de personalizar mi pizza. Los ingredientes son siempre frescos y deliciosos.",
    author: "Carlos Martínez",
    image: "/images/testimonials/avatar-chico.jpg"
  }
];

interface HeroProps {
  getCtaLink: () => string
  getCtaText: () => string
}

const Hero = ({ getCtaLink, getCtaText }: HeroProps) => (
  <header
    className="relative h-screen flex items-center justify-center text-white"
    style={{
      backgroundImage: `url('/images/hero/hero-pizza.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}
  >
    <div className="absolute inset-0 bg-black/60"></div>
    <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
      <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight drop-shadow-lg">
        El Sabor que te Une, <br /> Directo a Tu Puerta
      </h1>
      <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow">
        Ingredientes frescos, recetas auténticas y un servicio que te hará volver por más. ¿Qué esperas para probarla?
      </p>
      <Link
        to={getCtaLink()}
        className="inline-block bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-full text-xl font-bold shadow-lg transition duration-300 transform hover:scale-105"
      >
        {getCtaText()}
      </Link>
    </div>
  </header>
);

const Features = () => (
  <section className="bg-gray-50 py-20 px-4">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-4 text-gray-800">¿Hambre de algo increíble?</h2>
      <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">No somos solo otra pizzería. Somos una experiencia creada para ti.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition duration-300"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-5 mx-auto">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="bg-red-700 text-white py-20 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-extrabold mb-12">Lo que dicen nuestros clientes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {testimonials.map(testimonial => (
          <div key={testimonial.author} className="bg-red-800 p-8 rounded-xl shadow-lg">
            <p className="text-lg italic mb-4">"{testimonial.quote}"</p>
            <div className="flex items-center justify-center">
              <img src={testimonial.image} alt={testimonial.author} className="w-12 h-12 rounded-full mr-4 border-2 border-white" />
              <p className="font-bold">{testimonial.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CtaSection = () => (
  <section className="bg-gray-100 py-20">
    <div className="max-w-4xl mx-auto text-center px-4">
      <h2 className="text-4xl font-extrabold mb-4 text-gray-900">
        ¿Listo para tu próxima experiencia culinaria?
      </h2>
      <p className="text-xl text-gray-700 mb-8">
        Explora nuestro menú y personaliza la pizza de tus sueños hoy mismo.
      </p>
      <Link
        to="/menu"
        className="inline-block bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-full text-xl font-bold shadow-lg transition duration-300 transform hover:scale-105"
      >
        Ordenar Ahora
      </Link>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-8 text-center">
    <div className="max-w-6xl mx-auto">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} TuPizzeríaWeb. Todos los derechos reservados.
      </p>
      <div className="mt-4">
        <Link to="/privacy-policy" className="hover:text-white mx-2">Política de Privacidad</Link>
        <Link to="/terms" className="hover:text-white mx-2">Términos de Servicio</Link>
      </div>
    </div>
  </footer>
);


const Main = () => {
  const { user } = useAuthContext();

  const getCtaLink = () => {
    if (!user) return '/menu';
    return user.rol === 'administrador' ? '/admin/dashboard' : '/menu';
  };

  const getCtaText = () => {
    return user && user.rol === 'administrador' ? 'Ir al Panel de Admin' : 'Ordenar Ahora';
  };

  return (
    <div className="bg-white font-sans antialiased">
      <Hero getCtaLink={getCtaLink} getCtaText={getCtaText} />
      <main>
        <Features />
        <PizzaCarousel />
        <Testimonials />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Main;