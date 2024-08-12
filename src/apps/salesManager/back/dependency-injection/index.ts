
import { asClass, createContainer, InjectionMode } from 'awilix'
import { UserPrismaRepository } from '../../../../Contexts/User/infraestructure/persistence/UserPrismaRepository'
import { BcryptHasher } from '../../../../Contexts/Shared/infraestructure/BcryptHasher'
import { UserCreator } from '../../../../Contexts/User/application/UserCreator'
import { UserFinder } from '../../../../Contexts/User/application/UserFinder'
import { UserFinderById } from '../../../../Contexts/User/application/UserFinderById'
import { UserPasswordValidator } from '../../../../Contexts/User/application/UserPasswordValidator'
import { SessionHandlerWithJWT } from '../../../../Contexts/Session/infraestructure/SessionHandlerWithJWT'
import { SessionGenerator } from '../../../../Contexts/Session/application/SessionGenerator'
import { SessionUserIdGetter } from '../../../../Contexts/Session/application/SessionUserIdGetter'
import { SessionValidator } from '../../../../Contexts/Session/application/SessionValidator'
import { PrismaItemRepository } from '../../../../Contexts/Items/infraestructure/persistance/PrismaItemRepository'
import { ItemFinder } from '../../../../Contexts/Items/application/searchAll/ItemFinder'
import { ItemCreator } from '../../../../Contexts/Items/application/Create/ItemCreator'

export const container = createContainer({ strict: true, injectionMode: InjectionMode.PROXY })

export const containerKeys = {
  user: {
    creator: 'user.UserCreator',
    finder: 'user.UserFinder',
    finderById: 'user.UserFinderById',
    passwordValidator: 'user.UserPasswordValidator'
  },
  session: {
    generator: 'session.SessionGenerator',
    userIdGetter: 'session.SessionUserIdGetter',
    validator: 'session.SessionValidator'
  },
  item: {
    finder: 'item.ItemFinder',
    creator: 'item.ItemCreator'
  }
}

// TODO split each context in to file
// User Context
container.register({
  userRepository: asClass(UserPrismaRepository),
  stringHasher: asClass(BcryptHasher).inject(() => {
    return { hasherSalt: Number(process.env.HASH_SALT) ?? 10 }
  })
})
container.register({
  [containerKeys.user.creator]: asClass(UserCreator),
  [containerKeys.user.finder]: asClass(UserFinder),
  [containerKeys.user.finderById]: asClass(UserFinderById),
  [containerKeys.user.passwordValidator]: asClass(UserPasswordValidator)
})

// Session Context
container.register({
  sessionHandler: asClass(SessionHandlerWithJWT).inject(() => {
    return {
      secret: process.env.TOKEN_SECRET ?? 'cualquier cosa',
      expiredTime: process.env.TOKEN_EXPIRETION_TIME ?? '1d'
    }
  })
})
container.register({
  [containerKeys.session.generator]: asClass(SessionGenerator),
  [containerKeys.session.userIdGetter]: asClass(SessionUserIdGetter),
  [containerKeys.session.validator]: asClass(SessionValidator)
})

// Item Context
container.register({
  itemRepository: asClass(PrismaItemRepository)
})

container.register({
  [containerKeys.item.finder]: asClass(ItemFinder),
  [containerKeys.item.creator]: asClass(ItemCreator)
})
