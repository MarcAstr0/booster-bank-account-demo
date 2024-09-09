import { Projects, ReadModel } from '@boostercloud/framework-core';
import { ProjectionInfo, ProjectionInfoReason, ProjectionResult, ReadModelAction, UUID } from '@boostercloud/framework-types';
import { Account } from '../entities/account';

@ReadModel({
    authorize: 'all'
})
export class AccountReadModel {
    public constructor(
        public id: UUID,
        public balance: number
    ) {}

    @Projects(Account, 'id', AccountReadModel.projectAccount)
    public static projectAccount(
        entity: Account,
        currentAccountReadModel?: AccountReadModel,
        projectionInfo?: ProjectionInfo
    ): ProjectionResult<AccountReadModel> {
        if (projectionInfo?.reason === ProjectionInfoReason.ENTITY_DELETED) {
            return ReadModelAction.Delete
        }
        return new AccountReadModel(entity.id, entity.balance)
    }
}