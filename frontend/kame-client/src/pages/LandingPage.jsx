/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import logo from "../images/logo.png"
import demo from "../images/demo.gif"
import sergio from "../images/sergio.png"
import chris from "../images/christian.png"
import nissel from "../images/nissel.png"

import { 
  Database, 
  Shield, 
  Clock, 
  Users, 
  BarChart3, 
  Linkedin,
  Menu,
  X,
  Github
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
                onClick={() => scrollToSection('features')}
                className="text-gray-600 hover:text-sky-600 transition"
              >
                Features
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
      <section id="home" className="bg-hero-pattern to-sky-200 pt-28 pb-20">
        <div className="container mx-auto px-6 my-28">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <img src={logo} alt="logo" className='h-56 lg:h-96 ml-3 lg:ml-48 flex align-center justify-center' />
            </div>
            <div className='lg:w-1/2 mb-10 lg:mb-0'>
                <h2 className='text-2xl lg:text-4xl font-semibold text-white text-center lg:text-left' >
                    Easy to Use Data Management and Data Analysis Web Application for Hospitals
                </h2>
            </div>
          </div>
        </div>
      </section>

      <section id='features' className='bg-white py-20 scroll-mt-16'>
          <div className='container mx-auto px-6'>
            <div className='flex flex-col lg:flex-row items-center'>
                <div className='lg:w-1/2 '>
                    <h2 className='text-4xl font-bold mb-16'>Features</h2>
                    <p className='py-5 text-lg'>
                        Our app comes with the capabilities to manage patient information, such as their sociodemographic 
                        information, thier vital signs, medical history and store it all in their medical 
                        record digitally.
                    </p>
                    <p className='pb-5 text-lg'>
                        It comes with a easy to use, dynamic search engine that allows the user to easily find a patient. 
                    </p>
                    <p className='text-lg mb-10'>
                        As well as a dashboard with a graphical interface for data analysis to facilitate hospital administrators
                        when making reports.
                    </p>
                </div>
                <div className='lg:w-1/2 lg:mb-0 ml-2'>
                    <h2 className='font-semibold text-lg mb-5'>Dynamic Search Engine</h2>
                    <img src={demo} alt="demo" />
                </div>
            </div>
          </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-slate-100 py-20 scroll-mt-16">
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
                description: "State-of-the-art security protocols ensuring the highest level of data protection and compliance with industry standards."
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
                description: "Seamless integration with existing hospital systems. (To be developed)"
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
      <section id="about" className="bg-gradient-to-tr from-sky-600 via-sky-400 to-sky-200 py-20 scroll-mt-16">
        <div className="container mx-auto px-6">
          <h2 className='text-center text-white text-3xl font-bold p-10'>About Us</h2>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img 
                src={chris} 
                alt="About Us" 
                className="h-96"
              />
              <h1 className='text-center text-2xl font-semibold text-white lg:mr-16 p-4'>
                Christian Díaz Rivera
              </h1>
              <h2 className='text-center text-lg font-semibold text-white lg:mr-16'>
                Fullstack Developer
              </h2>
              <div className="flex space-x-4 align-center justify-center mr-20 mt-2">
                <a href="https://www.linkedin.com/in/christian-diaz-rivera-8697592a1/">
                    <Linkedin className="w-6 h-6 text-sky-200 hover:text-white cursor-pointer" />
                </a>
                <a href="https://github.com/SPCDIAZRIVERACHRISTIAN">
                    <Github className="w-6 h-6 text-sky-200 hover:text-white cursor-pointer"/>
                </a>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img 
                src={nissel} 
                alt="About Us" 
                className="h-96"
              />
              <h1 className='text-center text-2xl font-semibold text-white mr-16 p-4'>
                Nissel Sánchez Gutiérrez
              </h1>
              <h2 className='text-center text-lg font-semibold text-white mr-16'>
                Fullstack Developer
              </h2>
              <div className="flex space-x-4 align-center justify-center mr-20 mt-2">
                <a href="https://www.linkedin.com/in/nissel-sánchez-7ab349313/">
                    <Linkedin className="w-6 h-6 text-sky-200 hover:text-white cursor-pointer" />
                </a>
                <a href="https://github.com/niniisg">
                    <Github className="w-6 h-6 text-sky-200 hover:text-white cursor-pointer"/>
                </a>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img 
                src={sergio} 
                alt="About Us" 
                className="h-96"
              />
              <h1 className='text-center text-2xl font-semibold text-white lg:mr-16 p-4'>
                Sergio A. Lebrón Aguirre
              </h1>
              <h2 className='text-center text-lg font-semibold text-white lg:mr-16'>
                Fullstack Developer
              </h2>
              <div className="flex space-x-4 align-center justify-center mr-20 mt-2">
                <a href="https://www.linkedin.com/in/sergio-lebron/">
                    <Linkedin className="w-6 h-6 text-sky-200 hover:text-white cursor-pointer" />
                </a>
                <a href="https://github.com/SergioLebron22">
                    <Github className="w-6 h-6 text-sky-200 hover:text-white cursor-pointer"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sky-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 align-center justify-center">
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
                <li><button onClick={() => scrollToSection('features')} className="hover:text-white">Features</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-white">Services</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white">About</button></li>
              </ul>
            </div>
            {/* <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sky-200">
                <li><a href="#" className="hover:text-white">Data Storage</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
                <li><a href="#" className="hover:text-white">Analytics</a></li>
                <li><a href="#" className="hover:text-white">Integration</a></li>
              </ul>
            </div> */}
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