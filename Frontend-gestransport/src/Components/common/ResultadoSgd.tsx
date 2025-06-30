'use client';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import DataTable from 'react-data-table-component'; // Usando react-data-table-component
import Modal from './Modal'; // Reutiliza el componente Modal o crea uno nuevo para el visor de PDF
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFilePdf, faFileExcel, faFileWord, faFileAlt} from '@fortawesome/free-solid-svg-icons'; // Importar íconos adicionales
import axios from 'axios';
import CommentPanel from './CommentPanel';
import PaginaLineaModal from './PaginaLineaModal'; // Importar el componente PaginaLineaModal
//import pagLineaData from '../../Backend-server-api/src/controllers/pagLineaText.json';

export interface Records { 
    CONT_N_ID_SOLICITUD: string;
    CONT_V_DESCRIP_DEPENDENCIA: string;
    CONT_V_COD_SUBDEPENDENCIA: string;
    CONT_V_DESCRIPCION_FAMILIA: string;
    CONT_V_DESCRIPCION_SUBFAMILIA: string;
    CONT_V_DESCRIPCION_CATEGORIA: string;
    CONT_V_DESCRIPCION_SUBCATEGORIA: string;
    CONT_V_FECHA_SOLICITUD: string;
    CONT_V_ESTADO_SOLICITUD: string;
    CONT_V_CODIGODOCUMENTO: string;
    CONT_V_NOMBREDETALLEDOCUMENTO: string;
    CONT_V_NOMBRECORTODOCUMENTO: string;
    CONT_V_ASUNTO: string;
    CONT_V_DESCRIPCION_DOCUMENTO_EN_TRAMITE: string;
    CONT_V_INDICADOR_CONFIDENCIAL: string;
    CONT_V_NATURALEZA: string;
    CONT_V_FECHA_EMISION_DOCUMENTO: string;
    CONT_V_FECHA_VENCIMIENTO_DOCUMENTO: string;
    CONT_V_VALOR_REFERENCIADOC: string;
    CONT_V_NUMERO_TRAMITE: string;
    CONT_N_DIGITO_VERIFICADOR: string;
    CONT_V_NUMERO_EXPEDIENTE: string;
    CONT_V_ANYO_TRAMITE: string;
    CONT_V_NUM_TRAMITE: string;
    CONT_V_CLAVE: string;
    CONT_N_IMPORTE: string;
    CONT_V_ANYOSIAF: string;
    CONT_V_NROSIAF: string;
    CONT_V_ANYO_CERTIFICADO: string;
    CONT_V_NUMERO_CERTIFICADO: string;
    CONT_V_ASUNTO_EXPE: string;
    CONT_V_GLOSA: string;
    CONT_V_ANYO_DOCUMENTO: string;
    CONT_V_NUMERO_DOCUMENTO_PRINCIPAL: string;
    CONT_V_FECHA_DOCUMENTO_PRINCIPAL: string;
    CONT_V_ANYO_EXPEDIENTE_ORIGEN: string;
    CONT_V_NUMERO_EXPEDIENTE_ORIGEN: string;
    CONT_V_NUMERO_DOCUMENTO_IDENT_EXPEDIENTE: string;
    CONT_N_ID_SEQUENCIA_PASO: string;
    CONT_V_SUMILLA: string;
    CONT_N_FOLIOS: string;
    CONT_V_NUMERO_DOCUMENTO: string;
    CONT_V_FECHA_DOCUMENTO: string;
    CONT_N_FLAG_COPIA: string;
    CONT_V_DESCRIPCION: string;
    CONT_V_OBSERVACION: string;
    CONT_V_RUC_ENTIDAD: string;
    CONT_V_FECHA_EMISION: string;
    CONT_N_DETALLE_IMPORTE: string;
    CONT_N_PRESENTO_DOCUMENTO: string;
    CONT_V_NOMBRE: string;
    CONT_V_NOMBREGEN: string;
    CONT_V_TIPO_CONTENIDO: string;
    CONT_V_EXTENSION: string;
    CONT_N_COUNT_PAGE: string;
    CONT_N_FIRMADO: string;
    CONT_V_RUTA_DIRECTORIO: string;
    CONT_N_PESO_FILE: string;
    CONT_V_NOMBRE_COMPLETO: string;
    CONT_N_ID_ARCHTRAMITE: string;
    CONT_N_COUNT_ARCHIVO: number;
    CONT_V_PROYECTO: string;
    CONT_V_FUENTE_FINANCIAMIENTO: string;
    CONT_V_ID_MONEDA: string;
    CONT_V_MONEDA: string;
    CONT_V_SERIE_DOCUMENTAL: string;
    CONT_V_DOMINIO: string;
    CONT_V_CODIGOTIPODOC: string;
    CONT_V_DESCRIPDEP: string;
    CONT_V_DESCRIPSUBDEP: string;
    CONT_V_NOMBREDETALLE: string;
    CONT_V_CATEGORIA_NORMA_SIG: string;
    CONT_V_TIPO_DOCUMENTO_SIG: string;
    CONT_V_ETAPA_DOCUMENTO_SIG: string;
    CONT_N_IDENTIFICADOR_COMENTARIOS: number;
    CONT_V_VERSION_DOCUMENTO_SIG: string;
    CONT_V_TIPO_PROCESO: string;
    CONT_V_IDENTIFICADOR_DC: string;
    CONT_V_LENGUAJE_DC: string;
    CONT_V_TIPO_RECURSO_DC: string;
    CONT_V_CREADOR_DC: string;
    CONT_V_RUTA_DC: string;
    CONT_V_TITULO_DC: string;
    CONT_V_FECHA_DC: string;
    INDICADOR_CONFIDENCIAL: number;
    CONT_N_VISTAS: number;
    CONT_N_DESCARGAS: number;
    CONT_V_DESCRIPCIONDEPREGISTRO: string;
    CONT_V_DESCRIPCIONSUBDEPREGISTRO: string;
    CONT_V_DESCRIPCIONAREAREGISTRO: string;
    CONT_V_DESCRIPCIONSERIE: string;
    CONT_V_DESCRIPCIONSUBSERIE: string;
    CONT_V_CONDICION_DOCUMENTO: string;
    CONT_I_CONTENIDO_EDITABLE: boolean;
    CONT_N_ANIO_SOLICITUD: number;
    CONT_N_COD_DOMINIO: number;
    CONT_N_PROCESO_EXTRACCION: number;
    CONT_V_COD_SUBSERIE_DOC: string;
    CONT_V_COD_SERIE_DOC: string;
    CONT_V_COD_AREAREGISTRO: string;
    CONT_V_COD_SUBDEPREGISTRO: string;
    CONT_V_COD_DEPREGISTRO: string;
    CONT_V_FUENTE_DC: string;
    CONT_V_USU_CARGA_DOCUM_SIG: string;
    CONT_V_MATERIA_DC: string;
    CONT_V_RELACION_DC: string;
    CONT_V_COBERTURA_DC: string;
    CONT_V_DERECHOS_AUTOR_DC: string;
    CONT_V_DESCRIPCION_DC: string;
    CONT_V_EDITOR_DC: string;
    CONT_V_COLABORADOR_DC: string;
    CONT_V_ANYO_EXPEDIENTE: string;
    CONT_V_EXPORTADO: string;
    CONT_V_TIPO_TRAMITE: string;
    CONT_V_TIPO_PROCEDIMIENTO: string;
    CONT_v_FECCACT: string;
    CONT_V_CODIGOREFERENCIA: string;
    TEXTO_CONCAT: string;
    repetido?: any[];
    //EXT_N_NUM_PAG: number;// CODIGO AGREGADO ////////////////////////////////
    //EXT_N_NUM_LINEA: number;// CODIGO AGREGADO ////////////////////////////////
    //CONT_I_CONTENIDO_EDITABLE: boolean; // Añadido
    //CONT_V_CODIGOTIPODOC: string; // Añadido
}

