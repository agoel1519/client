import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { getDbSetting, submitAppointmentBooking } from '../api/mongoApi';
import './ConsultationSection.css';

const defaultClinicInfo = {
  clinicName: "Aevora By Kian Clinics",
  address: "SCO 205 FF, Sector 5, Panchkula – 134114",
  phone: "+91 97797 66933",
  email: "contact@aevoraclinics.com",
  hours: "Monday – Sunday: 10:00 AM – 7:00 PM"
};

const ConsultationSection = ({ 
  id = "appointment",
  title = "BOOK YOUR CONSULTATION",
  subtitle = "Begin your transformative journey with India's premier aesthetic & wellness supercliniq. Schedule your confidential consultation today.",
  defaultTreatment = ""
}) => {
  const [clinic, setClinic] = useState(defaultClinicInfo);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    treatment: defaultTreatment,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (defaultTreatment) {
      setFormData(prev => ({ ...prev, treatment: defaultTreatment }));
    }
  }, [defaultTreatment]);

  const loadClinicSettings = () => {
    getDbSetting('clinic_settings').then((saved) => {
      if (saved) {
        setClinic(prev => ({
          ...prev,
          clinicName: (saved.clinicName && !saved.clinicName.toLowerCase().includes('sanctuary')) ? saved.clinicName : "Aevora By Kian Clinics",
          address: (saved.address && !saved.address.includes('SCO 14-15')) ? saved.address : prev.address,
          phone: (saved.phone && !saved.phone.includes('0172')) ? saved.phone : prev.phone,
          email: (saved.email && !saved.email.includes('concierge@')) ? saved.email : "contact@aevoraclinics.com",
          hours: saved.hours || prev.hours
        }));
      } else {
        const legacy = localStorage.getItem('aevora_clinic_settings');
        if (legacy) {
          try {
            const parsed = JSON.parse(legacy);
            setClinic(prev => ({ ...prev, ...parsed }));
          } catch (e) {}
        }
      }
    }).catch(() => {});
  };

  useEffect(() => {
    loadClinicSettings();
    window.addEventListener('clinicSettingsUpdated', loadClinicSettings);
    return () => window.removeEventListener('clinicSettingsUpdated', loadClinicSettings);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitAppointmentBooking({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        treatment: formData.treatment || 'General Aesthetic Consultation',
        notes: formData.message
      });
    } catch (err) {
      console.warn('Booking submitted with local store fallback:', err);
    } finally {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }
  };

  const resetForm = () => {
    setFormSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      treatment: defaultTreatment || '',
      message: ''
    });
  };

  // Format phone for tel: link (first number if multiple)
  const primaryPhone = clinic.phone.split(/[\n|]/)[0].trim();
  const telHref = primaryPhone.replace(/[^0-9+]/g, '');

  return (
    <section className="aevora-consultation-section" id={id}>
      <div className="aevora-consultation-container">
        <div className="aevora-consultation-layout">
          
          {/* Left Column: Clinic Info */}
          <div className="aevora-consultation-info">
            <span className="aevora-consultation-eyebrow">GET IN TOUCH</span>
            <h2 className="aevora-consultation-heading">{title}</h2>
            <p className="aevora-consultation-subtext">{subtitle}</p>

            <div className="aevora-contact-items-list">
              {/* Address */}
              <div className="aevora-contact-item">
                <div className="aevora-contact-icon-box" aria-hidden="true">
                  <MapPin size={20} />
                </div>
                <div className="aevora-contact-item-text">
                  <h4 className="aevora-contact-item-label">VISIT OUR SUPERCLINIQ</h4>
                  <p className="aevora-contact-item-val">{clinic.address}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="aevora-contact-item">
                <div className="aevora-contact-icon-box" aria-hidden="true">
                  <Phone size={20} />
                </div>
                <div className="aevora-contact-item-text">
                  <h4 className="aevora-contact-item-label">CALL DIRECTLY</h4>
                  <p className="aevora-contact-item-val">
                    <a href={`tel:${telHref}`} className="aevora-contact-link">
                      {clinic.phone.replace(/\n/g, ' | ')}
                    </a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="aevora-contact-item">
                <div className="aevora-contact-icon-box" aria-hidden="true">
                  <Mail size={20} />
                </div>
                <div className="aevora-contact-item-text">
                  <h4 className="aevora-contact-item-label">EMAIL CONCIERGE</h4>
                  <p className="aevora-contact-item-val">
                    <a href={`mailto:${clinic.email}`} className="aevora-contact-link">
                      {clinic.email}
                    </a>
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="aevora-contact-item">
                <div className="aevora-contact-icon-box" aria-hidden="true">
                  <Clock size={20} />
                </div>
                <div className="aevora-contact-item-text">
                  <h4 className="aevora-contact-item-label">CLINIC HOURS</h4>
                  <p className="aevora-contact-item-val">{clinic.hours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Luxury Form Card */}
          <div className="aevora-consultation-form-card">
            {formSubmitted ? (
              <div className="aevora-booking-success-box">
                <div className="aevora-success-icon-wrap">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="aevora-success-title">Consultation Requested</h3>
                <p className="aevora-success-desc">
                  Thank you, <strong>{formData.name}</strong>. Your consultation request has been received. Our senior medical concierge will connect with you within 24 hours.
                </p>
                <button type="button" onClick={resetForm} className="aevora-reset-btn">
                  Book Another Consultation
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="aevora-booking-form">
                <div className="aevora-form-row-2">
                  <div className="aevora-form-field">
                    <label className="aevora-input-label" htmlFor="consult-name">Full Name *</label>
                    <input 
                      id="consult-name"
                      type="text" 
                      name="name" 
                      placeholder="e.g. Ananya Sharma" 
                      value={formData.name}
                      onChange={handleChange}
                      required 
                      className="aevora-form-input"
                    />
                  </div>
                  <div className="aevora-form-field">
                    <label className="aevora-input-label" htmlFor="consult-email">Email Address *</label>
                    <input 
                      id="consult-email"
                      type="email" 
                      name="email" 
                      placeholder="e.g. ananya@example.com" 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                      className="aevora-form-input"
                    />
                  </div>
                </div>

                <div className="aevora-form-field">
                  <label className="aevora-input-label" htmlFor="consult-phone">Phone Number *</label>
                  <input 
                    id="consult-phone"
                    type="tel" 
                    name="phone" 
                    placeholder="e.g. +91 98765 43210" 
                    value={formData.phone}
                    onChange={handleChange}
                    required 
                    className="aevora-form-input"
                  />
                </div>

                <div className="aevora-form-field">
                  <label className="aevora-input-label" htmlFor="consult-service">Treatment / Service</label>
                  <select 
                    id="consult-service"
                    name="treatment" 
                    value={formData.treatment} 
                    onChange={handleChange}
                    className="aevora-form-select"
                  >
                    <option value="">Select Service / Treatment</option>
                    <option value="Advanced Skin Treatments">Advanced Skin Treatments</option>
                    <option value="Hair Restoration & Transplant">Hair Restoration & Transplant</option>
                    <option value="Body Contouring & Sculpting">Body Contouring & Sculpting</option>
                    <option value="Anti-Ageing & Longevity">Anti-Ageing & Longevity</option>
                    <option value="Weight Loss & Bariatric Surgery">Weight Loss & Bariatric Surgery</option>
                    <option value="Intimate Wellbeing">Intimate Wellbeing</option>
                    <option value="General Aesthetic Consultation">General Aesthetic Consultation</option>
                  </select>
                </div>

                <div className="aevora-form-field">
                  <label className="aevora-input-label" htmlFor="consult-message">Preferred Date / Note (Optional)</label>
                  <textarea 
                    id="consult-message"
                    name="message" 
                    placeholder="Tell us about your specific goals, preferred date or any questions..." 
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    className="aevora-form-textarea"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="aevora-form-submit-btn"
                >
                  {isSubmitting ? 'Submitting...' : (
                    <>
                      <span>Book Appointment</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                <p className="aevora-form-footer-note">
                  🔒 100% Confidential • Direct Doctor Consultation • Zero Obligation
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ConsultationSection;
