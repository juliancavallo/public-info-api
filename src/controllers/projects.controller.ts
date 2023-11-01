import { Request, Response, NextFunction } from 'express';
import { IGetAllQuery, IProjectCsvRecord, IProjectResponse } from '../contracts/project.contracts';
import service from '../services/project.service'

const getAll = async (req: Request<{},{},{}, IGetAllQuery >, res: Response<IProjectResponse>) => {

    req.query.size = req.query.size || 10;
    req.query.size = Math.min(req.query.size, 50);

    req.query.page = req.query.page || 0;
    req.query.page = Math.max(req.query.page, 1);

    req.query.sord = req.query.sord || "asc";
    req.query.sidx = req.query.sidx || "project";
    

    let projects: IProjectResponse = await service.getAll(req.query);
    
    return res.status(200).json({
        items: projects.items,
        pages: projects.pages
    });
}

export default {getAll};
