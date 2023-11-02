import { IGetAllQuery, IProjectCsvRecord, IProjectResponse, IProjectResponseDetail, IProjectResponseHeader, IProjectResponseItem } from '../contracts/project.contracts';
import { normalize, parseCurrencyValueToString } from '../hepers/string-helper';
import csvService from './project-csv.service'

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
    let csvRecords = await csvService.getJsonFromCsv(url);

    if (query.province)
        csvRecords = csvRecords.filter(x => normalize(x.nombreprovincia).includes(normalize(query.province ?? '')));

    if (query.department)
        csvRecords = csvRecords.filter(x => normalize(x.nombredepto).includes(normalize(query.department ?? '')));

    if (query.totalAmountMin)
        csvRecords = csvRecords.filter(x => parseFloat(x.montototal) >= (query.totalAmountMin ?? 0));

    if (query.totalAmountMax)
        csvRecords = csvRecords.filter(x => parseFloat(x.montototal) <= (query.totalAmountMax ?? 0));

    if (query.description)
        csvRecords = csvRecords.filter(x => 
            normalize(x.descripicionfisica).includes(normalize(query.description ?? '')) 
        || normalize(x.nombreobra).includes(normalize(query.description ?? '')));

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