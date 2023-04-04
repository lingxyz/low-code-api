import { AppService } from './app.service';
import { EntityManager } from 'typeorm';
export declare class AppController {
    private readonly appService;
    private readonly entityManager;
    constructor(appService: AppService, entityManager: EntityManager);
    getHello(queryParams: any): Promise<{}>;
}
