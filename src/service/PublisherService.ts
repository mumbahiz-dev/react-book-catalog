import axios from "axios";
import { PublihserDto } from "../dtos/PublisherDtos";

export const PublisherService = {
  async findBuplishers(): Promise<PublihserDto[]> {
    const testcon = this.timeConversion();
    const resApi = await axios.get("/api/publisher").then((res) => {
      return res.data;
    });

    const resDto: PublihserDto[] = resApi.map(
      (res: { id: string; name: string }) => {
        const dto = new PublihserDto();
        dto.id = res.id;
        dto.name = res.name;

        return dto;
      }
    );

    return resDto;
  },

  timeConversion() {
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x).toLowerCase());
    const numbers = [
      1, 3, 1, 3, 1, 4, 1, 3, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
      5,
    ];

    const word = "abc";
    const targetAlphabet = [];
    for (let i = 0; i < word.length; i++) {
      const data = alphabet
        .map((a, index) => {
          if (a === word.charAt(i)) {
            return numbers[index];
          }
        })
        .filter((s) => s !== undefined);

      if (data) {
        console.log("data", data);
        targetAlphabet.push(data[0]);
      }
    }
    console.log("index", targetAlphabet.length * Math.max(...targetAlphabet));
    return alphabet;
  },
};
