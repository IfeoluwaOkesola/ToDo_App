import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repository/user.repository';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    createUser(createUserDto: CreateUserDto): Promise<import("./entity/user.entity").Users>;
    findUserByEmail(email: string): Promise<import("./entity/user.entity").Users>;
}
