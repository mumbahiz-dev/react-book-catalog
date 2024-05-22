import { SignInReqDto } from "../dtos/SignInReqDto";
import { SignInResDto } from "../dtos/SignInResDto";

export const AuthService = {
  async signin(dto: SignInReqDto): Promise<SignInResDto> {
    const response = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(dto),
    });
    const resJson = await response.json();
    const resDto: SignInResDto = {
      accessoken: resJson.access_token,
    };
    return resDto;
  },
};
