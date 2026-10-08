import { createResourceService } from '../services/resourceService.js';

export function createResourceController(table, { unscoped = false } = {}) {
  const service = createResourceService(table, { unscoped });
  return {
    list: async (req, res, next) => { try { res.json(await service.list(req.businessId)); } catch (e) { next(e); } },
    get: async (req, res, next) => { try { res.json(await service.get(req.businessId, req.params.id)); } catch (e) { next(e); } },
    create: async (req, res, next) => { try { res.status(201).json(await service.create(req.businessId, req.body)); } catch (e) { next(e); } },
    update: async (req, res, next) => { try { res.json(await service.update(req.businessId, req.params.id, req.body)); } catch (e) { next(e); } },
    remove: async (req, res, next) => { try { res.json(await service.remove(req.businessId, req.params.id)); } catch (e) { next(e); } },
  };
}
