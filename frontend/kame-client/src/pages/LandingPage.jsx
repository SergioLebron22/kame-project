/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import logo from "../images/logo.png"

import { 
  Database, 
  Shield, 
  Clock, 
  Users, 
  BarChart3, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Menu,
  X
} from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleLoginClick = () => {
    window.location.href = '/login'
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <img src={logo} alt="logo" className="h-16 pl-3" />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-gray-600 hover:text-sky-600 transition"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-gray-600 hover:text-sky-600 transition"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-600 hover:text-sky-600 transition"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-600 hover:text-sky-600 transition"
              >
                Contact
              </button>
              <button 
                className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition"
                onClick={handleLoginClick}
              >
                Log In
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4">
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-gray-600 hover:text-sky-600 transition"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-600 hover:text-sky-600 transition"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-600 hover:text-sky-600 transition"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-600 hover:text-sky-600 transition"
                >
                  Contact
                </button>
                <button className="bg-sky-400 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition w-full">
                  Log In
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-tr from-sky-500 to-sky-300 pt-28 pb-20">
        <div className="container mx-auto px-6 my-28">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              {/* <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 text-center">
                Kame
              </h1> */}
              <img src={logo} alt="logo" className='h-56 lg:h-96 ml-3 lg:ml-48 flex align-center justify-center' />

              {/* <p className="text-xl text-center text-gray-600 mt-8 mb-8">
                Streamline your hospital's data workflow with our comprehensive management solution.
                </p> */}
            </div>
            <div className='lg:w-1/2 mb-10 lg:mb-0'>
                <h2 className='text-2xl lg:text-3xl font-semibold text-white text-center lg:text-left' >
                    A Data Management and Data Analysis Web Application for Hospitals
                </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 scroll-mt-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Database className="w-12 h-12 text-sky-600" />,
                title: "Data Storage",
                description: "Secure cloud storage for all your patient records and hospital data."
              },
              {
                icon: <Shield className="w-12 h-12 text-sky-600" />,
                title: "Security",
                description: "HIPAA-compliant security measures to protect sensitive information."
              },
              {
                icon: <Clock className="w-12 h-12 text-sky-600" />,
                title: "Real-time Access",
                description: "Instant access to critical data when you need it most."
              },
              {
                icon: <Users className="w-12 h-12 text-sky-600" />,
                title: "User Management",
                description: "Comprehensive role-based access control system."
              },
              {
                icon: <BarChart3 className="w-12 h-12 text-sky-600" />,
                title: "Analytics",
                description: "Advanced analytics and reporting capabilities."
              },
              {
                icon: <Database className="w-12 h-12 text-sky-600" />,
                title: "Integration",
                description: "Seamless integration with existing hospital systems."
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="bg-sky-50 py-20 scroll-mt-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img 
                src="/api/placeholder/500/400" 
                alt="About Us" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">About Us</h2>
              <p className="text-gray-600 mb-6">
                We are dedicated to revolutionizing healthcare data management through innovative solutions that empower hospitals to deliver better patient care.
              </p>
              <p className="text-gray-600 mb-6">
                With over a decade of experience in healthcare technology, our team understands the unique challenges faced by modern healthcare providers.
              </p>
              <button className="bg-sky-600 text-white px-8 py-3 rounded-lg hover:bg-sky-700 transition">
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 scroll-mt-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Contact Us</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-sky-600" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">contact@kame.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-sky-600" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="w-6 h-6 text-sky-600" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-gray-600">123 Healthcare Ave, Medical District</p>
                </div>
              </div>
            </div>
            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-600"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-600"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-600"
                ></textarea>
              </div>
              <button className="bg-sky-600 text-white px-8 py-3 rounded-lg hover:bg-sky-700 transition w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sky-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Kame</h3>
              <p className="text-sky-200">
                Modern solutions for healthcare data management.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sky-200">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-white">Home</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-white">Services</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white">About</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sky-200">
                <li><a href="#" className="hover:text-white">Data Storage</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
                <li><a href="#" className="hover:text-white">Analytics</a></li>
                <li><a href="#" className="hover:text-white">Integration</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6 text-sky-200 hover:text-white cursor-pointer" />
                <Twitter className="w-6 h-6 text-sky-200 hover:text-white cursor-pointer" />
                <Linkedin className="w-6 h-6 text-sky-200 hover:text-white cursor-pointer" />
                <Instagram className="w-6 h-6 text-sky-200 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="border-t border-sky-800 mt-8 pt-8 text-center text-sky-200">
            <p>&copy; 2024 Kame. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;