interface TableProps {
    records: Records[];
    usePagination?: boolean;
    useScroll?: boolean;
    loggedUser: any; // Asegúrate de que tienes esta prop
    searchTerm: string; // CODIGO AGREGADO ////////////////////////////////// Añadido
    dominio: string; // Añadido
    //tipoDocListado: string; // Añadido
}

interface UserComment {
    // Renombrar el tipo Comment a UserComment
    text: string;
    author: string;
    date: string;
    CONT_N_IDENTIFICADOR_COMENTARIOS: number; // Añadido para vincular con Records
}

const ResultadoSgd: React.FC<TableProps> = ({ records, loggedUser,  searchTerm, dominio}) => {
    const [openPDF, setOpenPDF] = useState(false);
    const [openDocument, setOpenDocument] = useState(false);
    const [openComments, setOpenComments] = useState(false);
    const [selectedTramite, setSelectedTramite] = useState<Records | null>(null);
    const [expandedRows, setExpandedRows] = useState<{[key: string]: boolean;}>({});
    const [comments, setComments] = useState<UserComment[]>([]);
    const [commentCount, setCommentCount] = useState(0);
    const capitalizeFirstLetter = (text: string) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    
    ///////////CODIGO AGREGADO/////////////////////
    const [highlightAll, setHighlightAll] = useState<boolean>(true); // Añadido
    const [pagLineaText, setPagLineaText] = useState(''); // Añadido
    const [formattedData, setFormattedData] = useState<{ identificadorComentarios: string, paginaLinea: string }[]>([]); // Añadido
    const [expandedPaginaLinea, setExpandedPaginaLinea] = useState<{ [key: string]: boolean }>({}); // Añadido
    const [openPaginaLineaModal, setOpenPaginaLineaModal] = useState(false);
    const [paginaLineas, setPaginaLineas] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true); // Añadido
    const EmptyComponent = () => null;

    const handleOpenPaginaLineaModal = (identificadorComentarios: string, textoConcat: string | undefined): void => {
        const lines = formattedData
            .filter(item => item.identificadorComentarios === identificadorComentarios)
            .map(item => item.paginaLinea);
        //setPaginaLineas(lines);
        setPaginaLineas(separarTextoConcat(textoConcat));
        setOpenPaginaLineaModal(true);
    };

    const handleOpenPDF = (tramite: Records) => {
        setSelectedTramite(tramite);
        setOpenPDF(true);
        setPaginaLineas(separarTextoConcat(tramite.TEXTO_CONCAT)); // Pasar textoConcat directamente
        setOpenPaginaLineaModal(true);
    };

    const handleCloseBothModals = () => {
        setOpenPDF(false);
        setOpenPaginaLineaModal(false);
    };

    const separarTextoConcat = (textoConcat: string | undefined): string[] => {
        if (!textoConcat) return [];
        return textoConcat.split('///');
    };

    ///////////////FIN CODIGO AGREGADO/////////////////////

    // useMemo para calcular los contadores de comentarios
    const commentCounts = useMemo(() => {
        const counts: { [key: number]: number } = {};
        comments.forEach((comment) => {
            counts[comment.CONT_N_IDENTIFICADOR_COMENTARIOS] =
                (counts[comment.CONT_N_IDENTIFICADOR_COMENTARIOS] || 0) + 1;
        });
        return counts;
    }, [comments]);

    // Función para cargar comentarios del trámite seleccionado
    const loadCommentsForTramite = async (tramite: Records) => {
        try {
            const response = await axios.get(
                'http://localhost:3500/api/comments',
                {
                    params: {
                        idIdentificador:
                            tramite.CONT_N_IDENTIFICADOR_COMENTARIOS
                    }
                }
            );

            const transformedComments: UserComment[] = response.data.map(
                (comment: any) => ({
                    text: comment.DETB_V_SUMILLA,
                    author: comment.DETB_V_NOMBRE_COMPLETO,
                    date: new Date(comment.DETB_D_FECCREA).toLocaleString(),
                    CONT_N_IDENTIFICADOR_COMENTARIOS:
                        comment.CONT_N_IDENTIFICADOR_COMENTARIOS
                })
            );

            setComments(transformedComments);
        } catch (error) {
            //console.error("Error al obtener los comentarios:", error);
        }
    };

    const handleShowPDF = (record: Records, PLTArgumento: string) => {
        setSelectedTramite(record);
        setOpenPDF(true);
        setPagLineaText(PLTArgumento);
        setOpenPaginaLineaModal(true);
    };

    const handleShowComments = (record: Records) => {
        setSelectedTramite(record);
        loadCommentsForTramite(record);
        setOpenComments(true);
    };

    const getIconAndColor = (mimeType: any) => {
        switch (mimeType) {
            case 'application/pdf':
                return { icon: faFilePdf, color: '#99020b', marginLeft: '10px !important' }; // Rojo para PDF
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            case 'application/vnd.ms-excel':
                return { icon: faFileExcel, color: '#1d6f42' }; // Verde para Excel
            case 'application/msword':
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return { icon: faFileWord, color: '#1a73e8' }; // Azul para Word
            default:
                return { icon: faFileAlt, color: '#6c757d' }; // Gris para formatos desconocidos
        }
    };

    /////////CODIGO AGREGADO//////////////////
    const groupedRecords = useMemo(() => {
        if (dominio === 'BIBLIOTECA') {
            return records || [];
        }
        const groupMap: { [key: string]: Records } = {};
    
        (records || []).forEach((record) => {
            const key = [
                record.CONT_V_NUMERO_DOCUMENTO || '',
                record.CONT_V_NOMBRE || '',
                record.CONT_V_TIPO_CONTENIDO || '',
                record.CONT_V_EXTENSION || ''
            ].join('|');
    
            if (!groupMap[key]) {
                groupMap[key] = { ...record, repetido: [record] };
            } else {
                groupMap[key].repetido!.push(record);
            }
        });
    
        // Debug: muestra el agrupamiento
        console.log('Agrupamiento:', groupMap);
        const result = Object.values(groupMap);
        console.log('groupedRecords:', result);
        return result;
    }, [records, dominio]);
    useEffect(() => {
        console.log('records originales:', records);
        console.log('groupedRecords para la tabla:', groupedRecords);
    }, [records, groupedRecords]);
    /////////FIN CODIGO AGREGADO//////////////////

    // Calcular el total de repetidos
    const totalRepetidos = groupedRecords.reduce(
        (acc, record) => acc + ((record.repetido?.length || 1) - 1),
        0
    );

    const getColumns = () => {
        if (dominio === 'CALIDAD') {
            return [
                {
                    name: 'Título',
                    selector: (row: Records) => row.CONT_V_NOMBRE,
                    sortable: true, // Ordenamiento habilitado
                    cell: (row: Records) => {
                        const concatenatedTitle = row.CONT_V_NOMBRE;
                        const maxLength = 350;
                        return (
                            <div
                                title={concatenatedTitle}
                                style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '380px',
                                    textAlign: 'left'
                                }}
                            >
                                {concatenatedTitle.length > maxLength
                                    ? concatenatedTitle.substr(0, maxLength) + '...'
                                    : concatenatedTitle}
                            </div>
                        );
                    },
                    //width: '120px',
                    width: '15%', // Ajusta el ancho proporcionalmente
                    center: true // Añade esta propiedad
                },
                {
                    name: 'Tipo de Publicación',
                    selector: (row: Records) => row.CONT_V_NOMBREDETALLE,
                    sortable: true,
                    //width: '140px',
                    width: '11%', // Ajusta el ancho proporcionalmente
                    center: true // Añade esta propiedad
                },
                {
                    name: 'Creador (Autor)',
                    selector: (row: Records) => row.CONT_V_CREADOR_DC || 'Desconocido', // Muestra "Desconocido" si es null o undefined
                    sortable: true,
                    center: true, // Añade esta propiedad
                    //width: '170px',
                    width: '17%', // Ajusta el ancho proporcionalmente
                    cell: (row: Records) => {
                        const autor = row.CONT_V_CREADOR_DC || 'Desconocido'; // Asegúrate de que siempre haya un valor
                        const maxLength = 150;
                        return (
                            <div
                                title={autor}
                                style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '170px',
                                    textAlign: 'left'
                                }}
                            >
                                {autor.length > maxLength
                                    ? autor.substr(0, maxLength) + '...'
                                    : autor}
                            </div>
                        );
                    }
                },
                {
                    id: 'fecha',
                    name: 'Fecha',
                    selector: (row: Records) => row.CONT_V_FECHA_DOCUMENTO,
                    sortable: true,
                    center: true,
                    //width: '90px',
                    width: '6%', // Ajusta el ancho proporcionalmente
                    sortFunction: (a: Records, b: Records) => {
                        const dateA = a.CONT_V_FECHA_DOCUMENTO
                            ? Date.parse(a.CONT_V_FECHA_DOCUMENTO)
                            : 0;
                        const dateB = b.CONT_V_FECHA_DOCUMENTO
                            ? Date.parse(b.CONT_V_FECHA_DOCUMENTO)
                            : 0;
                        return dateA - dateB; // Orden ascendente (más antiguo a más reciente)
                    },
                    cell: (row: Records) => (
                        <div style={{ textAlign: 'center' }}>
                            {row.CONT_V_FECHA_DOCUMENTO || 'Sin Fecha'}
                        </div>
                    )
                },
                {
                    name: 'Formato',
                    center: true, // Añade esta propiedad
                    selector: (row: Records) => row.CONT_V_TIPO_CONTENIDO,
        
                    cell: (row: Records) => {
                        try {
                            // Si el formato es "tipo/subformato", dividimos
                            const tipo = row.CONT_V_TIPO_CONTENIDO.includes('/')
                                ? row.CONT_V_TIPO_CONTENIDO.split('/')[0]
                                : row.CONT_V_TIPO_CONTENIDO;
                            return <div style={{ textAlign: 'center' }}>{tipo}</div>;
                        } catch (error) {
                            // En caso de error, mostramos un valor por defecto
                            return (
                                <div style={{ textAlign: 'center' }}>Desconocido</div>
                            );
                        }
                    },
                    //width: '90px'
                    width: '6%' // Ajusta el ancho proporcionalmente
                },
                {
                    name: 'Subformato',
                    center: true, // Añade esta propiedad
                    selector: (row: Records) => row.CONT_V_TIPO_CONTENIDO,
                    cell: (row: Records) => {
                        try {
                            const subformato = (row.CONT_V_EXTENSION || '').toLowerCase();
                            const maxLength = 10;
                            const truncatedSubformato = subformato.length > maxLength ? `${subformato.substring(0, maxLength)}...` : subformato;
        
                            return (
                                <div
                                    title={subformato} // El título muestra el contenido completo
                                    style={{
                                        textAlign: 'center',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}
                                >
                                    {truncatedSubformato}
                                </div>
                            );
                        } catch (error) {
                            return (
                                <div style={{ textAlign: 'center' }}>Desconocido</div>
                            );
                        }
                    },
                    //width: '90px'
                    width: '5%' // Ajusta el ancho proporcionalmente
                },
                {
                    name: 'Coincidencias',
                    sortable: true,
                    selector: (row: Records) => row.repetido?.length || 0, // Selecciona directamente el valor numérico para ordenación
                    cell: (row: Records) => {
                        const repetidosCount = row.repetido?.length || 0;
                        return (
                            <button className="btn-repetidos">{`(${repetidosCount})`}</button>
                        );
                    },
                    center: true,
                    //width: '100px'
                    width: '7%' // Ajusta el ancho proporcionalmente
                },
                {
                    name: 'Ver',
                    button: true,
                    //selector: (row: Records) => row.TEXTO_CONCAT || 'Sin PDF',
                    cell: (row: Records) => {
                        const { icon, color } = getIconAndColor(row.CONT_V_TIPO_CONTENIDO); // Obtener ícono y color según el tipo MIME
                        const PLTNuevo = row.TEXTO_CONCAT; 
                        console.log("PLTNuevo:", PLTNuevo);
                        return (
                            <button 
                                onClick={() => handleShowPDF(row, PLTNuevo)} 
                                style={{ cursor: 'pointer' }} 
                                title="Ver PDF" // Añadido el atributo title
                            >
                                <FontAwesomeIcon icon={icon} style={{ fontSize: '18px', color }} />
                            </button>
                        );
                    },
                    center: true,
                    width: '5%' // Ajusta el ancho proporcionalmente
                },
                {
                    name: 'Comentarios',
                    selector: (row: Records) =>
                        comments.filter(
                            (comment) =>
                                comment.CONT_N_IDENTIFICADOR_COMENTARIOS ===
                                row.CONT_N_IDENTIFICADOR_COMENTARIOS
                        ).length || 0,
                    sortable: true,
                    center: true,
                    //width: '120px',
                    width: '7%', // Ajusta el ancho proporcional
                    cell: (row: Records) => {
                        const commentCount =
                            comments.filter(
                                (comment) =>
                                    comment.CONT_N_IDENTIFICADOR_COMENTARIOS ===
                                    row.CONT_N_IDENTIFICADOR_COMENTARIOS
                            ).length || 0;
        
                        return (
                            <span
                                onClick={() => handleShowComments(row)}
                                style={{
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                    textAlign: 'center',
                                    display: 'inline-block',
                                    width: '100%'
                                }}
                            >
                                {commentCount}
                            </span>
                        );
                    }
                },
                {
                    name: 'Vistas',
                    selector: (row: Records) => Number([row.CONT_N_VISTAS]) || 0,
                    sortable: true,
                    center: true,
                    //width: '80px',
                    width: '5%', // Ajusta el ancho proporcionalmente
                    cell: (row: Records) => (
                        <div style={{ textAlign: 'center' }}>
                            {Number([row.CONT_N_VISTAS]) || 0}
                        </div>
                    )
                },
                {
                    name: 'Etapa',
                    selector: (row: Records) => row.CONT_V_ETAPA_DOCUMENTO_SIG,
                    sortable: true,
                    center: true,
                    //width: '100px',
                    width: '6%', // Ajusta el ancho proporcionalmente
                    cell: (row: Records) => (
                        <div style={{ textAlign: 'center', padding: '0.2 rem' }}>
                            {row.CONT_V_ETAPA_DOCUMENTO_SIG || 'ND'}
                        </div>
                    )
                },
                {
                    name: 'Confidencialidad',
                    selector: (row: Records) => row.CONT_V_ETAPA_DOCUMENTO_SIG,
                    sortable: true,
                    center: true,
                    //width: '120px',
                    width: '7%', // Ajusta el ancho proporcionalmente
                    cell: () => <div style={{ textAlign: 'center' }}>Público</div>
                }
            ];
        } else if (dominio === 'SGD') {
            return [
                {
                    name: 'Título',
                    selector: (row: Records) => `${row.CONT_V_ANYO_DOCUMENTO || ''} ${row.CONT_V_NUMERO_EXPEDIENTE || ''} "${(row.CONT_V_CODIGOTIPODOC || '').padStart(3, '0')}"`,
                    sortable: true, // Ordenamiento habilitado
                    cell: (row: Records) => {
                        const concatenatedTitle = `${row.CONT_V_ANYO_DOCUMENTO || ''} ${row.CONT_V_NUMERO_EXPEDIENTE || ''} "${(row.CONT_V_CODIGOTIPODOC || '').padStart(3, '0')}"`;
                        const maxLength = 350;
                        return (
                            <div
                                title={concatenatedTitle}
                                style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '380px',
                                    textAlign: 'left'
                                }}
                            >
                                {concatenatedTitle.length > maxLength
                                    ? concatenatedTitle.substr(0, maxLength) + '...'
                                    : concatenatedTitle}
                            </div>
                        );
                    },
                    //width: '120px',
                    width: '15%', // Ajusta el ancho proporcionalmente
                    center: true // Añade esta propiedad
                },
                {
                    name: 'Tipo de Documento',
                    selector: (row: Records) => row.CONT_V_NOMBREDETALLE,
                    sortable: true,
                    //width: '140px',
                    width: '11%', // Ajusta el ancho proporcionalmente
                    center: true // Añade esta propiedad
                },
                {
                    name: 'Creador (Autor)',
                    selector: (row: Records) => row.CONT_V_CREADOR_DC || 'Desconocido', // Muestra "Desconocido" si es null o undefined
                    sortable: true,
                    center: true, // Añade esta propiedad
                    //width: '170px',
                    width: '17%', // Ajusta el ancho proporcionalmente
                    cell: (row: Records) => {
                        const autor = row.CONT_V_CREADOR_DC || 'Desconocido'; // Asegúrate de que siempre haya un valor
                        const maxLength = 150;
                        return (
                            <div
                                title={autor}
                                style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '170px',
                                    textAlign: 'left'
                                }}
                            >
                                {autor.length > maxLength
                                    ? autor.substr(0, maxLength) + '...'
                                    : autor}
                            </div>
                        );
                    }
                },
                {
                    id: 'fecha',
                    name: 'Fecha',
                    selector: (row: Records) => row.CONT_V_FECHA_DOCUMENTO,
                    sortable: true,
                    center: true,
                    //width: '90px',
                    width: '6%', // Ajusta el ancho proporcionalmente
                    sortFunction: (a: Records, b: Records) => {
                        const dateA = a.CONT_V_FECHA_DOCUMENTO
                            ? Date.parse(a.CONT_V_FECHA_DOCUMENTO)
                            : 0;
                        const dateB = b.CONT_V_FECHA_DOCUMENTO
                            ? Date.parse(b.CONT_V_FECHA_DOCUMENTO)
                            : 0;
                        return dateA - dateB; // Orden ascendente (más antiguo a más reciente)
                    },
                    cell: (row: Records) => (
                        <div style={{ textAlign: 'center' }}>
                            {row.CONT_V_FECHA_DOCUMENTO || 'Sin Fecha'}
                        </div>
                    )
                },
                {
                    name: 'Formato',
                    center: true, // Añade esta propiedad
                    selector: (row: Records) => row.CONT_V_TIPO_CONTENIDO,
        
                    cell: (row: Records) => {
                        try {
                            // Si el formato es "tipo/subformato", dividimos
                            const tipo = row.CONT_V_TIPO_CONTENIDO.includes('/')
                                ? row.CONT_V_TIPO_CONTENIDO.split('/')[0]
                                : row.CONT_V_TIPO_CONTENIDO;
                            return <div style={{ textAlign: 'center' }}>{tipo}</div>;
                        } catch (error) {
                            // En caso de error, mostramos un valor por defecto
                            return (
                                <div style={{ textAlign: 'center' }}>Desconocido</div>
                            );
                        }
                    },
                    //width: '90px'
                    width: '9%' // Ajusta el ancho proporcionalmente
                },
                {
                    name: 'Subformato',
                    center: true, // Añade esta propiedad
                    selector: (row: Records) => row.CONT_V_TIPO_CONTENIDO,
                    cell: (row: Records) => {
                        try {
                            const subformato = (row.CONT_V_EXTENSION || '').toLowerCase();
                            const maxLength = 10;
                            const truncatedSubformato = subformato.length > maxLength ? `${subformato.substring(0, maxLength)}...` : subformato;
        
                            return (
                                <div
                                    title={subformato} // El título muestra el contenido completo
                                    style={{
                                        textAlign: 'center',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}
                                >
                                    {truncatedSubformato}
                                </div>
                            );
                        } catch (error) {
                            return (
                                <div style={{ textAlign: 'center' }}>Desconocido</div>
                            );
                        }
                    },
                    //width: '90px'
                    width: '5%' // Ajusta el ancho proporcionalmente
                },
                {
                    name: 'Coincidencias',
                    sortable: true,
                    selector: (row: Records) => row.repetido?.length || 0, // Selecciona directamente el valor numérico para ordenación
                    cell: (row: Records) => {
                        const repetidosCount = row.repetido?.length || 0;
                        return (
                            <button className="btn-repetidos">{`(${repetidosCount})`}</button>
                        );
                    },
                    center: true,
                    //width: '100px'
                    width: '7%' // Ajusta el ancho proporcionalmente
                },
                {
                    name: 'Ver',
                    button: true,
                    //selector: (row: Records) => row.TEXTO_CONCAT || 'Sin PDF',
                    cell: (row: Records) => {
                        const { icon, color } = getIconAndColor(row.CONT_V_TIPO_CONTENIDO); // Obtener ícono y color según el tipo MIME
                        const PLTNuevo = row.TEXTO_CONCAT; 
                        console.log("PLTNuevo:", PLTNuevo);
                        return (
                            <button 
                                onClick={() => handleShowPDF(row, PLTNuevo)} 
                                style={{ cursor: 'pointer' }} 
                                title="Ver PDF" // Añadido el atributo title
                            >
                                <FontAwesomeIcon icon={icon} style={{ fontSize: '18px', color }} />
                            </button>
                        );
                    },
                    center: true,
                    width: '5%' // Ajusta el ancho proporcionalmente
                },
                {
                    name: 'Comentarios',
                    selector: (row: Records) =>
                        comments.filter(
                            (comment) =>
                                comment.CONT_N_IDENTIFICADOR_COMENTARIOS ===
                                row.CONT_N_IDENTIFICADOR_COMENTARIOS
                        ).length || 0,
                    sortable: true,
                    center: true,
                    //width: '120px',
                    width: '7%', // Ajusta el ancho proporcional
                    cell: (row: Records) => {
                        const commentCount =
                            comments.filter(
                                (comment) =>
                                    comment.CONT_N_IDENTIFICADOR_COMENTARIOS ===
                                    row.CONT_N_IDENTIFICADOR_COMENTARIOS
                            ).length || 0;
        
                        return (
                            <span
                                onClick={() => handleShowComments(row)}
                                style={{
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                    textAlign: 'center',
                                    display: 'inline-block',
                                    width: '100%'
                                }}
                            >
                                {commentCount}
                            </span>
                        );
                    }
                },
                {
                    name: 'Vistas',
                    selector: (row: Records) => Number([row.CONT_N_VISTAS]) || 0,
                    sortable: true,
                    center: true,
                    //width: '80px',
                    width: '5%', // Ajusta el ancho proporcionalmente
                    cell: (row: Records) => (
                        <div style={{ textAlign: 'center' }}>
                            {Number([row.CONT_N_VISTAS]) || 0}
                        </div>
                    )
                },
                {
                    name: 'Confidencialidad',
                    selector: (row: Records) => row.CONT_V_ETAPA_DOCUMENTO_SIG,
                    sortable: true,
                    center: true,
                    //width: '120px',
                    width: '10%', // Ajusta el ancho proporcionalmente
                    cell: () => <div style={{ textAlign: 'center' }}>Público</div>
                }
            ];
        } else if (dominio === 'BIBLIOTECA') {
            return [
                {
                    name: 'Título',
                    selector: (row: Records) => row.CONT_V_TITULO_DC,
                    sortable: true,
                    cell: (row: Records) => {
                    const maxLength = 350;
                    return (
                        <div title={row.CONT_V_TITULO_DC} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '380px' }}>
                        {row.CONT_V_TITULO_DC.length > maxLength ? row.CONT_V_TITULO_DC.substr(0, maxLength) + '...' : row.CONT_V_TITULO_DC}
                        </div>
                    );
                    },
                    width: '10%',
                },
                {
                    name: 'Tipo de Publicación',
                    selector: (row: Records) => row.CONT_V_TIPO_RECURSO_DC,
                    sortable: true,
                    cell: (row: Records) => {
                    const type = row.CONT_V_TIPO_RECURSO_DC.split('/').pop()?.trim().toLowerCase();
                    let translatedType = '';
            
                    switch (type) {
                        case 'bachelorthesis':
                        translatedType = 'Tesis de Licenciatura';
                        break;
                        case 'masterthesis':
                        translatedType = 'Tesis de Maestría';
                        break;
                        case 'doctoralthesis':
                        translatedType = 'Tesis Doctoral';
                        break;
                        default:
                        translatedType = type?.replace(/([A-Z])/g, ' $1').trim() || '';
                        break;
                    }
                    return <div title={translatedType} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>{translatedType}</div>;
                    },
                    width: '10%',
                },
                {
                    name: 'Creador (Autor)',
                    selector: (row: Records) => row.CONT_V_CREADOR_DC,
                    sortable: true,
                    width: '10%',
                },
                {
                    name: 'Fecha',
                    selector: (row: Records) => row.CONT_V_FECHA_DC,
                    center: true,
                    sortable: true,
                    width: '10%',
                },
                {
                    name: 'Idioma',
                    selector: (row: Records) => row.CONT_V_LENGUAJE_DC,
                    sortable: true,
                    center: true,
                    cell: (row: Records) => {
                    let displayValue = row.CONT_V_LENGUAJE_DC === 'eng' ? 'Inglés' : row.CONT_V_LENGUAJE_DC === 'spa' ? 'Español' : row.CONT_V_LENGUAJE_DC;
                    return <div style={{ textAlign: 'center' }}>{displayValue}</div>;
                    },
                    width: '10%',
                },
                {
                    name: 'Formato',
                    selector: (row: Records) => row.CONT_V_TIPO_CONTENIDO,
                    sortable: true,
                    cell: (row: Records) => <div style={{ textAlign: 'center' }}>{row.CONT_V_TIPO_CONTENIDO.split('/')[0]}</div>,
                    width: '10%',
                },
                {
                    name: 'Ver',
                    button: true,
                    cell: (row: Records) => {
                        const PLTNuevo = row.TEXTO_CONCAT;
                        console.log("PLTNuevo:", PLTNuevo);
                        return (
                            <button 
                                onClick={() => handleShowPDF(row, PLTNuevo)} 
                                style={{ cursor: 'pointer' }} 
                                title='Ver PDF'>
                                <FontAwesomeIcon icon={faFilePdf} style={{ fontSize: '18px', color: '#d9534f' }} />
                            </button>
                        );
                    },
                    center: true,
                    width: '5%',
                },
                {
                    name: 'Comentarios',
                    selector: (row: Records) => 
                    comments.filter(comment => comment.CONT_N_IDENTIFICADOR_COMENTARIOS === row.CONT_N_IDENTIFICADOR_COMENTARIOS).length,
                    sortable: true,
                    center: true,
                    width: '10%',
                    cell: (row: Records) => {
                    const commentCount = comments.filter(
                        (comment) => comment.CONT_N_IDENTIFICADOR_COMENTARIOS === row.CONT_N_IDENTIFICADOR_COMENTARIOS
                    ).length;
                
                    return (
                        <span
                        onClick={() => handleShowComments(row)}
                        style={{
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            textAlign: 'center',
                            display: 'inline-block',
                            width: '100%',
                        }}
                        >
                        {commentCount}
                        </span>
                    );
                    },
                },
                {
                    name: 'Vistas',
                    selector: (row: Records) => Number([row.CONT_N_VISTAS]) || 0,  
                    sortable: true,
                    center: true,
                    width: '5%',
                    cell: (row: Records) => (
                    <div style={{ textAlign: 'center' }}>
                        {Number([row.CONT_N_VISTAS]) || 0} 
                    </div>
                    ),
                },
                {
                    name: 'Etapa',
                    selector: (row: Records) => row.CONT_V_FECHA_DC,
                    sortable: true,
                    cell: () => <div style={{ textAlign: 'center' }}>APROBACION</div>,
                    center: true,
                    width: '10%',
                },
                {
                    name: 'Confidencialidad',
                    selector: (row: Records) => row.CONT_V_ETAPA_DOCUMENTO_SIG,
                    sortable: true,
                    center: true,
                    width: '10%',
                    cell: () => <div style={{ textAlign: 'center' }}>Público</div>,
                },
            ];
        } else {
            return [];
        }
    }

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#99020b',
                color: 'white',
                fontWeight: 'bold',
                padding: '0 !important', // Elimina padding
                margin: '0 !important', // Elimina margen
                alignItems: 'center', // Centra verticalmente
                display: 'flex', // Usa Flexbox
                height: '35px', // Ajusta altura del encabezado
                marginLeft: '10px'
            }
        },
        cells: {
            style: {
                padding: '0 !important', // Elimina padding extra
                margin: '0 !important', // Elimina margen extra
                display: 'flex', // Flexbox para alinear
                alignItems: 'center', // Alineación vertical
                height: '30px', // Ajusta altura de las celdas
            }
        },
        rows: {
            style: {
                '&:nth-of-type(odd)': {
                    backgroundColor: '#FFFFFF',
                },
                '&:nth-of-type(even)': {
                    backgroundColor: '#FFF8E9', 
                }
            }
        }
    };
    
    
    // CODIGO MODIFICADO ////////////////////////////////////////////////
    // Renderiza las filas expandidas (subfilas) con los detalles de los repetidos
    const ExpandedComponent = ({ data }: { data: Records }) => {
        if (dominio === 'BIBLIOTECA') {
            return null;
        } else if (dominio === 'CALIDAD') {
            // Aquí pon la tabla personalizada para CALIDAD
            return (
                <div style={{ padding: '5px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                    <div style={{ marginRight: '10px', marginLeft: '10px' }}>
                        <strong>Nombre del Archivo:</strong> {data.CONT_V_NOMBRE || 'No disponible'}
                    </div>
                    <div style={{ marginRight: '10px' }}>
                        <strong>Tamaño:</strong> {data.CONT_N_PESO_FILE ? `${Math.round(Number(data.CONT_N_PESO_FILE) / 1024)} KB` : 'No disponible'}
                    </div>
                    <div style={{ marginRight: '10px' }}>
                        <strong>Descargas:</strong> {0}
                    </div>
                </div>
            );
        } else if (dominio === 'SGD') {
            return (
                <div style={{ paddingLeft: '20px' }}>
                    <table
                        className="table table-bordered"
                        style={{ borderCollapse: 'separate', borderSpacing: '0 7px', width: '100%' }}
                    >
                        <thead style={{ backgroundColor: '#fff8e9', color: 'gray', justifyContent: 'start' }}>
                            <tr>
                                <th style={{ padding: '9px', width: '14%', textAlign: 'start' }}>Dependencia</th>
                                <th style={{ padding: '5px', width: '21%', textAlign: 'start' }}>SubDependencia</th>
                                <th style={{ padding: '5px', width: '10%', textAlign: 'start'  }}>Área</th>
                                <th style={{ padding: '5px', width: '5%', textAlign: 'start'  }}>Serie</th>
                                <th style={{ padding: '5px', width: '5%', textAlign: 'start'  }}>Subserie</th>
                                <th style={{ padding: '5px', width: '6%' , textAlign: 'start' }}>Tipo Doc.</th>
                                <th style={{ padding: '5px', width: '5%', textAlign: 'start'  }}>Año Doc.</th>
                                <th style={{ padding: '5px', width: '5%', textAlign: 'start'  }}>Expediente</th>
                                <th style={{ padding: '5px', width: '15%', textAlign: 'start'  }}>Nombre PDF</th>
                                {/* <th style={{ padding: '5px', width: '4%' }}>Página_Línea</th> */}
                                <th style={{ padding: '5px', width: '2%', textAlign: 'start'  }}>Pág.</th>
                                <th style={{ padding: '5px', width: '4%', textAlign: 'start'  }}>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.repetido && data.repetido.length > 0 ? (
                                data.repetido.map((rep: any, repIndex: number) => {
                                    return (
                                        <React.Fragment key={repIndex}>
                                            <tr>
                                                <td style={{ padding: '5px' }}>{rep.CONT_V_DESCRIPCIONDEPREGISTRO || 'ND'}</td>
                                                <td style={{ padding: '5px' }}>{rep.CONT_V_DESCRIPCIONSUBDEPREGISTRO || 'ND'}</td>
                                                <td style={{ padding: '5px' }}>{rep.CONT_V_DESCRIPCIONAREAREGISTRO || 'ND'}</td>
                                                <td style={{ padding: '5px' }}>{rep.CONT_V_DESCRIPCIONSERIE || 'ND'}</td>
                                                <td style={{ padding: '5px' }}>{rep.CONT_V_DESCRIPCIONSUBSERIE || 'ND'}</td>
                                                <td style={{ padding: '5px' }}>{rep.CONT_V_NOMBREDETALLE || 'ND'}</td>
                                                <td style={{ padding: '5px' }}>{rep.CONT_V_ANYO_DOCUMENTO || 'ND'}</td>
                                                <td style={{ padding: '5px' }}>{rep.CONT_V_NUMERO_EXPEDIENTE || 'ND'}</td>
                                                <td style={{ padding: '5px' }}>{rep.CONT_V_NOMBRE || 'ND'}</td>
                                                <td style={{ padding: '5px' }}>{rep.CONT_N_COUNT_PAGE || 'ND'}</td>
                                                <td style={{ padding: '5px' }}>{rep.CONT_V_ESTADO_SOLICITUD || 'Abierto'}</td>
                                            </tr>
                                        </React.Fragment>
                                    );
                                })
                            ) : (
                                <React.Fragment>
                                    <tr>
                                        <td style={{ padding: '5px' }}>{data.CONT_V_DESCRIPCIONDEPREGISTRO || 'ND'}</td>
                                        <td style={{ padding: '5px' }}>{data.CONT_V_DESCRIPCIONSUBDEPREGISTRO || 'ND'}</td>
                                        <td style={{ padding: '5px' }}>{data.CONT_V_DESCRIPCIONAREAREGISTRO || 'ND'}</td>
                                        <td style={{ padding: '5px' }}>{data.CONT_V_DESCRIPCIONSERIE || 'ND'}</td>
                                        <td style={{ padding: '5px' }}>{data.CONT_V_DESCRIPCIONSUBSERIE || 'ND'}</td>
                                        <td style={{ padding: '5px' }}>{data.CONT_V_NOMBREDETALLE || 'ND'}</td>
                                        <td style={{ padding: '5px' }}>{data.CONT_V_ANYO_DOCUMENTO || 'ND'}</td>
                                        <td style={{ padding: '5px' }}>{data.CONT_V_NUMERO_EXPEDIENTE || 'ND'}</td>
                                        <td style={{ padding: '5px' }}>{data.CONT_V_NOMBRE || 'ND'}</td>
                                        <td style={{ padding: '5px' }}>{data.CONT_N_COUNT_PAGE || 'ND'}</td>
                                        <td style={{ padding: '5px' }}>{data.CONT_V_ESTADO_SOLICITUD || 'Abierto'}</td>
                                    </tr>
                                </React.Fragment>
                            )}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return null; // Si no es un dominio válido, no mostramos nada
        } 
    };
    // FIN CODIGO MODIFICADO ////////////////////////////////////////////////

    return (

        <div style={{ margin: '0', padding: '0' }}>
            {dominio === 'BIBLIOTECA' ? (
                <DataTable
                    columns={getColumns()}
                    data={groupedRecords}
                    defaultSortFieldId="fecha"
                    defaultSortAsc={true}
                    customStyles={customStyles}
                    highlightOnHover
                    pointerOnHover
                />
            ) : (
                <DataTable
                    columns={getColumns()}
                    data={groupedRecords}
                    defaultSortFieldId="fecha"
                    defaultSortAsc={true}
                    customStyles={customStyles}
                    highlightOnHover
                    pointerOnHover
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
                    expandOnRowClicked
                    expandOnRowDoubleClicked
                    expandableRowExpanded={(row) => expandedRows[row.CONT_N_ID_SOLICITUD]}
                />
            )}

            {/* Modal para ver PDF */}
            {selectedTramite && (
                <Modal
                    open={openPDF}
                    setOpen={setOpenPDF}
                    tramite={selectedTramite}
                    loggedUser={loggedUser}
                    comments={[]}
                    searchTerm={searchTerm} // Añadido
                    highlightAll={highlightAll} // Añadido
                    contenidoEditable={selectedTramite.CONT_I_CONTENIDO_EDITABLE} // Añadido
                    openPaginaLineaModal={openPaginaLineaModal} // Añadido
                    handleCloseBothModals={handleCloseBothModals} // Añadido
                    dominio={dominio} // Añadido
                />
            )}

            {/* Modal para Comentarios */}
            {selectedTramite && (
                <CommentPanel
                    open={openComments}
                    setOpen={setOpenComments}
                    comments={comments.filter(
                        (comment) =>
                            comment.CONT_N_IDENTIFICADOR_COMENTARIOS ===
                            selectedTramite.CONT_N_IDENTIFICADOR_COMENTARIOS
                    )}
                    loggedUser={loggedUser}
                    tramite={selectedTramite}
                />
            )}

            {openPaginaLineaModal && searchTerm && (
                <PaginaLineaModal
                    open={openPaginaLineaModal}
                    handleClose={() => setOpenPaginaLineaModal(false)}
                    paginaLineasS={pagLineaText}
                />
            )}
        </div>
    );
};

export default ResultadoSgd;
