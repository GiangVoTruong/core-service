import { I18nTranslations } from '@/generated/i18n.generated'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { I18nContext } from 'nestjs-i18n'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service'
import { UsersService } from '@/modules/users/user.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super()
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username)
    if (!user) {
      throw new UnauthorizedException('Invalid username or password')
    }
    return user
  }
}
