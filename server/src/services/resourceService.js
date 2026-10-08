import { createResourceRepository } from '../repositories/resourceRepository.js';

export function createResourceService(table, { unscoped = false } = {}) {
  const repo = createResourceRepository(table, { unscoped });
  return {
    list: (businessId) => repo.list(businessId),
    get: (businessId, id) => repo.get(businessId, id),
    create: (businessId, payload) => repo.create(businessId, payload),
    update: (businessId, id, payload) => repo.update(businessId, id, payload),
    remove: (businessId, id) => repo.remove(businessId, id),
  };
}
