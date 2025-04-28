import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('User')
@Controller('user')
export class UserController {
  @Get('')
  getUser() {
    return 'user'
  }
}
