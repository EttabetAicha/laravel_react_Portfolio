import { Helmet } from 'react-helmet-async';

import { PortfolioView } from 'src/sections/portfolio/view';

// ----------------------------------------------------------------------

export default function PortfolioPage() {
    return (
        <>
            <Helmet>
                <title> portfolio </title>
            </Helmet>

            <PortfolioView />
        </>
    );
}
