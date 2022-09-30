import WebFontLoader from 'webfontloader';

const loadFonts = () => 
    WebFontLoader.load({
        google: {
            families: [
                'Roboto:300,400,500,600,700,800,900', 
                'Open Sans:300,400,500,600,700,800',
            ],
        },
    });

export default loadFonts;