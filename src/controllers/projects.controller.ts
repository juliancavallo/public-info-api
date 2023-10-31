import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import csv from 'csvtojson';
const request=require('request');

interface IProject {
    idproyecto: string;
    numeroobra: string;
    codigobapin: string;
    fechainicioanio: string;
    fechafinanio: string;
    nombreobra: string;
    descripicionfisica: string;
    montototal: string;
    sectornombre: string;
    avancefinanciero: string;
    avancefisico: string;
    entidadejecutoranombre: string;
    duracionobrasdias: string;
    objetivogeneral: string;
    tipoproyecto: string;
    nombredepto: string;
    nombreprovincia: string;
    codigo_bahra: string;
    etapaobra: string;
    tipomoneda: string;
    url_perfil_obra: string;
    programa_infraestructura: string;
    organismo_financiador_1: string;
    organismo_financiador_2: string;
    organismo_financiador_prestamo: string;
    contraparte_key: string;
    contraparte_val: string;
    contraparte_cuit: string;
    contraparte_modalidad: string;
    tag_accionclimatica: string;
    tag_ods_incidencia: string;
}

interface IApiResponse{
        result: {
            resources: [
                {
                    url: string
                },
                {
                    url: string
                }
            ]
        }
}

interface IGetAllQuery{
    page: number;
    size: number;
    sord: string;
    sidx: string;

    province?: string;
    department?: string;
    fromDate?: Date;
    toDate?: Date;
    totalAmountMin?: number;
    totalAmountMax?: number;
    description?: string;
}

const getAll = async (req: Request<{},{},{}, IGetAllQuery >, res: Response) => {

    req.query.size = req.query.size || 10;
    req.query.size = Math.min(req.query.size, 50);

    req.query.page = req.query.page || 0;
    req.query.page = Math.max(req.query.page, 1);

    req.query.sord = req.query.sord || "asc";
    req.query.sidx = req.query.sidx || "project";

    let response: AxiosResponse<IApiResponse> = await axios.get(`https://datos.gob.ar/api/3/action/package_show?id=obras-mapa-inversiones-argentina`);

    const url = response.data.result.resources[1].url;

    let projects: Array<IProject> = await getJsonFromCsv(url);
    
    return res.status(200).json({
        message: projects
    });
}

const getJsonFromCsv = async (csvFilePath: string): Promise<Array<IProject>> => {
    try {
        let projects: Array<IProject> = [];
        await 
            csv()
            .fromStream(request.get(csvFilePath))
            .subscribe((json: IProject)=>{
                projects.push(json);
            });

        return projects;
    } catch (err) {
        console.error('Error al convertir CSV a JSON:', err);
        throw err;
    }
};

export default {getAll};
