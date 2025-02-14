import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import contactAnimation from '../assets/Contact.json';
import facebook from '../assets/facebook.png';
import instagram from '../assets/instagram.png';
import linkedin from '../assets/linkedin.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [messageSent, setMessageSent] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');

    try {
      // Validation des champs
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Tous les champs obligatoires doivent être remplis');
      }

      if (!validateEmail(formData.email)) {
        throw new Error('Adresse email invalide');
      }

      if (formData.phone && !validatePhone(formData.phone)) {
        throw new Error('Le numéro de téléphone doit contenir 10 chiffres');
      }

      // Envoi des données
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user",
        formData
      );

      if (response.status === 201) {
        setMessageSent(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setMessageSent(false), 3000);
      }
    } catch (error) {
      console.error("Erreur:", error);
      setFormError(
        error.response?.data?.message ||
        error.message ||
        'Une erreur est survenue lors de l\'envoi du message'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="z-50 bg-gray-800 relative py-10 px-5 md:px-0">
      <div className="mb-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/2 mb-8 ml-2 md:mb-0">
            <h2 className="text-3xl font-bold mb-3 text-red-500">Contactez-moi</h2>
            <p className="mb-4 text-white/85">Je suis ouvert à nouvelles opportunités et collaborations. N'hésitez pas à me contacter !</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-foreground/80">
                <img src={facebook} alt="Facebook" className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-foreground/80">
                <img src={instagram} alt="Instagram" className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-foreground/80">
                <img src={linkedin} alt="LinkedIn" className="h-6 w-6" />
              </a>
            </div>
            <Lottie animationData={contactAnimation} className="w-[350px] mx-auto lg:w-[500px]" />
          </div>

          <form onSubmit={handleSubmit} className="w-full md:w-2/5 bg-gray-100 rounded-lg border border-red-300 shadow-lg shadow-red-500 p-10 lg:mr-20">
            <h1 className="text-gray-900 text-4xl font-bold mb-7">Formulaire de Contact</h1>

            {messageSent && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                Message envoyé avec succès !
              </div>
            )}

            {formError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {formError}
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Téléphone 
                <span className="text-xs text-gray-500 ml-1">(optionnel - format: 0612345678)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                pattern="[0-9]{10}"
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200"
                required
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>
              
              <Link 
                to="/messages"
                className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Voir les messages
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;