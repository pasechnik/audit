// Default Helmet props
export default Object.freeze({
  htmlAttributes: { lang: 'en' },
  title: 'Title',
  defaultTitle: 'Default Title',
  titleTemplate: '%s - Audit App',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  link: [
    { rel: 'shortcut icon', href: '/favicon.ico' },
    { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' },
  ],
  script: [{
    type: 'text/javascript',
    innerHTML: `{
        var WebFontConfig = {
          google: { families: [ 'Roboto:400,300,500:latin' ] }
        };
        (function() {
          var wf = document.createElement('script');
            wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
            wf.type = 'text/javascript';
            wf.async = 'true';
          var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(wf, s);
        })();
    }`,
  }],
  style: [],
})
