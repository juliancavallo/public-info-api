export interface IProjectCsvRecord {
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

export interface IProjectResponseHeader{
    projectName: string;
    totalAmount: string;
    province: string;
    department: string;
}

export interface IProjectResponseDetail{
    description: string;
    section: string;
    startYear: string;
    endYear: string;
    duration: string;
    projectType: string;
    status: string;
    currencyType: string;
    projectUrl: string;
}

export interface IProjectResponseItem{
    header: IProjectResponseHeader;
    detail: IProjectResponseDetail;
}

export interface IProjectResponse{
    items: Array<IProjectResponseItem>;
    pages: number;
}

export interface IApiResponse{
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

export interface IGetAllQuery{
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

export class ProjectSidx {
    public static PROJECT: string = "project";
    public static TOTAL_AMOUNT: string = "totalAmount";
    public static PROVINCE: string = "province";
    public static DEPARTMENT: string = "department";
  }