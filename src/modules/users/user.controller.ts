import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { UsersService } from './user.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Users } from '@/entities/user.entity'
import { Repository } from 'typeorm'

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  @Get()
  async getAllUser() {
    const users = await this.usersRepository.find({
      select: ['username'],
    })
    return users
  }
}
