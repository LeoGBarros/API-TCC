import { NextFunction, Request, Response } from 'express'

import Controller from '../decorators/controllerDecorator'
import { Post } from '../decorators/handlerDecorator'
import ContractService from '../services/contractService'

@Controller('/contract')
class ContractController {
  @Post('/send')
  public async sendNewContract(req: Request, res: Response, next: NextFunction) {
    try {
      const { value, date, description, contractorId, houseId, providerId } = req.body

      const contractModel = {
        value: value,
        date: date,
        description: description,
        contractorId: contractorId,
        houseId: houseId,
        providerId: providerId,
        accepted: null,
      }

      await ContractService.sendNewContract(contractModel)
    } catch (error) {
      next(error)
    }
  }
}

export default ContractController
