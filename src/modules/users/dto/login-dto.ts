import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class LoginDto {
  @ApiProperty({ required: true, default: 'admin' })
  @IsString()
  username: string

  @ApiProperty({ required: true, default: '123' })
  @IsString()
  password: string

  @IsString()
  @IsOptional()
  role?: string
}
