// App.jsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Users, Server, Shield, MessageSquare, Hash, Zap, Sparkles, Star, User, Code, Briefcase, Activity, CheckCircle } from 'lucide-react';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import NebulaEngine from './NebulaEngine';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const containerRef = useRef(null);
  const [discordStats, setDiscordStats] = useState({
    onlineMembers: 2847,
    serverStatus: 'Operational',
    uptime: '99.98%',
    isLoading: false
  });

  // Simulate live Discord stats with random fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setDiscordStats(prev => ({
        ...prev,
        onlineMembers: Math.max(2500, prev.onlineMembers + Math.floor(Math.random() * 15) - 7),
        serverStatus: prev.serverStatus === 'Operational' && Math.random() > 0.95 ? 'Peak Load' : 'Operational',
        uptime: '99.98%'
      }));
    }, 35000);
    return () => clearInterval(interval);
  }, []);

  // Generate floating particles (lightweight CSS-based)
  useEffect(() => {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    const particleCount = window.innerWidth < 768 ? 25 : 45;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particle.style.opacity = Math.random() * 0.4 + 0.1;
      particlesContainer.appendChild(particle);
    }
    return () => {
      while (particlesContainer.firstChild) particlesContainer.removeChild(particlesContainer.firstChild);
    };
  }, []);

  // Rule cards data
  const rules = [
    { icon: Shield, title: 'Respect First', desc: 'Treat all members with dignity and kindness.', color: '#9B59B6' },
    { icon: MessageSquare, title: 'Quality Content', desc: 'Share meaningful discussions & creations.', color: '#00FFFF' },
    { icon: Zap, title: 'Zero Spam', desc: 'No excessive self-promotion or flooding.', color: '#9B59B6' },
    { icon: User, title: 'Privacy Guard', desc: 'Respect personal boundaries & data.', color: '#00FFFF' },
    { icon: Hash, title: 'Channel Harmony', desc: 'Post in the correct dedicated channels.', color: '#9B59B6' }
  ];

  const specialtyRoles = [
    { 
      title: 'ANIMATORS', 
      icon: Sparkles, 
      members: '14 Creatives',
      desc: 'Motion wizards & visual storytellers',
      gradient: 'linear-gradient(135deg, #9B59B6, #00FFFF)'
    },
    { 
      title: 'STAFF', 
      icon: Briefcase, 
      members: '8 Leaders',
      desc: 'Guardians of the Nebula realm',
      gradient: 'linear-gradient(135deg, #00FFFF, #9B59B6)'
    }
  ];

  return (
    <div ref={containerRef} data-scroll-container className="app-container">
      {/* Particle Background */}
      <div className="particles"></div>

      {/* Hero Section */}
      <section className="hero-section" data-scroll-section>
        <div className="hero-content">
          <div className="logo-container">
            <h1 className="nebula-logo">NEBULA</h1>
            <div className="logo-glow"></div>
          </div>
          <p className="hero-tagline">Where creativity meets the cosmic frontier</p>
          <div className="hero-cta">
            <button className="cta-primary">Join the Collective</button>
            <button className="cta-secondary">Explore Realms</button>
          </div>
        </div>
      </section>

      {/* Discord Stats Section */}
      <section className="stats-section" data-scroll-section>
        <div className="section-header">
          <h2 className="section-title">Live <span className="accent">Nexus</span> Status</h2>
          <div className="title-glow"></div>
        </div>
        <div className="stats-grid">
          <div className="stat-card glass-card">
            <div className="stat-icon purple-glow">
              <Users size={32} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Online Members</span>
              <span className="stat-value">{discordStats.onlineMembers.toLocaleString()}</span>
              <div className="stat-trend">live fluctuation</div>
            </div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-icon cyan-glow">
              <Server size={32} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Server Status</span>
              <span className="stat-value">{discordStats.serverStatus}</span>
              <div className="stat-trend flex items-center gap-1"><Activity size={12}/> Uptime {discordStats.uptime}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section className="rules-section" data-scroll-section>
        <div className="section-header">
          <h2 className="section-title">The <span className="accent">Cosmic Code</span></h2>
          <p className="section-subtitle">Five pillars of our stellar community</p>
        </div>
        <div className="rules-grid">
          {rules.map((rule, idx) => (
            <div key={idx} className="rule-card glass-card" data-rule-index={idx}>
              <div className="rule-icon" style={{ color: rule.color }}>
                <rule.icon size={28} />
              </div>
              <h3 className="rule-title">{rule.title}</h3>
              <p className="rule-desc">{rule.desc}</p>
              <div className="rule-glow" style={{ background: rule.color }}></div>
            </div>
          ))}
        </div>
      </section>

      {/* Specialty Roles Section */}
      <section className="roles-section" data-scroll-section>
        <div className="section-header">
          <h2 className="section-title">Specialty <span className="accent">Constellations</span></h2>
          <p className="section-subtitle">Elite forces driving the nebula engine</p>
        </div>
        <div className="roles-grid">
          {specialtyRoles.map((role, idx) => (
            <div key={idx} className="role-card glass-card" style={{ '--gradient': role.gradient }}>
              <div className="role-avatar">
                <role.icon size={48} strokeWidth={1.5} />
              </div>
              <h3 className="role-title">{role.title}</h3>
              <p className="role-members">{role.members} active</p>
              <p className="role-desc">{role.desc}</p>
              <div className="role-hover-effect"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" data-scroll-section>
        <p>© 2025 NEBULA — Infinite horizons, infinite creation.</p>
      </footer>
    </div>
  );
};

export default App;