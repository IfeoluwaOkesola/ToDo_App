import { Repository, DeepPartial, FindOptionsWhere, FindOptionsRelations, FindManyOptions, SelectQueryBuilder } from 'typeorm';
export declare class BaseRepository<Entity> {
    private readonly entity;
    [x: string]: any;
    constructor(entity: Repository<Entity>);
    create(createdEntityData: DeepPartial<Entity>): Promise<Entity>;
    findOne(filterData: FindOptionsWhere<Entity>, relations?: FindOptionsRelations<Entity>): Promise<Entity | undefined>;
    findOneAndUpdate(filterData: FindOptionsWhere<Entity>, updateData: Partial<unknown>): Promise<Entity | undefined>;
    delete(filterData: FindOptionsWhere<Entity>): Promise<boolean>;
    findAll(): Promise<Entity[]>;
    find(filterData: FindOptionsWhere<Entity> | FindManyOptions<Entity>): Promise<Entity[]>;
    createQueryBuilder(alias?: string): Promise<SelectQueryBuilder<Entity>>;
}
