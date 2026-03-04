import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Mail, MapPin, Github, Linkedin, ExternalLink } from 'lucide-react'
import Navbar from '../components/Navbar'
import '../style/contact.css'

const GOOGLE_FORM_URL = 'https://forms.gle/B6Xm4uxF69uNWYYJ6' // TODO: replace with your Google Form link

function Contact() {
  const headerRef = useRef(null)
  const infoRef = useRef(null)
  const ctaRef = useRef(null)
  const socialsRef = useRef(null)
  const availRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Header stagger
      if (headerRef.current) {
        const items = headerRef.current.children
        tl.fromTo(items,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, delay: 0.3 }
        )
      }

      // Availability badge
      tl.fromTo(availRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.2'
      )

      // Info cards stagger
      if (infoRef.current) {
        const cards = infoRef.current.children
        tl.fromTo(cards,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, stagger: 0.12 },
          '-=0.3'
        )
      }

      // Social links
      tl.fromTo(socialsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.2'
      )

      // CTA card
      tl.fromTo(ctaRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.4'
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className='contact-container'>
      <Navbar />
      <div className='contact-page'>
        <div className='contact-inner'>
          {/* ─── Header ─── */}
          <div className='contact-header' ref={headerRef}>
            <div className='contact-accent-line'></div>
            <span className='contact-label'>Get In Touch</span>
            <h1 className='contact-title'>Let's Work Together</h1>
            <p className='contact-subtitle'>
              Have a project in mind or just want to say hello? I'd love to hear from you.
              I usually respond within 24 hours.
            </p>
          </div>

          {/* ─── Availability ─── */}
          <div className='contact-availability' ref={availRef}>
            <span className='contact-availability-dot'></span>
            Available for freelance &amp; full-time opportunities
          </div>

          {/* ─── Content ─── */}
          <div className='contact-grid'>
            {/* ── Left: Info ── */}
            <div className='contact-info-col'>
              <div className='contact-info' ref={infoRef}>
                <a href='mailto:aayushdutta03@gmail.com' className='contact-info-card' style={{ textDecoration: 'none' }}>
                  <div className='contact-info-icon'><Mail size={20} /></div>
                  <div className='contact-info-details'>
                    <h3>Email</h3>
                    <p>aayushdutta03@gmail.com</p>
                  </div>
                </a>

                <div className='contact-info-card'>
                  <div className='contact-info-icon'><MapPin size={20} /></div>
                  <div className='contact-info-details'>
                    <h3>Location</h3>
                    <p>India</p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className='contact-socials' ref={socialsRef}>
                <a href='https://github.com/TheAzapto' target='_blank' rel='noopener noreferrer' className='contact-social-link' aria-label='GitHub'>
                  <Github size={20} />
                </a>
                <a href='https://www.linkedin.com/in/aayush-dutta-8801a4330/' target='_blank' rel='noopener noreferrer' className='contact-social-link' aria-label='LinkedIn'>
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* ── Right: Google Form CTA ── */}
            <div className='contact-cta-wrapper' ref={ctaRef}>
              <div className='contact-cta-card'>
                <div className='contact-cta-icon'>
                  <Mail size={32} />
                </div>
                <h2 className='contact-cta-title'>Send Me a Message</h2>
                <p className='contact-cta-desc'>
                  Fill out a quick form and I'll get back to you as soon as possible.
                </p>
                <a
                  href={GOOGLE_FORM_URL}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='contact-submit-btn'
                >
                  <span>Open Contact Form</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact