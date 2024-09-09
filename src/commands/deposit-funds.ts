import { Booster, Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { Account } from '../entities/account'
import { FundsDeposited } from '../events/funds-deposited'

@Command({
  authorize: 'all'
})
export class DepositFunds {
  public constructor(
    readonly accountNumber: UUID,
    readonly amount: number,
  ) {}

  public static async handle(command: DepositFunds , register: Register): Promise<void> {
    const account = await Booster.entity(Account, command.accountNumber)
    if (account) {
      register.events(new FundsDeposited(command.accountNumber, command.amount))
    } else {
      register.events(new ErrorEvent(`Account ${command.accountNumber} not found`))
    }
  }
}
