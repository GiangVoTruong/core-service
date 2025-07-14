import { Users } from '@/entities/user.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findOne(username: string) {
    if (username) {
      return await this.usersRepository.findOne({
        where: { username },
      })
    }

    return null
  }
}
