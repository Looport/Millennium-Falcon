import {IsEmail, IsString, Length} from "class-validator";

export class CredentialsDto {
  @IsEmail()
  email: string

  @IsString()
  @Length(6)
  password: string
}
