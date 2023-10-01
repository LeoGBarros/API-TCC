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
        workHours: contract.workHours,
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
        contractor: true,
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

  static async getAllContractsByContractor(contractId: string) {
    return await database.contract.findMany({
      where: {
        provider: {
          id: contractId,
        },
      },
      include: {
        contractor: true,
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

  static async updateContractStatus(id: string, status: boolean) {
    return await database.contract.update({
      where: {
        id,
      },
      data: {
        accepted: status,
      },
    })
  }
}

export default ContractService
