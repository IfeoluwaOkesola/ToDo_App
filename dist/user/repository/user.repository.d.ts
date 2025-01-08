import { BaseRepository } from 'src/shared/repository/base.repositpry';
import { EntityManager, Repository } from 'typeorm';
import { Users } from '../entity/user.entity';
export declare class UserRepository extends BaseRepository<Users> {
    private userModel;
    private UserRepo;
    private readonly entityManager;
    constructor(userModel: Repository<Users>, UserRepo: Repository<Users>, entityManager: EntityManager);
    save(data: Users): Promise<Users>;
}
