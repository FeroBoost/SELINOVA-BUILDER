import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';

import { HomePage } from '@/pages/HomePage';
import { MarketplacePage } from '@/pages/MarketplacePage';
import { ListingDetailPage } from '@/pages/ListingDetailPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ImpressumPage } from '@/pages/ImpressumPage';
import { AGBPage } from '@/pages/AGBPage';
import { DatenschutzPage } from '@/pages/DatenschutzPage';
import { RechtlichesPage } from '@/pages/RechtlichesPage';
import { MietvertragPage } from '@/pages/MietvertragPage';
import { KaufvertragPage } from '@/pages/KaufvertragPage';
import { IntroScreen } from '@/components/IntroScreen';

const queryClient = new QueryClient();

function RedirectWithQuery({ to }: { to: string }) {
  const [, setLocation] = useLocation();
  useEffect(() => {
    setLocation(to, { replace: true });
  }, [to, setLocation]);
  return null;
}

function Router() {
  return (
    <Switch>
      {/* ── Main pages ── */}
      <Route path="/" component={HomePage} />
      <Route path="/marktplatz" component={MarketplacePage} />
      <Route path="/listing/:id" component={ListingDetailPage} />

      {/* ── Redirects ── */}
      <Route path="/kaufen">
        <RedirectWithQuery to="/marktplatz?type=buy" />
      </Route>
      <Route path="/mieten">
        <RedirectWithQuery to="/marktplatz?type=rent" />
      </Route>
      <Route path="/kategorie/:slug">
        {(params) => <RedirectWithQuery to={`/marktplatz?category=${params.slug}`} />}
      </Route>

      {/* ── Legal pages ── */}
      <Route path="/impressum" component={ImpressumPage} />
      <Route path="/agb" component={AGBPage} />
      <Route path="/datenschutz" component={DatenschutzPage} />
      <Route path="/rechtliches" component={RechtlichesPage} />
      <Route path="/rechtliches/mietvertrag" component={MietvertragPage} />
      <Route path="/rechtliches/kaufvertrag" component={KaufvertragPage} />

      <Route component={NotFoundPage} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Intro splash — fixed overlay, renders above everything, once per session */}
      <IntroScreen />

      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
