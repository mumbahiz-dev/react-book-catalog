import axios from "axios";
import { CategoryDto } from "../dtos/CategoryDto.1";

export const CategoryService = {
  async getCategories(): Promise<CategoryDto[]> {
    const resApi = await axios.get("/api/category").then((res) => {
      return res.data;
    });

    const resDto: CategoryDto[] = resApi.data.map(
      (res: { id: string; name: string }) => {
        const dto = new CategoryDto();
        dto.id = res.id;
        dto.name = res.name;
        return dto;
      }
    );
    return resDto;
  },
};
