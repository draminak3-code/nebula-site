// NebulaEngine.js
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

class NebulaAnimationEngine {
  constructor() {
    this.scrollTrigger = ScrollTrigger;
    this.timelines = {};
    this.initialized = false;
  }

  init(locomotiveScrollInstance = null) {
    if (this.initialized) return;
    
    // Setup scroll trigger with locomotive-scroll if provided
    if (locomotiveScrollInstance) {
      this.scrollTrigger.scrollerProxy('[data-scroll-container]', {
        scrollTop(value) {
          return arguments.length 
            ? locomotiveScrollInstance.scrollTo(value, 0, 0) 
            : locomotiveScrollInstance.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector('[data-scroll-container]').style.transform ? "transform" : "fixed"
      });
      
      locomotiveScrollInstance.on('scroll', () => {
        this.scrollTrigger.update();
      });
    }
    
    this.createHeroAnimations();
    this.createScrollReveals();
    
    this.scrollTrigger.refresh();
    this.initialized = true;
    
    // Handle resize
    window.addEventListener('resize', () => this.scrollTrigger.refresh());
  }

  createHeroAnimations() {
    const heroTimeline = gsap.timeline({ 
      defaults: { ease: "power3.out", duration: 0.8 },
      delay: 0.2
    });
    
    heroTimeline
      .from('.nebula-logo', {
        scale: 0.8,
        opacity: 0,
        filter: "blur(12px)",
        duration: 1.2,
        ease: "back.out(1.2)"
      })
      .from('.hero-tagline', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9
      }, "-=0.5")
      .from('.hero-cta .cta-primary', {
        y: 30,
        opacity: 0,
        scale: 0.9,
        duration: 0.6
      }, "-=0.3")
      .from('.hero-cta .cta-secondary', {
        y: 30,
        opacity: 0,
        scale: 0.9,
        duration: 0.6
      }, "-=0.4");
    
    this.timelines.hero = heroTimeline;
  }

  createScrollReveals() {
    // Stats cards reveal
    gsap.from('.stat-card', {
      scrollTrigger: {
        trigger: '.stats-section',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 70,
      opacity: 0,
      duration: 0.9,
      stagger: 0.2,
      ease: "power2.out"
    });
    
    // Rules cards staggered reveal
    gsap.from('.rule-card', {
      scrollTrigger: {
        trigger: '.rules-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 60,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "back.out(0.6)"
    });
    
    // Role cards with advanced 3D like effect
    gsap.from('.role-card', {
      scrollTrigger: {
        trigger: '.roles-section',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
      scale: 0.85,
      opacity: 0,
      rotationY: 12,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      transformOrigin: "center center"
    });
    
    // Additional subtle floating effect for each role card on hover is CSS but we add extra shine
    // Add section header animations
    gsap.from('.section-header', {
      scrollTrigger: {
        trigger: '.section-header',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.3
    });
    
    // Individual rule card hover enhancements via GSAP (lightweight)
    document.querySelectorAll('.rule-card').forEach((card, index) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -8, duration: 0.3, ease: "power2.out", boxShadow: "0 20px 30px rgba(0,0,0,0.4)" });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out", boxShadow: "none" });
      });
    });
  }
  
  refresh() {
    this.scrollTrigger.refresh();
  }
  
  destroy() {
    this.scrollTrigger.getAll().forEach(trigger => trigger.kill());
    Object.values(this.timelines).forEach(timeline => timeline.kill());
    window.removeEventListener('resize', this.refresh);
  }
}

const nebulaEngine = new NebulaAnimationEngine();
export default nebulaEngine;