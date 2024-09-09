import { Booster, Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { Account } from '../entities/account'
import { FundsWithdrawn } from '../events/funds-withdrawn'

@Command({
  authorize: 'all'
})
export class WithdrawFunds {
  public constructor(
    readonly accountNumber: UUID,
    readonly amount: number,
  ) {}

  public static async handle(command: WithdrawFunds, register: Register): Promise<void> {
    const account = await Booster.entity(Account, command.accountNumber)
    if (account) {
        if (account.balance >= command.amount) {
            register.events(new FundsWithdrawn(command.accountNumber, command.amount))
        } else {
            register.events(new ErrorEvent(`Account ${command.accountNumber} has insufficient funds`))
        }
    } else {
      register.events(new ErrorEvent(`Account ${command.accountNumber} not found`))
    }
  }
}