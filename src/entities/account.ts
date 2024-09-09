import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { AccountOpened } from '../events/account-opened'
import { FundsDeposited } from '../events/funds-deposited'
import { FundsWithdrawn } from '../events/funds-withdrawn'

@Entity
export class Account {
  public constructor(
    public id: UUID,
    readonly balance: number,
  ) {}

  @Reduces(AccountOpened)
  public static reduceAccountOpened(event: AccountOpened, currentAccount?: Account): Account {
    return new Account(event.accountNumber, 0)
  }

  @Reduces(FundsDeposited)
  public static reduceFundsDeposited(event: FundsDeposited, currentAccount: Account): Account {
    return new Account(event.accountNumber, currentAccount.balance + event.amount)
  }

  @Reduces(FundsWithdrawn)
  public static reduceFundsWithdrawn(event: FundsWithdrawn, currentAccount: Account): Account {
    return new Account(event.accountNumber, currentAccount.balance - event.amount)
  }
}
