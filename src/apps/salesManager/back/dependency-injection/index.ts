
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
import { CustomerPrismaRepository } from '../../../../Contexts/Customer/infraestructure/persistance/CustomerPrismaRepository'
import { CustomerCreator } from '../../../../Contexts/Customer/application/CustomerCreator'
import { CustomerFinder } from '../../../../Contexts/Customer/application/CustomerFinder'
import { CustomerFinderByRuc } from '../../../../Contexts/Customer/application/CustomerFinderByRuc'
import { SalePrismaRepository } from '../../../../Contexts/Sale/infraestructure/SalePrismaRepository'
import { SalesCreator } from '../../../../Contexts/Sale/application/SaleCreator'
import { SalesFinder } from '../../../../Contexts/Sale/application/SaleFinder'

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
  },
  customer: {
    creator: 'customer.CustomerCreator',
    finder: 'customer.CustomerFinder',
    finderByRuc: 'customer.CustomerFinderByRuc'
  },
  sale: {
    creator: 'sale.SaleCreator',
    finder: 'sale.SaleFinder'
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

// Customer Context
container.register({
  customerRepository: asClass(CustomerPrismaRepository)
})

container.register({
  [containerKeys.customer.creator]: asClass(CustomerCreator),
  [containerKeys.customer.finder]: asClass(CustomerFinder),
  [containerKeys.customer.finderByRuc]: asClass(CustomerFinderByRuc)
})

// Sales Context
container.register({
  saleRepository: asClass(SalePrismaRepository)
})

container.register({
  [containerKeys.sale.creator]: asClass(SalesCreator),
  [containerKeys.sale.finder]: asClass(SalesFinder)
})
