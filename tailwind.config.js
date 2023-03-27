/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.tsx',
        './components/**/*.tsx',
    ],
    theme: {
        extend: {
            width: {
                '1/24': '4.1666666667%',
                '2/24': '8.3333333333%',
                '3/24': '12.5%',
                '4/24': '16.6666666667%',
                '5/24': '20.8333333333%',
                '6/24': '25%',
                '7/24': '29.1666666667%',
                '8/24': '33.3333333333%',
                '9/24': '37.5%',
                '10/24': '41.6666666667%',
                '11/24': '45.8333333333%',
                '12/24': '50%',
                '13/24': '54.1666666667%',
                '14/24': '58.3333333333%',
                '15/24': '62.5%',
                '16/24': '66.6666666667%',
                '17/24': '70.8333333333%',
                '18/24': '75%',
                '19/24': '79.1666666667%',
                '20/24': '83.3333333333%',
                '21/24': '87.5%',
                '22/24': '91.6666666667%',
                '23/24': '95.8333333333%',
                '18': '4.5rem',
                '128': '32rem',
                '125': '31.25rem',
                '120': '30rem',
                '115': '28.75rem',
                '110': '27.5rem',
                '105': '26.25rem',
                '100': '25rem',
            },
            height: {
                '125': '31.25rem',
                '128': '32rem',
                '18': '4.5rem',
            },
            zIndex: {
                '100': '100',
                '110': '110',
            },
            colors: {
                'strava': '#f65900',
                'purple-base': {
                    DEFAULT: '#AE64E0',
                    50: '#F4EAFB',
                    100: '#ECDBF8',
                    200: '#DDBDF2',
                    300: '#CD9FEC',
                    400: '#BE82E6',
                    500: '#AE64E0',
                    600: '#9635D7',
                    700: '#7823B0',
                    800: '#581A82',
                    900: '#381153'
                },
                'lavender': {
                    DEFAULT: '#BD6DE9',
                    50: '#FCF9FE',
                    100: '#F5E9FC',
                    200: '#E7CAF7',
                    300: '#D9ABF2',
                    400: '#CB8CEE',
                    500: '#BD6DE9',
                    600: '#A73CE2',
                    700: '#8C1EC8',
                    800: '#691797',
                    900: '#470F66'
                },
                'ronchi': {
                    DEFAULT: '#EEB853',
                    50: '#FFFDFA',
                    100: '#FDF5E8',
                    200: '#F9E6C2',
                    300: '#F5D79D',
                    400: '#F2C778',
                    500: '#EEB853',
                    600: '#E9A320',
                    700: '#BE8213',
                    800: '#8B5F0E',
                    900: '#583C09'
                },
                'dark': "#0C0521",
                'light-base': "#f7fafc",
                'base': {
                    DEFAULT: '#0C0521',
                    50: '#734EE4',
                    100: '#673EE2',
                    200: '#5021DB',
                    300: '#441CBC',
                    400: '#39189D',
                    500: '#2E137E',
                    600: '#230E5F',
                    700: '#170A40',
                    800: '#0C0521',
                    900: '#070314'
                },
            },
        }

    },
    plugins: [],
}