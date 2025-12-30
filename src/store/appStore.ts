import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Tenant, City } from "@/types";

interface AppState {
  currentTenant: Tenant | null;
  currentCity: City | null;
  tenants: Tenant[];
  cities: City[];
  setCurrentTenant: (tenant: Tenant | null) => void;
  setCurrentCity: (city: City | null) => void;
  setTenants: (tenants: Tenant[]) => void;
  setCities: (cities: City[]) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentTenant: null,
      currentCity: null,
      tenants: [],
      cities: [],

      setCurrentTenant: (tenant: Tenant | null) =>
        set({ currentTenant: tenant }),
      setCurrentCity: (city: City | null) => set({ currentCity: city }),
      setTenants: (tenants: Tenant[]) => set({ tenants }),
      setCities: (cities: City[]) => set({ cities }),
    }),
    {
      name: "app-storage",
      partialize: (state: AppState) => ({
        currentTenant: state.currentTenant,
        currentCity: state.currentCity,
      }),
    }
  )
);
