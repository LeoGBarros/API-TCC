import { Contract } from '@prisma/client'
import database from '../database'

class ContractService {
  static async sendNewContract(contract: Omit<Contract, 'id'>) {
    return await database.contract.create({
      data: {
        value: contract.value,
        date: contract.date,
        description: contract.description,
        contractorId: contract.contractorId,
        houseId: contract.houseId,
        providerId: contract.providerId,
      },
    })
  }

  static async getContractsByUser(ownerId: string) {
    return await database.contract.findMany({
      where: {
        provider: {
          id: ownerId,
        },
      },
      include: {
        house: {
          include: {
            address: {
              include: {
                neighborhood: {
                  include: {
                    city: {
                      include: {
                        state: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    })
  }
}

export default ContractService
