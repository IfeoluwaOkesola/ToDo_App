import { Injectable } from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/shared/repository/base.repositpry';
import { EntityManager, Repository } from 'typeorm';
import { Users } from '../entity/user.entity';

@Injectable()
export class UserRepository extends BaseRepository<Users> {
  constructor(
    @InjectRepository(Users) private userModel: Repository<Users>,
    private UserRepo: Repository<Users>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    super(userModel);
    this.UserRepo = this.entityManager.getRepository(Users);
  }

  async save(data: Users) {
    return await this.UserRepo.save(data);
  }
}
