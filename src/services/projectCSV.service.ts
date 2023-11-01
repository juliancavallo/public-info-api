import axios, { AxiosResponse } from 'axios';
import csv from 'csvtojson';
import { IApiResponse, IProjectCsvRecord } from '../contracts/project.contracts';
const request=require('request');

export const getCsvUrl = async(): Promise<string> => {
    let response: AxiosResponse<IApiResponse> = await axios.get(
        `http://datos.gob.ar/api/3/action/package_show?id=obras-mapa-inversiones-argentina`,
        {
            headers:{
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                'User-Agent': 'PublicInfoAPI/1.0'
            }
        });
        
    return response.data.result.resources[1].url;
}

export const getJsonFromCsv = async (csvFilePath: string): Promise<Array<IProjectCsvRecord>> => {
    try {
        let projects: Array<IProjectCsvRecord> = [];
        await 
            csv()
            .fromStream(request.get(csvFilePath))
            .subscribe((json: IProjectCsvRecord)=>{
                projects.push(json);
            });

        console.error('CSV procesado con exito');

        return projects;
    } catch (err) {
        console.error('Error al convertir CSV a JSON:', err);
        throw err;
    }
};

export default {getCsvUrl, getJsonFromCsv}