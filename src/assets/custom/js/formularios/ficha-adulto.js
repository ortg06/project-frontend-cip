const TABLE_ID = '#paisesDT';
const FORM_ID = '#formFichaAdulto';
const FORM_ID_MOD = '#formInscribirExportador';
const  CAN_EDIT = true;
const  CAN_CONSULT = true;
const  CAN_VERIFICAR = true;

function renderActions(data, type, row, meta) {
    let html = '';
    html += CAN_VERIFICAR ? ' <a data-rel="tooltip" data-placement="left" onclick="verificar(' + meta.row + ')" title="Verificar" href="javascript:void(0)" class="m-2"><i class="fa fa-check-square"></i></a>':'';
    html += CAN_CONSULT ? ' <a data-rel="tooltip" data-placement="left" onclick="consultar(' + meta.row + ')" title="Consultar" href="javascript:void(0)" class="m-2"><i class="fa fa-search"></i></a>':'';
    html += CAN_EDIT? ' <a data-rel="tooltip" data-placement="left"  onclick="edit(' + meta.row + ')" title="Modificar" href="javascript:void(0)" class="m-2"><i class="fa fa-edit"></i></a>':'';
    return html;
}

function verificar(row) {
    /*let rowData = $(TABLE_ID).DataTable().row(row).data();
    let url = BACKEND_URL  + '';
    let data = rowData.carnetExportador;
    showConfirmMessage('Desea verificar al exportador con carnet: ' + rowData.carnetExportador, function () {
        ajaxPostCall(url, data, null, function (result) {
            $(TABLE_ID).DataTable().ajax.reload(null, false);
        });
    });*/
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

const select2Grouped = function (selector, url, rows) {
    $(selector).select2({
        ajax: {
            url: url,
            dataType: 'json',
            data: function (params) {
                return {
                    q: params.term, // Término de búsqueda
                    page: params.page || 1,
                    rows: rows
                };
            },
            processResults: function (data) {
                // Verifica la estructura de los datos en la consola
                console.log('Datos recibidos:', data);

                return {
                    results: data.map(departamento => ({
                        id: departamento.id,
                        text: departamento.text,
                        children: departamento.extraData ? JSON.parse(departamento.extraData) : [] // Convierte extraData a lista si es necesario
                    }))
                };
            }
        },
        templateResult: function (data) {
            if (data.children && data.children.length) {
                // Si tiene hijos, renderiza como optgroup
                return `<optgroup label="${data.text}">${data.children.map(child => `<option value="${child.id}">${child.text}</option>`).join('')}</optgroup>`;
            } else {
                // Si no tiene hijos, renderiza una opción normal
                return `<option value="${data.id}">${data.text}</option>`;
            }
        },
        templateSelection: function (data) {
            return data.text;
        }
    });
};


function toggleField(radio,idRadio,label){
    $('input[name="'+radio+'"]').on('change', function() {
        if ($(idRadio).is(':checked')) {
            $(label).prop("disabled", false); // Habilitar el campo si se selecciona "Sí"
        } else {
            $(label).prop("disabled", true);  // Deshabilitar el campo si se selecciona "No"
        }
    });
}

jQuery(function ($) {

    // campos de texto está deshabilitado por defecto
    $("#cantidadHijo").prop("disabled", true);
    $("#lugarEstudio").prop("disabled", true);
    $("#lugarTrabajo").prop("disabled", true);
    $("#enfermedadEspecifica").prop("disabled", true);
    $("#diagnosticoFamiliar").prop("disabled", true);
    $("#diagnosticoPropio").prop("disabled", true);
    $("#consultaAnterior").prop("disabled", true);
    $("#anioConsultaAnterior").prop("disabled", true);

     toggleField('radio1','#hijosSi','#cantidadHijo');
     toggleField('radio2','#estudiaSi', '#lugarEstudio');
     toggleField('radio3','#trabajaSi', '#lugarTrabajo');
     toggleField('radio4','#enfermedadSi', '#enfermedadEspecifica');
     toggleField('radio5','#antecedentesSi', '#diagnosticoFamiliar');
     toggleField('radio6', '#tratamientoSi','#diagnosticoPropio');
     toggleField('radio7', '#consultasSi','#consultaAnterior');
     toggleField('radio7', '#consultasSi','#anioConsultaAnterior');



    //guardado de ficha adulto
    $(FORM_ID).validate({
        submitHandler: function (form) {
                let url = BACKEND_URL + $(form).attr('action');
                let data = convertTextUpperCase(form);
                showConfirmMessage('¿Desea guardar la información de la ficha?', function () {
                    ajaxPostCall(url, data, null, function (result) {
                        resetFormData($(FORM_ID), 'select');
                    });
                });
        }
    });


     //DATATABLE DE EXPORTADORES EN PANTALLA VERIFICAR
     $(TABLE_ID).DataTable({
         ajax: {
             url: BACKEND_URL + '/api/paises/dt',
             dataSrc: ''  // DataTables espera un array de objetos directamente
         },
         columns: [
             {
                 data: 'codigoPais',
                 width: "10%",
             },
             {
                 data: 'nombrePais'
             },
             {
                 data: 'nombrePaisAbr'
             },
             {
                 data: 'codigoPais',
                 searchable: false,
                 orderable: false,
                 render: renderActions // Asegúrate de definir esta función
             }
         ],
         order: [
             [0, 'asc']
         ]
     });

     //servicio
     select2single('#servicio', BACKEND_URL + '/api/servicio/s2', 10);

     select2single('#gradoAcademico', BACKEND_URL + '/api/gradoAcademico/s2', 10);

     select2WithChildrens('#lugarNacimiento',BACKEND_URL + '/api/util/s2DeptoWithMunicipio',10);


     /*
         $('#tiposDocumentoIdentidadExpor').select2({placeholder: "Seleccione un documento"});
         select2single('#tiposDocumentoIdentidadExpor', BACKEND_URL + '/tipos-documentos-identidad/s2-nombre-documento', 10)

         select2single('#tiposDocumentoIdentidadRepresentante', BACKEND_URL + '/tipos-documentos-identidad/s2-nombre-documento', 10)

         //persona/usuario autorizados
         select2single('#tiposDocumentoIdentidad', BACKEND_URL + '/tipos-documentos-identidad/s2', 10)


         //pais emision documento expediente
         select2single('#pais1', BACKEND_URL + '/pais/s2Vigentes', 10);

         //pais emision documento representante legal
         select2single('#pais2', BACKEND_URL + '/pais/s2Vigentes', 10);

         //pais documento persona/usuario autorizado
         select2single('#paisDocumento', BACKEND_URL + '/pais/s2Vigentes', 10);

         //select2single('#codigoPais', BACKEND_URL + '/pais/s2Vigentes', 10);

         select2single('#departamento', BACKEND_URL + '/departamento/s2', 10, 213, null);

         select2single('#municipio', BACKEND_URL + '/municipio/s2', 10, 213, 6);


         $("#codigoPais").on("change", function() {
             $("#departamento").val('').trigger('change');
             select2ChangeSingle('#departamento', BACKEND_URL + '/departamento/s2', 10, $(this).val(), null);
         });

         $("#departamento").on("change", function() {
             $("#municipio").val('').trigger('change');
             select2ChangeSingle('#municipio', BACKEND_URL + '/municipio/s2', 10, $("#codigoPais").val(), $(this).val());
         });

         select2single('#paisExportador', BACKEND_URL + '/pais/s2Vigentes', 10);

         select2single('#actividadEconomicaPrincipal', BACKEND_URL + '/actividades-economica/s2', 10);

         select2single('#actividadesEconomica', BACKEND_URL + '/actividades-economica/s2', 10);

         select2single('#agentesAduanale', BACKEND_URL + '/exportadores-agentes-adua/s2AgentesVigentes', 10);

         select2single('#codigoParqueServicio', BACKEND_URL + '/exportadores-parque-servicio/s2ParqueServicioVigentes', 10);

         select2single('#paisD', BACKEND_URL + '/pais/s2Vigentes', 10);

         select2single('#departamentoD', BACKEND_URL + '/departamento/s2', 10, 213, null);

         select2single('#municipioD', BACKEND_URL + '/municipio/s2', 10, 213, $("#departamentoD").val());

         $("#paisD").on("change", function() {
             $("#departamentoD").val("").trigger('change');
             select2ChangeSingle('#departamentoD', BACKEND_URL + '/departamento/s2', 10, $(this).val(), null);
         });

         $("#departamentoD").on("change", function() {
             $("#municipioD").val("");
             select2ChangeSingle('#municipioD', BACKEND_URL + '/municipio/s2', 10, $("#paisD").val(), $(this).val());
         });

         select2single('#paisZ', BACKEND_URL + '/pais/s2Vigentes', 10);

         select2ChangeSingle('#departamentoZ', BACKEND_URL + '/departamento/s2', 10, 213, null);

         select2ChangeSingle('#municipioZ', BACKEND_URL + '/municipio/s2', 10, 213, $("#departamentoZ").val());

         $("#paisZ").on("change", function() {
             $("#departamentoZ").val("").trigger('change');
             select2ChangeSingle('#departamentoZ', BACKEND_URL + '/departamento/s2', 10, $(this).val(), null);
         });

         $("#departamentoZ").on("change", function() {
             $("#municipioZ").val("").trigger('change');
             select2ChangeSingle('#municipioZ', BACKEND_URL + '/municipio/s2', 10, $("#paisZ").val(), $(this).val());
         });

         select2single('#zonasFranca', BACKEND_URL + '/exportadores-zonas-franca/s2ZonasFranca', 10);

         select2single('#establecimientosAutorizado', BACKEND_URL + '/establecimiento/s2', 10);

         select2single('#tiposInformacion', BACKEND_URL + '/tipos-informacion/s2', 10);
     */
});
