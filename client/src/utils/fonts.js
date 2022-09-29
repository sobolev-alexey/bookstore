import WebFontLoader from 'webfontloader';

export default () => 
    WebFontLoader.load({
        google: {
            families: [
                'Roboto:300,400,500,600,700,800,900', 
                'Open Sans:300,400,500,600,700,800',
            ],
        },
    });