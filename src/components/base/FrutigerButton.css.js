// src/components/base/Button.css.ts
import { style } from '@vanilla-extract/css';
export const button = style({
    // Frutiger Aero vibes
    padding: '2px 20px',
    borderRadius: '0px',
    border: '1px solid rgba(255, 255, 255, 0.6)',
    background: 'linear-gradient(135deg, #ffffffff, #7a7a7aff)', // light blue gradient
    boxShadow: '0 4px 12px rgba(124, 124, 124, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
    color: '#000000ff',
    fontWeight: 600,
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    // Playful hover
    ':hover': {
        background: 'linear-gradient(135deg, #b3e5fc, #90caf9)',
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
    },
    // Subtle press
    ':active': {
        transform: 'translateY(0)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
    },
    // Focus for accessibility
    ':focus-visible': {
        outline: '2px solid #2962ff',
        outlineOffset: '2px',
    },
});
