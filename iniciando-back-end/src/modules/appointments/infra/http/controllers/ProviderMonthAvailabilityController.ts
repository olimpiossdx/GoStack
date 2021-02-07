import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersMonthsAvailabilityService from '@modules/appointments/services/ListMonthsAvailabilityService';

export default class ProviderMonthAvailabilityController {
  async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.query;

    const listProvidersMonthsAvailability = container.resolve(ListProvidersMonthsAvailabilityService);
    const availability = await listProvidersMonthsAvailability.execute({
      provider_id,
      month: Number(month),
      year: Number(year)

    });

    return response.json(availability);
  }
}
