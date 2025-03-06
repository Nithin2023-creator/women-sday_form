// In your tailwind.config.js
module.exports = {
  // ... other config
  theme: {
    extend: {
      animation: {
        'float': 'float 15s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.5s ease-in forwards',
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 1 },
        },
      },
    },
  },
  // ... other config
};