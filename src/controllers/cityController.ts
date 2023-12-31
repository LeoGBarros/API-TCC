import { NextFunction, Request, Response } from 'express'

import Controller from '../decorators/Controller'
import { AuthContext, Delete, Post, Put } from '../decorators/handlerDecorator'
import BadRequestException from '../exceptions/BadRequestException'
import AddressService from '../services/adressService'
import CityService from '../services/cityService'
import NeighborhoodsOnPreferencesService from '../services/neighborhoodsOnPreferencesService'

@Controller('/cities')
class CityController {
  @Post('/', AuthContext.Unprotected)
  public async addNewCity(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, stateId } = req.body
      const newCity = await CityService.store({ name, stateId })
      res.send(newCity)
    } catch (error) {
      next(error)
    }
  }

  @Put('/:cityId', AuthContext.Unprotected)
  public async updateCity(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedCity = await CityService.update(req.body)
      res.send(updatedCity)
    } catch (error) {
      next(error)
    }
  }

  @Delete('/:cityId', AuthContext.Unprotected)
  public async deleteCity(req: Request, res: Response, next: NextFunction) {
    try {
      const { cityId } = req.params

      const [address, preference] = await Promise.all([
        AddressService.findFirstByCity(cityId),
        NeighborhoodsOnPreferencesService.findFirstByCity(cityId),
      ])

      if (address !== null || preference !== null)
        throw new BadRequestException(
          'Não é possível excluir esta cidade, existem endereços e preferências atrelados a ela'
        )

      await CityService.delete(cityId)
      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
}

export default CityController
