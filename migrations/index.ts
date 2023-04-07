import {dbInit1680597466202} from './1680597466202-db-init'
import {createUser1680680253302} from './1680680253302-create-user'
import {createDish1680894248113} from './1680894248113-create-dish'

export const MIGRATIONS = [createUser1680680253302, createDish1680894248113];
export const INIT_MIGRATIONS = [dbInit1680597466202];
