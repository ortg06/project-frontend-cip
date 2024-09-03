const TABLE_ID = '#pacientesDT';
const FORM_ID = '#formFichaAdulto';
const FORM_ID_MOD = '#formInscribirExportador';
const  CAN_EDIT = true;
const  CAN_CONSULT = true;
const  CAN_INACTIVAR = true;

function renderActions(data, type, row, meta) {
    let html = '';
    html += CAN_INACTIVAR ? ' <a data-rel="tooltip" data-placement="left" onclick="inactivar(' + meta.row + ')" title="Inactivar paciente" href="javascript:void(0)" class="m-2"><i class="fa fa-check-square"></i></a>':'';
    html += CAN_CONSULT ? ' <a data-rel="tooltip" data-placement="left" onclick="consultar(' + meta.row + ')" title="Consultar" href="javascript:void(0)" class="m-2"><i class="fa fa-search"></i></a>':'';
    html += CAN_EDIT? ' <a data-rel="tooltip" data-placement="left"  onclick="edit(' + meta.row + ')" title="Modificar" href="javascript:void(0)" class="m-2"><i class="fa fa-edit"></i></a>':'';
    return html;
}

function inactivar(row) {
    let rowData = $(TABLE_ID).DataTable().row(row).data();
    let url = BACKEND_URL  + '/api/fichaAdulto/inactivar';
    let data = rowData;
    showConfirmMessage('¿Desea inactivar a la persona ' + rowData.nombres + ' como paciente?', function () {
        ajaxPostCall(url, data, null, function (result) {
            $(TABLE_ID).DataTable().ajax.reload(null, false);
        });
    });
}

function edit(row) {
    /*    let data = $(TABLE_ID).DataTable().row(row).data();
        $('#idexportador').val(data.carnetExportador);
        populateFormExportadorConsultar(data,1);//1: modificar*/
}


function consultar(row){
    /*let data = $(TABLE_ID).DataTable().row(row).data();
    populateFormExportadorConsultar(data,2);//2: consultar
    */
}


/*
function populateFormExportadorConsultar(data,opcion){
    if(opcion === 1 ){
        populateForm($(FORM_ID_MOD)[0], data);
    }else{
        populateForm($(FORM_ID)[0], data);
    }


    document.getElementById("esGranContribuyenteCheck").checked = data.esGranContribuyente ==="S" ;
    document.getElementById("estaExentoCheck").checked = data.estaExento ==="S" ;

    let newOption1 = new Option(        data.tiposDocumentoIdentidadExpor.nombreDocumentoIdentidad,
        data.tiposDocumentoIdentidadExpor.codigoTipoDocumentoIdentida, true, true);
    $('#tiposDocumentoIdentidadExpor').append(newOption1).trigger('change');

    let newOption2 = new Option(data.pais1.nombrePais,
        data.pais1.codigoPais, true, true);
    $('#pais1').append(newOption2).trigger('change');

    let newOption3 = new Option(data.paisExportador.nombrePais,
        data.paisExportador.codigoPais, true, true);
    $('#codigoPais').append(newOption3).trigger('change');

    let newOption4 = new Option(data.departamento.nombreDepartamento,
        data.municipio.id.departamento.id.codigoDepartamento, true, true);
    $('#departamento').append(newOption4).trigger('change');

    let newOption5 = new Option(data.municipio.nombreMunicipio,
        data.municipio.id.codigoMunicipio, true, true);
    $('#municipio').append(newOption5).trigger('change');

    if(data.pais2 !== null){
        let newOption6 = new Option(data.pais2.nombrePais,
            data.pais2.codigoPais, true, true);
        $('#pais2').append(newOption6).trigger('change');
    }

    if(data.tiposDocumentoIdentidadRepresentante !== null){
        let newOption7 = new Option(data.tiposDocumentoIdentidadRepresentante.nombreDocumentoIdentidad,
            data.tiposDocumentoIdentidadRepresentante.codigoTipoDocumentoIdentida, true, true);
        $('#tiposDocumentoIdentidadRepresentante').append(newOption7).trigger('change');
    }
}*/


jQuery(function ($) {


    //DATATABLE DE EXPORTADORES EN PANTALLA VERIFICAR
    $(TABLE_ID).DataTable({
        ajax: {
            url: BACKEND_URL + '/api/fichaAdulto/dtActivas',
            dataSrc: ''  // DataTables espera un array de objetos directamente
        },
        columns: [
            {
                data: 'codigoPersona',
                width: "10%",
            },
            {
                data: 'nombres'
            },
            {
                data: 'genero'
            },
            {
                data: 'codigoPersona',
                searchable: false,
                orderable: false,
                render: renderActions // Asegúrate de definir esta función
            }
        ],
        order: [
            [0, 'asc']
        ]
    });


});
