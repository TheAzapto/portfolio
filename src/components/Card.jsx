import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../style/card.css';

const Card = ({ title, description, image, link, isActive }) => {
    const cardRef = useRef(null);
    const contentRef = useRef(null);
    const [isExpanded, setIsExpanded] = React.useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    // Reveal animation when this card becomes the active slide
    useEffect(() => {
        if (!cardRef.current) return;

        if (isActive) {
            gsap.fromTo(cardRef.current,
                { scale: 0.92, opacity: 0.5 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power3.out',
                }
            );
        } else {
            gsap.to(cardRef.current, {
                scale: 0.92,
                opacity: 0.7,
                duration: 0.4,
                ease: 'power2.inOut',
            });
        }
    }, [isActive]);

    return (
        <div
            className={`card ${isExpanded ? 'expanded' : ''}`}
            onClick={toggleExpand}
            ref={cardRef}
            style={{ perspective: '800px' }}
        >
            {image ? (
                <img src={image} alt={title} className="card-image" />
            ) : (
                <div className="card-image" style={{
                    backgroundColor: '#1a1a1a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#333',
                    fontSize: '2rem',
                    fontFamily: 'monospace'
                }}>
                    NO SIGNAL
                </div>
            )}
            <div className="card-overlay">
                <div className="card-content" ref={contentRef}>
                    <h3 className="card-title">{title}</h3>

                    <div className="card-details">
                        <p className="card-description">{description}</p>
                        <div className="card-actions">
                            <a
                                href={link}
                                className="card-btn"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                            >
                                Explore Project
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
