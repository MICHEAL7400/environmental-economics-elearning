import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: '',
    urgency: 'medium'
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Contact form submission:', formData);
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Us',
      details: 'Lawrence@ecolearn.org',
      description: 'Send us an email anytime',
      response: 'Within 24 hours'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      details: 'Available 9AM-5PM WAT',
      description: 'Instant support during business hours',
      response: 'Immediate'
    },
    {
      icon: '📞',
      title: 'Phone Support',
      details: '+260 7700 30450',
      description: 'Call our support line',
      response: 'During business hours'
    },
    {
      icon: '📍',
      title: 'Regional Offices',
      details: 'Lusaka, Nairobi, Accra',
      description: 'Visit us in person',
      response: 'By appointment'
    }
  ];

  const faqs = [
    {
      question: 'How do I enroll in courses?',
      answer: 'You can browse our courses and enroll for free. Some advanced courses may require prerequisites.'
    },
    {
      question: 'Are certificates provided?',
      answer: 'Yes, you receive a certificate upon successful completion of each course with a passing grade.'
    },
    {
      question: 'Is the content Africa-specific?',
      answer: 'Absolutely! All our case studies, examples, and tools are tailored to African contexts and challenges.'
    },
    {
      question: 'Do you offer institutional licenses?',
      answer: 'Yes, we provide special pricing and features for universities, NGOs, and government institutions.'
    }
  ];

  const regionalOffices = [
    {
      city: 'Lusaka, Zambia',
      address: '123 Innovation Drive, Yaba',
      phone: '',
      email: 'lagos@ecolearn.org',
      hours: 'Mon-Fri, 8AM-6PM'
    },
    {
      city: 'Lusaka, Zambia',
      address: '456 Green Kitwe, Ndola',
      phone: '+260 7700 30450',
      email: 'nairobi@ecolearn.org',
      hours: 'Mon-Fri, 8AM-6PM'
    },
    {
      city: 'Accra, Ghana',
      address: '789 Sustainability Ave, Airport City',
      phone: '+233 30 123 4567',
      email: 'accra@ecolearn.org',
      hours: 'Mon-Fri, 8AM-6PM'
    }
  ];

  if (submitted) {
    return (
      <div className="contact-page">
        <div className="container">
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h1>Message Sent Successfully!</h1>
            <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
            <div className="success-actions">
              <Link to="/" className="cta-button primary">Return Home</Link>
              <Link to="/courses" className="cta-button secondary">Browse Courses</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-page">
      <div className="container">
        {/* Header */}
        <div className="contact-header">
          <h1>Get In Touch</h1>
          <p>We're here to help you on your environmental economics journey. Reach out with questions, feedback, or partnership inquiries.</p>
        </div>

        <div className="contact-layout">
          {/* Contact Form */}
          <div className="contact-form-section">
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Brief subject of your message"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                    <option value="courses">Course Information</option>
                    <option value="billing">Billing Issue</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="urgency">Urgency</label>
                <select
                  id="urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                >
                  <option value="low">Low - General question</option>
                  <option value="medium">Medium - Need help soon</option>
                  <option value="high">High - Urgent issue</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please provide details about your inquiry..."
                  rows="6"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="submit-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Sending Message...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="contact-info-section">
            {/* Contact Methods */}
            <div className="contact-methods">
              <h3>Quick Contact Options</h3>
              {contactMethods.map((method, index) => (
                <div key={index} className="contact-method">
                  <div className="method-icon">{method.icon}</div>
                  <div className="method-details">
                    <h4>{method.title}</h4>
                    <p className="method-main">{method.details}</p>
                    <p className="method-desc">{method.description}</p>
                    <span className="response-time">Response: {method.response}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Regional Offices */}
            <div className="regional-offices">
              <h3>Our Regional Offices</h3>
              {regionalOffices.map((office, index) => (
                <div key={index} className="office-card">
                  <h4>{office.city}</h4>
                  <p>{office.address}</p>
                  <p>📞 {office.phone}</p>
                  <p>📧 {office.email}</p>
                  <p>🕒 {office.hours}</p>
                </div>
              ))}
            </div>

            {/* FAQ Preview */}
            <div className="faq-preview">
              <h3>Frequently Asked Questions</h3>
              {faqs.slice(0, 3).map((faq, index) => (
                <div key={index} className="faq-item">
                  <h4>{faq.question}</h4>
                  <p>{faq.answer}</p>
                </div>
              ))}
              <Link to="/faq" className="view-all-faq">
                View All FAQs →
              </Link>
            </div>
          </div>
        </div>

        {/* Support Resources */}
        <div className="support-resources">
          <h2>Additional Support Resources</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <span className="resource-icon">📚</span>
              <h3>Help Center</h3>
              <p>Browse our comprehensive knowledge base for answers to common questions.</p>
              <Link to="/help" className="resource-link">Visit Help Center</Link>
            </div>
            <div className="resource-card">
              <span className="resource-icon">👥</span>
              <h3>Community Forum</h3>
              <p>Connect with other learners and get help from the community.</p>
              <Link to="/community" className="resource-link">Join Community</Link>
            </div>
            <div className="resource-card">
              <span className="resource-icon">🎓</span>
              <h3>Instructor Support</h3>
              <p>Resources and support for educators using EcoLearn in their classrooms.</p>
              <Link to="/instructors" className="resource-link">Instructor Resources</Link>
            </div>
            <div className="resource-card">
              <span className="resource-icon">🔧</span>
              <h3>Technical Support</h3>
              <p>Get help with platform issues, bugs, or technical questions.</p>
              <Link to="/technical-support" className="resource-link">Get Technical Help</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;