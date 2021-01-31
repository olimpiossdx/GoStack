import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersMonthsAvailabilityService from '@modules/appointments/services/ListMonthsAvailabilityService';

export default class ProviderMonthAvailabilityController {
  async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;

    const listProvidersMonthsAvailability = container.resolve(ListProvidersMonthsAvailabilityService);
    const availability = await listProvidersMonthsAvailability.execute({ provider_id, month, year });

    return response.json(availability);
  }
}
