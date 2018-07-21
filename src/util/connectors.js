import { Connect, SimpleSigner } from 'uport-connect'

export const uport = new Connect('ETH Hackathon App', {
    clientId: '2oxpoRyQWcTam3wrhAqQ2LTigLa5yXjssWa',
    network: 'rinkeby',
    signer: SimpleSigner('9c6abeb3134606994bd42314ed431460baa605c5a366b45e090af21d2ca7e318')
})