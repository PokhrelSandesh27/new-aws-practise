import ReactDOMServer from 'react-dom/server';
import parser from 'ua-parser-js';
import mediaQuery from 'css-mediaquery';
import { ThemeProvider } from '@material-ui/core/styles';

function handleRender(req, res) {
    const deviceType = parser(req.headers['user-agent']).device.type || 'desktop';
    const ssrMatchMedia = query => ({
        matches: mediaQuery.match(query, {
            // The estimated CSS width of the browser.
            width: deviceType === 'mobile' ? '0px' : '1024px',
        }),
    });

    const html = ReactDOMServer.renderToString(
        <ThemeProvider
            theme={{
                props: {
                    // Change the default options of useMediaQuery
                    MuiUseMediaQuery: { ssrMatchMedia },
                },
            }}
        >
            <App />
        </ThemeProvider>,
    );

    // …
}
