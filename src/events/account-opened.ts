import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class AccountOpened {
  public constructor(
    readonly accountNumber: UUID,
  ) {}

  public entityID(): UUID {
    return this.accountNumber
  }
}
