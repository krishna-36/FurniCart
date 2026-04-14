import React from "react";
import "./AboutUs.css";
import { useNavigate } from "react-router-dom";

function AboutUs() {

  const navigateTo = useNavigate();

  return (
    <div className="aboutWrapper">
      {/* Hero Section */}
      <div className="hero">
        <div className="heroText">
          <div className="heroBadge">ABOUT FURNICART</div>
          <h1>
            Crafting spaces, one piece at a <span className="brand">time.</span>
          </h1>
          <p>
            We believe every home deserves furniture that tells a story. Founded
            in 2018, FurniCart brings premium, handcrafted furniture directly to
            your doorstep.
          </p>
          <div className="stats">
            <div className="stat">
              <div className="statNum">12K+</div>
              <div className="statLabel">HAPPY CUSTOMERS</div>
            </div>
            <div className="stat">
              <div className="statNum">850+</div>
              <div className="statLabel">PRODUCTS</div>
            </div>
            <div className="stat">
              <div className="statNum">6</div>
              <div className="statLabel">YEARS EXPERIENCE</div>
            </div>
          </div>
        </div>
        <div className="heroVisual">
          <img
            src="signupimg.svg"
            alt="Furniture illustration"
            width={360}
            height={320}
          />
        </div>
      </div>

      {/* Our Story Section */}
      <div className="section bgWarm twoCol">
        <div className="storyText">
          <div className="sectionLabel">OUR STORY</div>
          <div className="accentLine"></div>
          <h2>Born from a love of beautiful spaces</h2>
          <p>
            FurniCart started in a small workshop in Bangalore, where our
            founders believed that great furniture shouldn't be a luxury — it
            should be accessible to everyone who cares about their home.
          </p>
          <p>
            Today, we partner with skilled artisans across India to bring you
            pieces that blend timeless craftsmanship with modern design
            sensibilities.
          </p>
        </div>
        <div className="storyFeatures">
          <div className="featureItem">
            <div className="featureIcon">🪑</div>
            <div>
              <div className="featureTitle">Handpicked materials</div>
              <div className="featureSub">Only the finest wood and fabrics</div>
            </div>
          </div>
          <div className="featureItem">
            <div className="featureIcon">🚚</div>
            <div>
              <div className="featureTitle">Fast delivery</div>
              <div className="featureSub">Delivered within 7 days</div>
            </div>
          </div>
          <div className="featureItem">
            <div className="featureIcon">⭐</div>
            <div>
              <div className="featureTitle">5-star quality</div>
              <div className="featureSub">Rated 4.9 by our customers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="section bgWhite">
        <div className="sectionLabel centerText">OUR VALUES</div>
        <h2 className="centerText">What drives us every day</h2>
        <div className="valuesGrid">
          {[
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <rect
                    x="2"
                    y="8"
                    width="18"
                    height="12"
                    rx="3"
                    fill="#C8722A"
                    opacity="0.8"
                  />
                  <rect
                    x="6"
                    y="4"
                    width="10"
                    height="6"
                    rx="2"
                    fill="#E8955A"
                  />
                </svg>
              ),
              title: "Quality first",
              desc: "Every piece undergoes rigorous quality checks before it reaches your home. No compromises.",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle
                    cx="11"
                    cy="11"
                    r="8"
                    stroke="#C8722A"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M7 11l3 3 5-5"
                    stroke="#C8722A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ),
              title: "Customer trust",
              desc: "We build lasting relationships. Your satisfaction is our most important metric.",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path
                    d="M11 3c-4.4 0-8 2.7-8 6 0 2 1.2 3.8 3 5l-1 3 4-2c.6.1 1.3.2 2 .2 4.4 0 8-2.7 8-6s-3.6-6.2-8-6.2z"
                    fill="#C8722A"
                    opacity="0.7"
                  />
                </svg>
              ),
              title: "Transparency",
              desc: "Clear pricing, honest timelines, and no hidden fees. What you see is what you get.",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path
                    d="M3 17l4-4 4 4 4-6 4 6"
                    stroke="#C8722A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ),
              title: "Sustainability",
              desc: "We source responsibly and support artisans who use eco-friendly practices.",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <rect
                    x="3"
                    y="5"
                    width="16"
                    height="12"
                    rx="2"
                    stroke="#C8722A"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M7 9h8M7 13h5"
                    stroke="#C8722A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              ),
              title: "Easy returns",
              desc: "Not happy? We offer hassle-free 30-day returns with no questions asked.",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle
                    cx="8"
                    cy="8"
                    r="4"
                    stroke="#C8722A"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="15"
                    cy="14"
                    r="4"
                    stroke="#C8722A"
                    strokeWidth="1.5"
                  />
                </svg>
              ),
              title: "Community",
              desc: "We support local craftsmen and give back to communities that inspire our designs.",
            },
          ].map((val, i) => (
            <div className="valueCard" key={i}>
              <div className="valueIcon">{val.icon}</div>
              <h3>{val.title}</h3>
              <p>{val.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="teamSection">
        <div className="sectionLabel centerText">THE TEAM</div>
        <h2 className="centerText">The people behind FurniCart</h2>
        <div className="teamGrid">
          {[
            {
              initials: "KK",
              name: "Krishna Kumar",
              bg: "#F5EDE0",
              color: "#C8722A",
            },
            {
              initials: "L",
              name: "Lohith",
              bg: "#E8F5F0",
              color: "#0F6E56",
            },
            {
              initials: "A",
              name: "Abhishekh",
              bg: "#EDE8F5",
              color: "#534AB7",
            },
            {
              initials: "A",
              name: "Ashwith",
              bg: "#60565c",
              color: "#ea31b9",
            }
          ].map((member, i) => (
            <div className="teamCard" key={i}>
              <div
                className="avatar"
                style={{ background: member.bg, color: member.color }}
              >
                {member.initials}
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="ctaSection">
        <div className="sectionLabel centerText">GET STARTED</div>
        <h2>Ready to transform your home?</h2>
        <p>
          Browse our collection of premium furniture and find pieces you will
          love.
        </p>
        <button className="ctaBtn" onClick={() => navigateTo("/")}>Shop now</button>
      </div>
    </div>
  );
}

export default AboutUs;
