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

  async findOne(id: string): Promise<Users> {
    const user = await this.usersRepository.findOne({ where: { id } })
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }
}
