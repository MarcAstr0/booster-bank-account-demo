import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { AccountOpened } from '../events/account-opened'

@Command({
  authorize: 'all'
})
export class OpenAccount {
  public constructor(
  ) {}

  public static async handle(command: OpenAccount , register: Register): Promise<void> {
    const newAccountNumber = UUID.generate()
    register.events(new AccountOpened(newAccountNumber))
  }
}
