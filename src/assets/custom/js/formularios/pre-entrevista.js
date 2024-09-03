const FORM_ID = '#formPreEntrevista';
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


function toggleField(radio,idRadio,label){
    $('input[name="'+radio+'"]').on('change', function() {
        if ($(idRadio).is(':checked')) {
            $(label2).val('S');
        } else {
            $(label2).val('N');
        }
    });
}

function updateSelectedValueRadio3() {
    $('input[name="radio3"]').on('change',function() {
        $('#rangoSalario').val($(this).val());
    });
}



jQuery(function ($) {

    $("#saveButton").hide();
    $("#nextButton").show();
    //se inicializan en N los campos de checkboxes
    $("#tieneHijo").val("N");
    $("#acompanamientoPsicologico").val("N");
    $("#tieneFamDependiente").val("N");


    toggleField('radio1','#hijosSi','#tieneHijo');
    toggleField('radio2','#familiarSi','#tieneFamDependiente');
    toggleField('radio4','#acompanaSi','#acompanamientoPsicologico');
    updateSelectedValueRadio3();


    //guardado de ficha adulto
    $(FORM_ID).validate({
        submitHandler: function (form) {
            let url = BACKEND_URL + $(form).attr('action');
            let data = convertTextUpperCase(form);
            showConfirmMessage('¿Desea guardar la información de la pre Entrevista?', function () {
                ajaxPostCall(url, data, null, function (result) {
                    resetFormData($(FORM_ID));
                });
            });
        }
    });

    //checkboxes
    $("#nextButton").on('click',function(){
        $("#saveButton").show();
        $("#nextButton").hide();
    });

    $("#previousButton").on('click',function(){
        $("#saveButton").hide();
        $("#nextButton").show();
    });


});
