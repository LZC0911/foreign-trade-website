"use client";

import { useState } from 'react';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          page: '/contact',
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', company: '', country: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero */}
      <section className="relative w-full pt-40 pb-20 overflow-hidden bg-[#0F1419]">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-[#E8EDF5] text-xs font-semibold tracking-[4px] uppercase">Get in Touch</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#E8EDF5] mt-6 mb-8" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Let's Start a<br />
            <span className="text-[#C9B27C]">Conversation</span>
          </h1>
          <p className="text-[#8B95A7] text-lg max-w-3xl mx-auto">
            Whether you have a specific inquiry or want to explore partnership opportunities, 
            our team is ready to assist you within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-[#0F1419]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card p-8">
                <h3 className="text-[#E8EDF5] text-sm font-semibold tracking-[3px] uppercase mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[rgba(201,178,124,0.08)] border border-[rgba(201,178,124,0.3)] flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-[#E8EDF5]" size={20} />
                    </div>
                    <div>
                      <div className="text-[#E8EDF5] font-medium mb-1">Head Office</div>
                      <div className="text-[#8B95A7] text-base leading-relaxed">
                        Suite 2500, Global Trade Center<br />
                        888 Nanjing West Road<br />
                        Shanghai, China 200000
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[rgba(201,178,124,0.08)] border border-[rgba(201,178,124,0.3)] flex items-center justify-center flex-shrink-0">
                      <Mail className="text-[#E8EDF5]" size={20} />
                    </div>
                    <div>
                      <div className="text-[#E8EDF5] font-medium mb-1">Email</div>
                      <div className="text-[#8B95A7] text-base">
                        info@apexglobaltrade.com<br />
                        sales@apexglobaltrade.com
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[rgba(201,178,124,0.08)] border border-[rgba(201,178,124,0.3)] flex items-center justify-center flex-shrink-0">
                      <Phone className="text-[#E8EDF5]" size={20} />
                    </div>
                    <div>
                      <div className="text-[#E8EDF5] font-medium mb-1">Phone</div>
                      <div className="text-[#8B95A7] text-base">
                        +86 21 8888 8888 (Main)<br />
                        +86 21 8888 8889 (Sales)
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[rgba(201,178,124,0.08)] border border-[rgba(201,178,124,0.3)] flex items-center justify-center flex-shrink-0">
                      <Clock className="text-[#E8EDF5]" size={20} />
                    </div>
                    <div>
                      <div className="text-[#E8EDF5] font-medium mb-1">Business Hours</div>
                      <div className="text-[#8B95A7] text-base">
                        Mon - Fri: 9:00 AM - 6:00 PM (GMT+8)<br />
                        Saturday: 10:00 AM - 4:00 PM
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Response Guarantee */}
              <div className="border border-[rgba(201,178,124,0.15)] bg-gradient-to-r from-[#ffffff]/5 to-transparent p-6">
                <div className="flex items-center gap-3 text-[#E8EDF5] font-semibold mb-2">
                  <CheckCircle size={20} />
                  <span className="tracking-wider text-sm uppercase">24-Hour Response</span>
                </div>
                <p className="text-[#8B95A7] text-base">
                  We guarantee a response to all inquiries within 24 business hours.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="card p-8 md:p-10">
                <h3 className="text-[#E8EDF5] text-2xl font-semibold mb-2">Send Us a Message</h3>
                <p className="text-[#8B95A7] text-base mb-8">Fill out the form below and we'll get back to you shortly.</p>

                {status === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto bg-[rgba(201,178,124,0.08)] border border-[rgba(201,178,124,0.5)] rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="text-[#E8EDF5]" size={36} />
                    </div>
                    <h4 className="text-[#E8EDF5] text-2xl font-semibold mb-3">Thank You!</h4>
                    <p className="text-[#8B95A7] mb-8">Your message has been received. We'll get back to you within 24 hours.</p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="btn-outline"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[#E8EDF5] text-xs font-semibold tracking-wider uppercase mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="form-input"
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label className="block text-[#E8EDF5] text-xs font-semibold tracking-wider uppercase mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="form-input"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[#E8EDF5] text-xs font-semibold tracking-wider uppercase mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="+1 234 567 8900"
                        />
                      </div>
                      <div>
                        <label className="block text-[#E8EDF5] text-xs font-semibold tracking-wider uppercase mb-2">Company</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="Company Ltd."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#E8EDF5] text-xs font-semibold tracking-wider uppercase mb-2">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="United States"
                      />
                    </div>

                    <div>
                      <label className="block text-[#E8EDF5] text-xs font-semibold tracking-wider uppercase mb-2">Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="form-input resize-none"
                        placeholder="Tell us about your requirements, products you're interested in, or any questions you have..."
                      />
                    </div>

                    {status === 'error' && (
                      <div className="text-red-400 text-sm p-4 bg-red-500/10 border border-red-500/20 rounded">
                        {errorMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          Send Message
                          <Send size={18} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
