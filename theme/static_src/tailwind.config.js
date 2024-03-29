/**
 * This is a minimal config.
 *
 * If you need the full config, get it from here:
 * https://unpkg.com/browse/tailwindcss@latest/stubs/defaultConfig.stub.js
 */
const plugin = require('tailwindcss/plugin')
const MyClass = plugin(function ({ addUtilities }) {
    addUtilities({
        ".my-rotate-y-180": {
            transform: "rotateY(180deg)",
        },
        ".preserve-3d": {
            transformStyle: "preserve-3d",
        },
        ".perspective": {
        perspective: "1000px",
        },
        ".backface-hidden": {
            backfaceVisibility: "hidden",
        },
        ".flip": {
            transform: "rotateY(180deg)",
        },
    })
})

module.exports = {
    content: [
        /**
         * HTML. Paths to Django template files that will contain Tailwind CSS classes.
         */

        /*  Templates within theme app (<tailwind_app_name>/templates), e.g. base.html. */
        '../templates/**/*.html',

        /*
         * Main templates directory of the project (BASE_DIR/templates).
         * Adjust the following line to match your project structure.
         */
        '../../templates/**/*.html',

        /*
         * Templates in other django apps (BASE_DIR/<any_app_name>/templates).
         * Adjust the following line to match your project structure.
         */
        '../../**/templates/**/*.html',

        /**
         * JS: If you use Tailwind CSS in JavaScript, uncomment the following lines and make sure
         * patterns match your project structure.
         */
        /* JS 1: Ignore any JavaScript in node_modules folder. */
        // '!../../**/node_modules',
        /* JS 2: Process all JavaScript files in the project. */
        // '../../**/*.js',

        /**
         * Python: If you use Tailwind CSS classes in Python, uncomment the following line
         * and make sure the pattern below matches your project structure.
         */
        // '../../**/*.py'
    ],
    theme: {
        extend: {
            colors: {
                purple: "#A729F5",
                "dark-navy": "#313E51",
                navy: "#3B4D66",
                "grey-navy": "#626C7F",
                "light-bluish": "#626C7F",
                "light-grey": "#F4F6FA",
                green: "#26D782",
                red: "#EE5454",
            },
            fontFamily: {
                rubik: "Rubik, sans-serif",
            },
            boxShadow: {
                sm: "0px 16px 40px 0px rgba(143, 160, 193, 0.14)",
            },
            height: {
                screen: "100dvh",
            },
            screens: {
                laptop: {
                    max: "75em",
                },
                desktop: {
                    max: "64em",
                },
                tablet: {
                    max: "43.75em",
                },
                mobile: {
                    max: "37.5em",
                },
            },
        },
    },
    plugins: [
        /**
         * '@tailwindcss/forms' is the forms plugin that provides a minimal styling
         * for forms. If you don't like it or have own styling for forms,
         * comment the line below to disable '@tailwindcss/forms'.
         */
        MyClass,
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
    ],
}
