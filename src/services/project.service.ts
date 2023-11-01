import { IGetAllQuery, IProjectCsvRecord, IProjectResponse, IProjectResponseDetail, IProjectResponseHeader, IProjectResponseItem } from '../contracts/project.contracts';
import csvService from '../services/projectCSV.service'

const parseCurrencyValueToString = (value: string): string => {
    value = value.replace('.', ',');
    const valueWithoutDecimals = parseFloat(value.split(',')[0]);
    const valueOnCurrencyFormat = valueWithoutDecimals.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS'
    });
  
    return valueOnCurrencyFormat.replace(/0+$/, '').replace(/,$/, '');
}

const convertCsvRecordsToResponse = (csvRecords: IProjectCsvRecord[]) : IProjectResponseItem[] => {
    const projects: IProjectResponseItem[] = [];
    
    csvRecords.forEach((record: IProjectCsvRecord) => {
        const header :IProjectResponseHeader = {
            department: record.nombredepto,
            province: record.nombreprovincia,
            projectName: record.nombreobra,
            totalAmount: parseCurrencyValueToString(record.montototal)
        };
        const detail: IProjectResponseDetail = {
            currencyType: record.tipomoneda,
            description: record.descripicionfisica,
            duration: record.duracionobrasdias,
            endYear: record.fechafinanio,
            projectType: record.tipoproyecto,
            projectUrl: record.url_perfil_obra,
            section: record.sectornombre,
            startYear: record.fechainicioanio,
            status: record.etapaobra,
        }
        const item: IProjectResponseItem ={
            detail: detail,
            header: header
        }

        projects.push(item);
    });

    return projects;
}

export const getAll = async(query: IGetAllQuery): Promise<IProjectResponse> => {
    
    const url = await csvService.getCsvUrl();
    const csvRecords = await csvService.getJsonFromCsv(url);

    const projects = convertCsvRecordsToResponse(csvRecords);

    const pagesCount = Math.ceil(projects.length / query.size);

    return {
        items: projects
            .slice((Math.min(query.page, pagesCount) - 1) * query.size)
            .slice(0, query.size),
        pages: pagesCount
    };
}


export default {getAll}