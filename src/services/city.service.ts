import { apiClient } from "@/lib/axios";
import { City } from "@/types";
import { CreateCityParams, UpdateCityParams } from "@/types/city.types";

export const cityService = {
  async getAllCities(): Promise<City[]> {
    const response = await apiClient.get("/admin/cities");
    return response.data;
  },

  async createCity(data: CreateCityParams): Promise<City> {
    const response = await apiClient.post("/admin/cities", data);
    return response.data;
  },

  async updateCity(
    id: string,
    data: Omit<UpdateCityParams, "id">
  ): Promise<City> {
    const response = await apiClient.patch(`/admin/cities/${id}`, data);
    return response.data;
  },
};
