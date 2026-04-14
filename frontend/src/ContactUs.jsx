import React from "react";
import "./ContactUs.css";

function ContactUs() {
  return (
    <div className="contactWrapper">

      {/* Hero */}
      <div className="contactHero">
        <div className="contactBadge">CONTACT US</div>
        <h1>We'd love to <span className="brand">hear from you</span></h1>
        <p>Have a question about a product, your order, or just want to say hello? Our team is here to help.</p>
      </div>

      {/* Main */}
      <div className="contactMain">

        {/* Info Column */}
        <div className="infoCol">
          <h2>Get in touch</h2>
          <p>Reach us through any of the channels below. We typically respond within 24 hours.</p>

          <div className="infoCard">
            <div className="infoIconBox">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" stroke="#C8722A" strokeWidth="1.5"/>
                <path d="M2 5l8 6 8-6" stroke="#C8722A" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div className="infoTitle">Email us</div>
              <div className="infoSub">support@furnicart.com</div>
            </div>
          </div>

          <div className="infoCard">
            <div className="infoIconBox">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 4a1 1 0 011-1h3l1 4-2 1a11 11 0 005 5l1-2 4 1v3a1 1 0 01-1 1C8 16 4 12 3 7V4z" stroke="#C8722A" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="infoTitle">Call us</div>
              <div className="infoSub">+91 7907596725</div>
            </div>
          </div>

          <div className="infoCard">
            <div className="infoIconBox">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="9" r="3" stroke="#C8722A" strokeWidth="1.5"/>
                <path d="M10 2a7 7 0 017 7c0 4-7 10-7 10S3 13 3 9a7 7 0 017-7z" stroke="#C8722A" strokeWidth="1.5"/>
              </svg>
            </div>
            <div>
              <div className="infoTitle">Visit us</div>
              <div className="infoSub">42 MG Road, Bangalore, Karnataka</div>
            </div>
          </div>

          <div className="infoCard">
            <div className="infoIconBox">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="7" stroke="#C8722A" strokeWidth="1.5"/>
                <path d="M10 6v4l3 2" stroke="#C8722A" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div className="infoTitle">Working hours</div>
              <div className="infoSub">Mon – Sat, 9:00 AM – 6:00 PM</div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="formCol">
          <h2>Send us a message</h2>
          <p>Fill out the form and we'll get back to you as soon as possible.</p>

          <div className="formRow">
            <div>
              <label>FIRST NAME</label>
              <input type="text" placeholder="John" />
            </div>
            <div>
              <label>LAST NAME</label>
              <input type="text" placeholder="Doe" />
            </div>
          </div>

          <div className="formGroup">
            <label>EMAIL ADDRESS</label>
            <input type="email" placeholder="john@example.com" />
          </div>

          <div className="formGroup">
            <label>SUBJECT</label>
            <select>
              <option>Order inquiry</option>
              <option>Product question</option>
              <option>Return / refund</option>
              <option>Delivery issue</option>
              <option>Other</option>
            </select>
          </div>

          <div className="formGroup">
            <label>MESSAGE</label>
            <textarea placeholder="Tell us how we can help you..."></textarea>
          </div>

          <button className="submitBtn">Send message</button>
        </div>
      </div>

      {/* FAQ */}
      <div className="faqSection">
        <h2>Frequently asked questions</h2>
        <div className="faqGrid">
          {[
            { q: "How long does delivery take?", a: "We deliver within 5–7 business days across major cities in India. Remote areas may take up to 10 days." },
            { q: "Can I return a product?", a: "Yes! We offer hassle-free 30-day returns. Just contact us and we'll arrange a pickup at no extra cost." },
            { q: "Do you offer assembly services?", a: "Yes, we provide free assembly for orders above ₹15,000. Our team will set everything up for you." },
            { q: "How do I track my order?", a: "Once shipped, you'll receive an SMS and email with a tracking link to monitor your delivery in real time." },
          ].map((faq, i) => (
            <div className="faqCard" key={i}>
              <h4>{faq.q}</h4>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default ContactUs;