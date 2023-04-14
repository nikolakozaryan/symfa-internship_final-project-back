import {dbInit1680597466202} from './1680597466202-db-init'
import {createUser1680680253302} from './1680680253302-create-user'
import {createDish1680894248113} from './1680894248113-create-dish'
import {addFavsColumnToUser1680953850588} from './1680953850588-add-favs-column-to-user'
import {addTasteColumnToDish1681029759148} from './1681029759148-add-taste-column-to-dish'
import {createOrderEntity1681481304960} from './1681481304960-create-order-entity'

export const MIGRATIONS = [
    createUser1680680253302, 
    createDish1680894248113, 
    addFavsColumnToUser1680953850588,
    addTasteColumnToDish1681029759148,
    createOrderEntity1681481304960
];
export const INIT_MIGRATIONS = [dbInit1680597466202];
