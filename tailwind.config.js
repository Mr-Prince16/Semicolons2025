/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            boxShadow: {
                neu: "6px 6px 10px rgba(0, 0, 0, 0.3), -6px -6px 10px rgba(255, 255, 255, 0.1)",
                neuActive: "inset 4px 4px 6px rgba(0, 0, 0, 0.3), inset -4px -4px 6px rgba(255, 255, 255, 0.1)",
            },
            backgroundImage: {
                'light-mode': 'linear-gradient(135deg, #6a11cb, #2575fc, #833ab4)',
                'dark-mode': 'linear-gradient(135deg, #000000, #434343, #1a1a40)',
                'colorblind-protanopia': 'linear-gradient(135deg, #ffcc00, #ff9900, #ff6600)',
                'colorblind-deuteranopia': 'linear-gradient(135deg, #00cc66, #33aa33, #006633)',
                'colorblind-tritanopia': 'linear-gradient(135deg, #ff3399, #cc3366, #990033)',
                'colorblind-achromatopsia': 'linear-gradient(135deg, #cccccc, #888888, #444444)',
                'rain-dark': "url('/assets/Dark-Mode.jpg')",
                'Deuteranopia': "url('/assets/Deuteranopia.jpg')",
                'Normal-Condition': "url('/assets/Normal-Condition.jpg')",
                'Tritanopia': "url('/assets/Tritanopia.jpg')",
                'Protanopia': "url('/assets/Protanopia.jpeg')",
                'Rain-default': "url('/assets/Rain-default.jpg')",
            },
            boxShadow: {
                'neo': '8px 8px 16px #bebebe, -8px -8px 16px #ffffff',
            },
            backdropBlur: {
                glass: '8px',
            },
        },
    },
    safelist: [
        'bg-Rain-default',
        'bg-Normal-Condition',
        'bg-Protanopia',
        'bg-Deuteranopia',
        'bg-Tritanopia',
        'bg-rain-dark',
        'text-white',
        'text-green-500',
        'text-orange-700',
        'text-purple-900',
        'text-gray-600',
        'text-gray-900',
        'text-green-700', 'dark:text-green-500',
        'text-yellow-700', 'dark:text-yellow-500',
        'text-red-700', 'dark:text-red-500',
        'text-blue-700', 'dark:text-blue-500',
        'text-indigo-700', 'dark:text-indigo-500',
        'text-gray-700', 'dark:text-gray-400',
        'bg-green-500', 'dark:bg-green-400', 'bg-opacity-100',
        'bg-yellow-500', 'dark:bg-yellow-400', 'bg-opacity-100',
        'bg-red-500', 'dark:bg-red-400', 'bg-opacity-100',
        'bg-blue-500', 'dark:bg-blue-400', 'bg-opacity-100',
        'bg-indigo-500', 'dark:bg-indigo-400', 'bg-opacity-100',
        'bg-gray-600', 'dark:bg-gray-400', 'bg-opacity-100'
    ],
    plugins: [],
}