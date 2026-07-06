import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';

import { HomePage } from '@/pages/HomePage';
import { MarketplacePage } from '@/pages/MarketplacePage';
import { ListingDetailPage } from '@/pages/ListingDetailPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
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
      <Route path="/" component={HomePage} />
      <Route path="/marktplatz" component={MarketplacePage} />
      <Route path="/kaufen">
        <RedirectWithQuery to="/marktplatz?type=buy" />
      </Route>
      <Route path="/mieten">
        <RedirectWithQuery to="/marktplatz?type=rent" />
      </Route>
      <Route path="/kategorie/:slug">
        {(params) => <RedirectWithQuery to={`/marktplatz?category=${params.slug}`} />}
      </Route>
      <Route path="/listing/:id" component={ListingDetailPage} />
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
