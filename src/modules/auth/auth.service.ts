import { Injectable, UnauthorizedException } from '@nestjs/common'
import { LoginDto } from '../users/dto/login-dto'
import { UsersService } from '../users/user.service'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'
import { Users } from '@/entities/user.entity'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<any> {
    const user = await this.usersService.findOne(loginDto.username)
    if (!user || !(await argon2.verify(user.password, loginDto.password))) {
      throw new UnauthorizedException('Invalid username or password')
    }
    return user
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto)

    return {
      ...this.generateTokens(user),
      tokenType: 'Bearer',
    }
  }

  private generateTokens(user: Users) {
    const payload = { sub: user.id, username: user.username, role: user.role }

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    }
  }
}
