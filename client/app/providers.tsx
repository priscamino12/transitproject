// app/providers.tsx
"use client";

import React, { ReactNode, useMemo } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from "@/store"; // store exporté ci-dessus

export default function Providers({ children }: { children: ReactNode }) {
  // Persist only on client: useMemo ensures it's created once
  const persistor = useMemo(() => {
    if (typeof window === "undefined") return null;
    return persistStore(store);
  }, []);

  // If persistor is null (server), render Provider without PersistGate
  if (!persistor) {
    return <Provider store={store}>{children}</Provider>;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
